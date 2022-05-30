# 并发容器

## ConcurrentHashMap

在JDK1.7中，ConcurrentHashMap采用**Segment + HashEntry**来实现底层结构：

![](https://hfut-xyc.gitee.io/image/ConcurrentHashMap-Java7.png)

- 每个ConcurrentHashMap 里包含一个 Segment 数组。
- 每个 Segment 包含一个 HashEntry 数组，每个 HashEntry 是一个存放链表结构的桶
- Segment 继承自 ReentrantLock，每个 Segment 守护着一个HashEntry数组里的元素，当对 HashEntry 数组的数据进行修改时，必须先获得对应的 Segment的锁。
  

在JDK1.8中，ConcurrentHashMap采用**数组+红黑树**来实现底层结构，采用**CAS + Synchronized**来保证并发安全：

![](https://hfut-xyc.gitee.io/image/ConcurrentHashMap-Java8.png)

- synchronized只锁定当前链表或红黑二叉树的首节点，只要hash不冲突，就不会产生并发，效率又提升N倍

``` java
    final V putVal(K key, V value, boolean onlyIfAbsent) {
        if (key == null || value == null) throw new NullPointerException();
        int hash = spread(key.hashCode());
        int binCount = 0;
        for (Node<K,V>[] tab = table;;) {
            Node<K,V> f; int n, i, fh;
            if (tab == null || (n = tab.length) == 0)
                tab = initTable();
            else if ((f = tabAt(tab, i = (n - 1) & hash)) == null) {
                if (casTabAt(tab, i, null, new Node<K,V>(hash, key, value, null)))
                    break;     // no lock when adding to empty bin
            }
            else if ((fh = f.hash) == MOVED)
                tab = helpTransfer(tab, f);
            else {
                V oldVal = null;
                synchronized (f) {
                    if (tabAt(tab, i) == f) {
                        if (fh >= 0) {
                            binCount = 1;
                            for (Node<K,V> e = f;; ++binCount) {
                                K ek;
                                if (e.hash == hash &&
                                    ((ek = e.key) == key ||
                                     (ek != null && key.equals(ek)))) {
                                    oldVal = e.val;
                                    if (!onlyIfAbsent)
                                        e.val = value;
                                    break;
                                }
                                Node<K,V> pred = e;
                                if ((e = e.next) == null) {
                                    pred.next = new Node<K,V>(hash, key,
                                                              value, null);
                                    break;
                                }
                            }
                        }
                        else if (f instanceof TreeBin) {
                            Node<K,V> p;
                            binCount = 2;
                            if ((p = ((TreeBin<K,V>)f).putTreeVal(hash, key,
                                                           value)) != null) {
                                oldVal = p.val;
                                if (!onlyIfAbsent)
                                    p.val = value;
                            }
                        }
                    }
                }
                if (binCount != 0) {
                    if (binCount >= TREEIFY_THRESHOLD)
                        treeifyBin(tab, i);
                    if (oldVal != null)
                        return oldVal;
                    break;
                }
            }
        }
        addCount(1L, binCount);
        return null;
    }
```

## CopyOnWriteArrayList

## BlockingQueue