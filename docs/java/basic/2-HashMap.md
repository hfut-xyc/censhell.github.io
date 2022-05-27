# HashMap

## 介绍

|版本 |实现|并发|
|---|---|---|
|Java7 |Hash表+链表，链表采用头插法 |resize操作可能会造成环形链表或数据丢失 |
|Java8 |Hash表+链表+红黑树，链表采用尾插法 |put操作可能会发生数据覆盖的情况|

## 源码分析
### 常量与成员变量

``` java
public class HashMap<K,V> extends AbstractMap<K,V> 
    implements Map<K,V>, Cloneable, Serializable {
  
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

    // 存储元素的数组，总是为2的n次幂，这是为了保证 hash % length == hash & (length - 1)
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

### 构造函数
推荐使用 `HashMap(int initialCapacity)`，通过指定默认的容量来减少后续的扩容操作

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

### get

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

### put

``` java {8,11,14,17,20,23}
public V put(K key, V value) {
    return putVal(hash(key), key, value, false, true);
}

final V putVal(int hash, K key, V value, boolean onlyIfAbsent, boolean evict) {
    Node<K,V>[] tab; Node<K,V> p; int n, i;

    // 1.若数组未初始化或者长度为0，进行扩容
    if ((tab = table) == null || (n = tab.length) == 0)
        n = (tab = resize()).length;
    // 2.若桶为空，新结点直接放入桶中
    if ((p = tab[i = (n - 1) & hash]) == null)
        tab[i] = newNode(hash, key, value, null);
    // 3.若桶中已经存在元素
    else {
        Node<K,V> e; K k;
        // 3.1 如果桶中第一个结点就和新结点的key匹配，直接覆盖
        if (p.hash == hash && ((k = p.key) == key || (key != null && key.equals(k))))
            e = p;
        // 3.2 红黑树插入
        else if (p instanceof TreeNode)
            e = ((TreeNode<K,V>)p).putTreeVal(this, tab, hash, key, value);
        // 3.3 遍历链表
        else {
            for (int binCount = 0; ; ++binCount) {
                // 到达链表的尾部
                if ((e = p.next) == null) {
                    // 在尾部插入新结点
                    p.next = newNode(hash, key, value, null);
                    // 若链表长度达到8，执行treeifyBin，但并不一定会转为红黑树
                    if (binCount >= TREEIFY_THRESHOLD - 1)
                        treeifyBin(tab, hash);
                    break;
                }
                // 若链表中有结点与新结点key值相等，跳出循环，覆盖旧值
                if (e.hash == hash && ((k = e.key) == key || (key != null && key.equals(k))))
                    break;
                // 遍历至链表的下一个结点
                p = e;
            }
        }
        // 判断是否需要覆盖旧值
        if (e != null) {
            V oldValue = e.value;
            // onlyIfAbsent为false或旧值为null，才用新值替换旧值
            if (!onlyIfAbsent || oldValue == null)
                e.value = value;
            afterNodeAccess(e);
            return oldValue;
        }
    }
    // 如果新结点的key值在原来的桶中不存在，说明要添加一个新结点，即map结构发生变化
    ++modCount;
    // 总结点数量大于阈值则扩容
    if (++size > threshold)
        resize();
    afterNodeInsertion(evict);
    return null;
} 
```

### treeifyBin

- treeifyBin 并不一定会把链表转为红黑树，当链表长度达到8，但 table 长度不足64时，只会进行扩容
- 为什么链表长度超过8要变成红黑树：链表结点占用内存更小，链表长度达到8的概率非常小，转为红黑树可以提高查询效率

``` java{3,4}
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

### resize

需要执行扩容操作的情况有3种：

- table 为 null 或长度为0
- 键值对的数量超过了阈值 threshold 
- 链表长度达到 TREEIFY_THRESHOLD，但 table 长度小于 MIN_TREEIFY_CAPACITY 

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