# Map
本文主要介绍集合框架中的 HashMap, TreeMap, HashTable
## HashMap
### 介绍

HashMap 是 `java.util.collection` 包下一种常用的数据结构，用于存放键值对，采用拉链法解决 Hash 冲突，是线程不安全的

Java8 之前，HashMap 的实现基于 `数组+链表`，链表采用 `头插法`

Java8 之后，HashMap 的实现基于 `数组+链表+红黑树`，链表采用 `尾插法`。链表长度达到 8 且数组长度达到 64 会变成红黑树，提高搜索效率

数组长度总是为 2 的幂，这是为了保证 `hash % length == hash & (length - 1)`，采用二进制位操作 &，相对于 % 运算效率更高

HashMap 的键值都可以为 null，但 null 作为键 `只能有一个`，null 作为值可以有多个

### 常量与变量

``` java
public class HashMap<K,V> extends AbstractMap<K,V> 
    implements Map<K,V>, Cloneable, Serializable {
  
    // table数组默认的初始长度为 16
    static final int DEFAULT_INITIAL_CAPACITY = 1 << 4;   
    
    // table数组最大长度
    static final int MAXIMUM_CAPACITY = 1 << 30; 
    
    // 默认的填充因子
    static final float DEFAULT_LOAD_FACTOR = 0.75f;

    // 链表转为红黑树时，链表长度需要达到 8
    static final int TREEIFY_THRESHOLD = 8;
    
    // 当桶中的树结点数小于 6 时，红黑树会转为链表
    static final int UNTREEIFY_THRESHOLD = 6;
    
    // 链表转为红黑树时，table 长度需要达到 64
    static final int MIN_TREEIFY_CAPACITY = 64;

    // 存放键值对的数组
    transient Node<K,V>[] table;
    
    // 所有键值对的集合
    transient Set<Map.Entry<K,V>> entrySet;
    
    // 键值对的数量
    transient int size;
    
    // map结构更改次数
    transient int modCount;   
    
    // size >= table.length * loadFactor，数组会进行扩容
    int threshold;
    
    // 加载因子
    final float loadFactor;
}
```

### 初始化

HashMap 默认的初始化数组长度为 16，每次扩充后变为原来的 2 倍

::: tip
推荐使用 `HashMap(int initialCapacity)` 初始化，如果无法确定大小，使用默认值 16
> 指定默认的容量可以减少后续的扩容操作，防止影响性能
:::

```java
public HashMap() {
    this.loadFactor = DEFAULT_LOAD_FACTOR;
}

public HashMap(int initialCapacity) {
    this(initialCapacity, DEFAULT_LOAD_FACTOR);
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
```

### get 操作
核心方法为 getNode
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
### put 操作
核心方法为 putVal
#### putVal

