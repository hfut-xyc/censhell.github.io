# Atomic 原子类

## CAS

CAS（Compare And Set）是一种原子操作
- 判断V是否等于E，如果等于，将V的值设置为N；
- 如果不等，说明已经有其它线程更新了V，则当前线程放弃更新，什么都不做。

## 原子整数-AtomicInteger
``` java

```

## 原子引用-AtomicReference

## 原子引用-ABA 问题
ABA问题，就是一个值原来是A，变成了B，又变回了A。这个时候使用CAS是检查不出变化的，但实际上却被更新了两次。

针对该问题，有两种解决思路：
- 给变量添加修改版本号，使用 `AtomicStampedReference`
- 给变量添加修改标记，对应的实现类为 `AtomicMarkableReference`

## 原子数组

## 原子字段更新器

## 原子累加器
- CAS多与自旋结合。在并发量比较高的情况下，如果自旋CAS长时间不成功，会占用大量的CPU资源

## 源码分析
``` java
public class Unsafe {

    public final native boolean compareAndSwapInt(Object o, long offset, int expected, int x);

    public final int getAndAddInt(Object o, long offset, int delta) {
        int v;
        do {
            v = getIntVolatile(o, offset);
        } while (!compareAndSwapInt(o, offset, v, v + delta));
        return v;
    }

    public final int getAndSetInt(Object o, long offset, int newValue) {
        int v;
        do {
            v = getIntVolatile(o, offset);
        } while (!compareAndSwapInt(o, offset, v, newValue));
        return v;
    }
}
```
