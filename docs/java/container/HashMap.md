---

title: HashMap源码阅读
date: 2020-06-16
tags: [Java]
category: Java
---

#### 注意事项

Java 8 对 HashMap 的结构进行了修改，改为**Hash表 + 链表 / 红黑树** 

- Java 8 中 HashMap 链表的插入采用尾插法，而 Java 7 为头插法
- HashMap的 **table.length** 为 $2^n$，这样设计是为了使  **hash % length == hash & (length - 1)**
- 在Java 7中，多线程环境下，resize操作可能会造成环形链表或数据丢失。
- 在Java 8中，多线程环境下，put操作可能会发生数据覆盖的情况。
- 初始化HashMap时，推荐使用 **HashMap(int initialCapacity)**，通过指定默认的容量来减少后续的扩容操作

![](https://hfut-xyc.gitee.io/image/hashmap.png)

#### Defined Constants

``` java
public class HashMap<K,V> extends AbstractMap<K,V> implements Map<K,V>, Cloneable, Serializable {
  
    // table数组默认的初始容量为16
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;   
    
    // table数组最大容量
    static final int MAXIMUM_CAPACITY = 1 << 30; 
    
    // 默认的填充因子
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    // 链表转为红黑树的必要条件
    static final int TREEIFY_THRESHOLD = 8;
    
    // 当桶中的树结点数少于这个值时，红黑树会转为链表
    static final int UNTREEIFY_THRESHOLD = 6;
    
    // 链表转为红黑树时，table所需的最小长度
    static final int MIN_TREEIFY_CAPACITY = 64;
    
    // 存储元素的数组，总是为2的n次幂
    transient Node<K,V>[] table;
    
    // 所有键值对的集合
    transient Set<Map.Entry<K,V>> entrySet;
    
    // 结点数，即 K-V 的数量
    transient int size;
    
    // map结构更改次数
    transient int modCount;   
    
    // 当 size 超过 threshold = capacity * loadFactor，会进行扩容
    int threshold;
    
    // 加载因子
    final float loadFactor;
}
```
#### Constructor

```java
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR; // all other fields defaulted
}

public HashMap(int initialCapacity, float loadFactor) {
    if (initialCapacity < 0)
        throw new IllegalArgumentException("Illegal initial capacity: " + initialCapacity);
    if (initialCapacity > MAXIMUM_CAPACITY)
        initialCapacity = MAXIMUM_CAPACITY;
    if (loadFactor <= 0 || Float.isNaN(loadFactor))
        throw new IllegalArgumentException("Illegal load factor: " + loadFactor);
    this.loadFactor = loadFactor;
    this.threshold = tableSizeFor(initialCapacity);
}

public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
}
```


#### put

- **步骤①**：若table为 null 或长度为0，则做一次扩容操作
- **步骤②**：根据 index 找到对应的 bucket 后，若没有 hash 冲突，则直接 new 一个结点，放入桶中
- **步骤③**：若当前 bucket 上有链表，且头结点就匹配，那么直接替换value即可
- **步骤④**：若当前 bucket 上的是树结构，则转为红黑树的插入操作
- **步骤⑤**：若步骤①、②、③、④都不成立，则对链表做遍历操作

  - 若链表中有结点匹配，则替换 value；

  - 若没有结点匹配，则在链表末尾追加。添加后，若链表长度大于 TREEIFY_THRESHOLD ，执行 treeifyBin 操作

- **步骤⑥：**以上5步都执行完后，判断当前 Map 中存储的键值对的数量是否超过 threshold，若超出，还需再次扩容。

![](https://hfut-xyc.gitee.io/image/hashmap-put.png)

``` java
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;
    // table未初始化或者长度为0，进行扩容
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 如果桶为空，新结点直接放入桶中
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    // 如果桶中已经存在元素
    else {
        Node<K,V> e; K k;
        // 如果桶中第一个结点就和新结点的key匹配
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 为红黑树结点
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 为链表结点
        else {
            for (int binCount = 0; ; ++binCount) {
                // 已经到达链表的尾部
                if ((e = p.next) == null) {
                    // 在尾部插入新结点
                    p.next = newNode(hash, key, value, null);
                    // 结点数量达到阈值，执行treeifyBin，注意这里并不一定会转为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1)
                        treeifyBin(tab, hash);
                    // 跳出循环
                    break;
                }
                // 比较当前结点与新结点的hash值和key值
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    // 相等，跳出循环
                    break;
                // 遍历至链表的下一个结点
                p = e;
            }
        }
        // 如果新结点的key值在原来的桶中已经存在，判断是否需要覆盖原来的value
        if (e != null) {
            // 记录key对应的旧值
            V oldValue = e.value;
            // onlyIfAbsent为false或者旧值为null，才用新值替换旧值
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            // 访问结点后回调，这里是空函数，不用管
            afterNodeAccess(e);
            // 返回key对应的旧值
            return oldValue;
        }
    }
    // 如果新结点的key值在原来的桶中不存在，说明要添加一个新结点，即map结构发生变化
    ++modCount;
    // 总结点数量大于阈值则扩容
    if (++size > threshold)
        resize();
    // 插入结点后回调，这里是空函数，不用管
    afterNodeInsertion(evict);
    return null;
} 

```

#### resize

需要执行扩容操作的情况有3种：

- **情况1**：table 为 null 或长度为0
- **情况2**：Map 中存储的 K-V 数量超过了阈值 threshold 
- **情况3**：链表长度达到 TREEIFY_THRESHOLD ，但 table 长度小于 MIN_TREEIFY_CAPACITY 

``` java
final Node<K,V>[] resize() {
    Node<K,V>[] oldTab = table;
    int oldCap = (oldTab == null) ? 0 : oldTab.length;
    int oldThr = threshold;
    int newCap, newThr = 0;
    if (oldCap > 0) {
        if (oldCap >= MAXIMUM_CAPACITY) {
            threshold = Integer.MAX_VALUE;
            return oldTab;
        }
        else if ((newCap = oldCap << 1) < MAXIMUM_CAPACITY && oldCap >= DEFAULT_INITIAL_CAPACITY)
            newThr = oldThr << 1; // double threshold
    }
    // 如果旧的数组容量为0，但阈值不为0，把旧阈值赋给新的数组容量
    else if (oldThr > 0) 
        newCap = oldThr;
    // 如果旧的数组容量和阈值都为0，说明初始化使用的是默认构造函数
    else {              
        newCap = DEFAULT_INITIAL_CAPACITY;
        newThr = (int)(DEFAULT_LOAD_FACTOR * DEFAULT_INITIAL_CAPACITY);
    }
    if (newThr == 0) {
        float ft = (float)newCap * loadFactor;
        newThr = (newCap < MAXIMUM_CAPACITY && ft < (float)MAXIMUM_CAPACITY ?
                  (int)ft : Integer.MAX_VALUE);
    }
    threshold = newThr;
    Node<K,V>[] newTab = (Node<K,V>[])new Node[newCap];
    table = newTab;
    
    if (oldTab != null) {
        // 遍历原数组中每个不为空的bucket
        for (int j = 0; j < oldCap; ++j) {
            Node<K,V> e;
            if ((e = oldTab[j]) != null) {
                oldTab[j] = null;
                // 如果bucket中只有单个结点，直接简单迁移就可以了
                if (e.next == null)
                    newTab[e.hash & (newCap - 1)] = e;
                else if (e instanceof TreeNode)
                    ((TreeNode<K,V>)e).split(this, newTab, j, oldCap);
                // 如果bucket中是链表，需要将此链表拆成两个链表，放到新的数组中，并且保留原来的先后顺序
                else { 
                    // loHead、loTail对应一条链表，hiHead、hiTail对应另一条链表
                    Node<K,V> loHead = null, loTail = null;
                    Node<K,V> hiHead = null, hiTail = null;
                    Node<K,V> next;
                    do {
                        next = e.next;
                        if ((e.hash & oldCap) == 0) {
                            if (loTail == null)
                                loHead = e;
                            else
                                loTail.next = e;
                            loTail = e;
                        }
                        else {
                            if (hiTail == null)
                                hiHead = e;
                            else
                                hiTail.next = e;
                            hiTail = e;
                        }
                    } while ((e = next) != null);
                    if (loTail != null) {
                        loTail.next = null;
                        newTab[j] = loHead;
                    }
                    if (hiTail != null) {
                        hiTail.next = null;
                        newTab[j + oldCap] = hiHead;
                    }
                }
            }
        }
    }
    return newTab;
}
```

#### treeifyBin

该方法并不一定会把链表转为红黑树——当链表长度达到8，但 table 长度不足64时，只会进行扩容

``` java
final void treeifyBin(Node<K,V>[] tab, int hash) {
    int n, index; Node<K,V> e;
    if (tab == null || (n = tab.length) < MIN_TREEIFY_CAPACITY)
        resize();
    else if ((e = tab[index = (n - 1) & hash]) != null) {
        TreeNode<K,V> hd = null, tl = null;
        do {
            TreeNode<K,V> p = replacementTreeNode(e, null);
            if (tl == null)
                hd = p;
            else {
                p.prev = tl;
                tl.next = p;
            }
            tl = p;
        } while ((e = e.next) != null);
        if ((tab[index] = hd) != null)
            hd.treeify(tab);
    }
}
```

#### get

``` java
public V get(Object key) {
    Node<K,V> e;
    return (e = getNode(hash(key), key)) == null ? null : e.value;
}

final Node<K,V> getNode(int hash, Object key) {
    Node<K,V>[] tab; Node<K,V> first, e; int n; K k;
    if ((tab = table) != null && (n = tab.length) > 0 && (first = tab[(n - 1) & hash]) != null) {
        // 如果要查找的结点与桶中的第一个结点相匹配
        if (first.hash == hash && ((k = first.key) == key || (key != null && key.equals(k))))
            return first;
        if ((e = first.next) != null) {
            // 如果第一个结点是红黑树结点
            if (first instanceof TreeNode)
                return ((TreeNode<K,V>)first).getTreeNode(hash, key);
            // 否则从第二个结点开始遍历链表
            do {
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    return e;
            } while ((e = e.next) != null);
        }
    }
    return null;
}
```

