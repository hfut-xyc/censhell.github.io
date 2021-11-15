---
title: TreeMap源码阅读
date: 2020-06-17
tags: [Java]
category: Java
---

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
    // ....
}
```

#### 左旋操作
![](https://hfut-xyc.gitee.io/image/rotate-left.gif)
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
```

#### 右旋操作
![](https://hfut-xyc.gitee.io/image/rotate-right.gif)
``` java
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
#### 插入新节点后修正
![](https://hfut-xyc.gitee.io/image/red-black-tree-fix.png)
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
