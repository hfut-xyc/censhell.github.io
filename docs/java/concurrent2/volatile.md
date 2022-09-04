# volatile
在介绍 volatile 之前，先了解一下 Java 内存模型

## Java 内存模型
JMM（Java Memory Model）定义了主内存和本地内存之间的抽象关系，它是一组规范，需要各个 JVM 的实现来遵守，以便开发者可以更高效地开发多线程程序

JMM 主要体现在三个方面：
- 有序性：确保指令不会受到指令并行优化的影响
- 可见性：确保指令不会受到 CPU 缓存的影响
- 原子性：确保指令不会受到线程上下文切换的影响

### 有序性
下面这段程序，有极小的可能性会出现 `x=0, y=0` 的结果，原因就在于发生了指令重排序
```java
@Slf4j
public class Reorder {
    private static int x = 0, y = 0;
    private static int a = 0, b = 0;

    public static void main(String[] args) throws InterruptedException {
        int i = 0;
        while (true) {
            i++;
            x = 0;
            y = 0;
            a = 0;
            b = 0;
            CountDownLatch latch = new CountDownLatch(1);

            Thread t1 = new Thread(() -> {
                try {
                    latch.await();
                } catch (InterruptedException e) {
                }
                a = 1;
                x = b;
            });

            Thread t2 = new Thread(() -> {
                try {
                    latch.await();
                } catch (InterruptedException e) {
                }
                b = 1;
                y = a;
            });
            t2.start();
            t1.start();
            latch.countDown();
            t1.join();
            t2.join();

            log.info("iter {}: x={}, y={}", i, x, y);
            if (x == 0 && y == 0) {
                break;
            }
        }
    }
}
```

重排序一般有三种情况：
- 编译器重排
- CPU 指令重排
- 内存重排

重排序的好处：在不影响程序语义的前提下，提高程序的运行速度
```java
// before       after
x = 3;          x = 3;
y = 2;          x++;
x++;            y = 2;
```
对应的汇编指令如下，重排序后执行的指令数减少了
```java
// before        after
load x          load x
set x           set x 3
store x         set x 4
                store x

load y          load y
set y 3         set y 3
store y         store y

load x
set x 4
store x
```

### 可见性
下面这段程序中，主线程尝试修改 flag 标记从而让子线程结束，但结果并不能，说明主线程对共享变量 flag 的修改对子线程不可见
```java
@Slf4j
public class Invisible {
    private static boolean flag = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            log.info("start");
            while (flag) {
                // nothing here
            }
            log.info("stop");
        }).start();

        Thread.sleep(1000);
        flag = false;
    }
}
```

一种解决方案是给 flag 变量加上 volatile 修饰，另一种是给 flag 变量加锁访问
<CodeGroup>
<CodeGroupItem title="Solution1">

```java{3}
@Slf4j
public class Visible1 {
    private static volatile boolean flag = true;

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            log.info("start");
            while (flag) {
                // nothing here
            }
            log.info("stop");
        }).start();

        Thread.sleep(2000);
        flag = false;
    }
}
```
</CodeGroupItem>
<CodeGroupItem title="Solution2" >

```java
@Slf4j
public class Visible2 {
    private static boolean flag = true;
    private static final Object lock = new Object();

    public static void main(String[] args) throws InterruptedException {
        new Thread(() -> {
            log.info("start");
            while (true) {
                synchronized (lock) {
                    if (!flag) {
                        break;
                    }
                }
            }
            log.info("stop");
        }).start();

        Thread.sleep(1000);
        synchronized (lock) {
            flag = false;
        }
    }
}
```
</CodeGroupItem>
</CodeGroup>

JMM 有以下规定：
1. 所有的共享变量都保存在主内存中，同时每个线程也有自己独立的本地内存，本地内存中保存的是主内存中的副本
2. 线程不能直接读写主内存中的变量，只能操作自己本地内存中的变量，然后再同步到主内存
3. 线程的本地内存是不共享，如果线程间需要通信，必须经过主内存

::: tip happens-before

:::

### 原子性

原子性是指一组操作具有不可分割的性质，要么全执行，要么全都不执行

Java 中的原子操作包括：
- 所有基本类型的赋值操作（long，double 除外）
- 所有引用类型的赋值操作
- java.concurrent.atomic.* 包中所有类的原子操作

但是 long, double 变量用 volatile 修饰后，赋值操作的是原子性的

## volatile 关键字

### volatile 内存语义
volatile 用于修饰成员变量或静态变量，主要有两个作用：
- 保证变量的内存可见性
- 禁止 volatile 变量与普通变量的指令重排序

::: tip 内存可见性
当一个线程对 volatile 变量进行读操作时，JMM 会将本地内存中的值设为无效，然后从主内存中读取最新的值

当一个线程对 volatile 变量进行写操作时，JMM 会将本地内存中修改后的值刷新到主内存

在这一点上，锁的释放和写入 volatile 变量、锁的获取和读取 volatile 变量都具有相同的内存语义
:::

::: tip 禁止重排序

:::

### volatile 底层原理

volatile 底层是通过内存屏障来实现可见性和有序性的

### volatile vs synchronized
volatile 只能保证可见性和有序性，不能保证原子性

synchronized 可以保证可见性、有序性和原子性


## 参考文献
- [《深入浅出 Java 多线程》第六章 Java内存模型基础知识](http://concurrent.redspider.group/article/02/6.html)
- [《深入浅出 Java 多线程》第七章 重排序与happens-before](http://concurrent.redspider.group/article/02/7.html)
- [《深入浅出 Java 多线程》第八章 volatile](http://concurrent.redspider.group/article/02/8.html)
- [Javadoop-Java 并发基础之内存模型](https://javadoop.com/post/java-memory-model)