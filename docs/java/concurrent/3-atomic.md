# Atomic 原子类

## 介绍

### CompareAndSwap
比较并交换（Compare And Swap, CAS）有这样三个值：
- V：要更新的变量(var)
- E：预期值(expected)
- N：新值(new)

比较并交换的过程如下：

- 判断V是否等于E，如果等于，将V的值设置为N；
- 如果不等，说明已经有其它线程更新了V，则当前线程放弃更新，什么都不做。

有没有可能在判断V为E之后，正准备更新它的新值的时候，被其它线程更改了V的值？

- 不会的。因为CAS是一种原子操作，是一条CPU的原子指令 CMPXCHG，从CPU层面保证它的原子性

## AtomicInteger

``` java
public class AtomicInteger {

    public final int getAndAdd(int delta) {
        return unsafe.getAndAddInt(this, valueOffset, delta);
    }

    public final int getAndIncrement() {
        return unsafe.getAndAddInt(this, valueOffset, 1);
    }

    public final int getAndDecrement() {
        return unsafe.getAndAddInt(this, valueOffset, -1);
    }

    public final int getAndSet(int newValue) {
        return unsafe.getAndSetInt(this, valueOffset, newValue);
    }
}

```
CAS是一种原子操作，是一条CPU的原子指令 CMPXCHG，从CPU层面保证它的原子性
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

## AtomicArray

## AtomicReference

## AtomicFieldUpdater

## LongAdder


## CAS的三大问题

### ABA问题

- ABA问题，就是一个值原来是A，变成了B，又变回了A。这个时候使用CAS是检查不出变化的，但实际上却被更新了两次。
- ABA问题的解决思路是在变量前面加上**版本号或者时间戳**，使用JDK 1.5开始就提供的`AtomicStampedReference`类来解决ABA问题

### 循环时间长开销大

- CAS多与自旋结合。在并发量比较高的情况下，如果自旋CAS长时间不成功，会占用大量的CPU资源

### 只能保证一个共享变量的原子操作

- 使用JDK 1.5开始就提供的`AtomicReference`类保证对象之间的原子性，把多个变量放到一个对象里面进行CAS操作
- 使用锁。锁内的临界区代码可以保证只有当前线程能操作


## 参考文献