``` java {9,10,57,58}
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
    // 3.若桶不为空
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

#### treeifyBin

treeifyBin 并不一定会把链表转为红黑树，当链表长度达到 8，但 table 长度小于 64 时，只会进行扩容

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

#### resize

resize 是扩容操作，会触发这一操作的情况只有 3 种：

- 数组为 null 或数组长度为 0
- 链表长度达到 8，但数组长度小于 64 
- 键值对的数量超过了阈值 `table.length * loadFactor`

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
## TreeMap

### 介绍
TreeMap是完全基于红黑树构建的，因此它是有序的


### 初始化
``` java
public class TreeMap<K,V> extends AbstractMap<K,V>
    implements NavigableMap<K,V>, Cloneable, java.io.Serializable
{
    private final Comparator<? super K> comparator;

    private transient Entry<K,V> root;

    private transient int size = 0;

    private transient int modCount = 0;
    
    // 默认构造函数不提供比较器
    public TreeMap() {
        comparator = null;
    }
}
```

#### put

``` java
public V put(K key, V value) {
    Entry<K,V> t = root;
    if (t == null) {
        compare(key, key); // type (and possibly null) check

        root = new Entry<>(key, value, null);
        size = 1;
        modCount++;
        return null;
    }
    int cmp;
    Entry<K,V> parent;
    Comparator<? super K> cpr = comparator;
    // 如果提供了默认的比较器
    if (cpr != null) {
        do {
            parent = t;
            cmp = cpr.compare(key, t.key);
            if (cmp < 0)
                t = t.left;
            else if (cmp > 0)
                t = t.right;
            else
                return t.setValue(value);
        } while (t != null);
    }
    // 如果没有提供比较器
    else {
        if (key == null) {
            throw new NullPointerException();
            Comparable<? super K> k = (Comparable<? super K>) key;
        }
        do {
            parent = t;
            cmp = k.compareTo(t.key);
            if (cmp < 0)
                t = t.left;
            else if (cmp > 0)
                t = t.right;
            else
                return t.setValue(value);
        } while (t != null);
    }
    Entry<K,V> e = new Entry<>(key, value, parent);
    if (cmp < 0)
        parent.left = e;
    else
        parent.right = e;
    // 插入完成后，从插入节点处开始修正整棵树
    fixAfterInsertion(e);
    size++;
    modCount++;
    return null;
}
```

#### 插入后修正
``` java
private void fixAfterInsertion(Entry<K,V> x) {
    x.color = RED;
    while (x != null && x != root && x.parent.color == RED) {
         // 1.若当前节点x的父节点是祖父节点的左子节点
        if (parentOf(x) == leftOf(parentOf(parentOf(x)))) {
            Entry<K,V> y = rightOf(parentOf(parentOf(x)));
            // 若当前节点x的叔叔节点y是红色
            if (colorOf(y) == RED) {
                // 将父节点和叔叔节点都变黑，祖父节点变红    
                setColor(parentOf(x), BLACK);
                setColor(y, BLACK);
                setColor(parentOf(parentOf(x)), RED);
                // 当前节点指向祖父节点，进入下一轮循环
                x = parentOf(parentOf(x));
            }
            // 若当前节点x的叔叔节点y是黑色
            else {
                // 2.若当前节点x是其父节点的右子节点，则从x的父节点处左旋
                if (x == rightOf(parentOf(x))) {
                    x = parentOf(x);
                    rotateLeft(x);
                }
                // 3.将当前节点x的父节点变黑，祖父节点变红，从祖父节点处右旋
                setColor(parentOf(x), BLACK);
                setColor(parentOf(parentOf(x)), RED);
                rotateRight(parentOf(parentOf(x)));
            }
        }
        // 若父节点是祖父节点的右子节点，操作与上面完全对称          
        else {
            Entry<K,V> y = leftOf(parentOf(parentOf(x)));
            if (colorOf(y) == RED) {
                setColor(parentOf(x), BLACK);
                setColor(y, BLACK);
                setColor(parentOf(parentOf(x)), RED);
                x = parentOf(parentOf(x));
            } else {
                if (x == leftOf(parentOf(x))) {
                    x = parentOf(x);
                    rotateRight(x);
                }
                setColor(parentOf(x), BLACK);
                setColor(parentOf(parentOf(x)), RED);
                rotateLeft(parentOf(parentOf(x)));
            }
        }
    }
    root.color = BLACK;
}
```
#### rotate
``` java
private void rotateLeft(Entry<K,V> p) {
    if (p != null) {
        Entry<K,V> r = p.right;
        p.right = r.left;
        if (r.left != null)
            r.left.parent = p;
        r.parent = p.parent;
        if (p.parent == null)
            root = r;
        else if (p.parent.left == p)
            p.parent.left = r;
        else
            p.parent.right = r;
        r.left = p;
        p.parent = r;
    }
}

private void rotateRight(Entry<K,V> p) {
    if (p != null) {
        Entry<K,V> l = p.left;
        p.left = l.right;
        if (l.right != null) l.right.parent = p;
        l.parent = p.parent;
        if (p.parent == null)
            root = l;
        else if (p.parent.right == p)
            p.parent.right = l;
        else p.parent.left = l;
        l.right = p;
        p.parent = l;
    }
}
```
## HashTable
