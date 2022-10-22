# Atomic

## CAS

CAS（Compare And Swap）是一种原子操作，判断V是否等于E，如果等于，将V的值设置为N；
如果不等，说明已经有其它线程更新了V，则当前线程放弃更新
原子类CAS与自旋结合
在并发量比较高的情况下，如果自旋CAS长时间不成功，会占用大量的CPU资源

|原子类|具体实现|
|--|--
|原子基本类型|`AtomicInteger`<br> `AtomicLong`<br> `AtomicBoolean`|
|原子引用|`AtomicReference`<br> `AtomicStampedReference`<br> `AtomicMarkableReference`|
|原子数组|`AtomicIntegerArray`<br> `AtomicLongArray`<br> `AtomicReferenceArray`|
|原子字段更新器|`AtomicIntegerArray`<br> `AtomicLongArray`<br> `AtomicReferenceArray`|
|原子累加器|`LongAdder`, `LongAccumulator`<br> `DoubleAdder`, `DoubleAccumulator`|


## 原子基本类型

``` java

```

## 原子引用

ABA问题，就是一个值原来是A，变成了B，又变回了A。这个时候使用CAS是检查不出变化的，但实际上却被更新了两次。

针对该问题，有两种解决思路：
- 给变量添加修改版本号，使用 `AtomicStampedReference`
- 给变量添加修改标记，对应的实现类为 `AtomicMarkableReference`

## 原子数组



## 原子字段更新器
被修饰的变量必须被 volatile 修饰，且不能被 static 修饰 


## 原子累加器


## AtomicInteger 源码分析
``` java
public class AtomicInteger extends Number implements java.io.Serializable {
    private static final long serialVersionUID = 6214790243416807050L;

    // setup to use Unsafe.compareAndSwapInt for updates
    private static final Unsafe unsafe = Unsafe.getUnsafe();
    private static final long valueOffset;

    static {
        try {
            valueOffset = unsafe.objectFieldOffset
                (AtomicInteger.class.getDeclaredField("value"));
        } catch (Exception ex) { throw new Error(ex); }
    }

    private volatile int value;

    public final boolean compareAndSet(int expect, int update) {
        return unsafe.compareAndSwapInt(this, valueOffset, expect, update);
    }

    public final int getAndSet(int newValue) {
        return unsafe.getAndSetInt(this, valueOffset, newValue);
    }

    public final int getAndIncrement() {
        return unsafe.getAndAddInt(this, valueOffset, 1);
    }

    public final int getAndDecrement() {
        return unsafe.getAndAddInt(this, valueOffset, -1);
    }

    public final int getAndAdd(int delta) {
        return unsafe.getAndAddInt(this, valueOffset, delta);
    }
}
```

```java
public class Unsafe {

    public final native boolean compareAndSwapInt(Object o, long offset, int expected, int x);

    public final int getAndSetInt(Object o, long offset, int newValue) {
        int v;
        do {
            v = getIntVolatile(o, offset);
        } while (!compareAndSwapInt(o, offset, v, newValue));
        return v;
    }

    public final int getAndAddInt(Object o, long offset, int delta) {
        int v;
        do {
            v = getIntVolatile(o, offset);
        } while (!compareAndSwapInt(o, offset, v, v + delta));
        return v;
    }
}
```
