# Atomic 原子类

## CAS

CAS（Compare And Set）是一种原子操作
- 判断V是否等于E，如果等于，将V的值设置为N；
- 如果不等，说明已经有其它线程更新了V，则当前线程放弃更新，什么都不做。

## AtomicInteger
``` java

```

## AtomicReference

## AtomicArray

## AtomicFieldUpdater

## LongAdder


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