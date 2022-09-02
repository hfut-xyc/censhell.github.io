# 多线程
## 按序打印
> [https://leetcode.cn/problems/print-in-order/](https://leetcode.cn/problems/print-in-order/)


<CodeGroup>
<CodeGroupItem title="Ans1" >

```java
/**
 * synchronized + wait / notify + flag
 */
@Slf4j
public class PrintOrder1 {
    private static volatile int flag = 1;
    private static final Object lock = new Object();

    public static void first() throws InterruptedException {
        synchronized (lock) {
            while (flag != 1) {
                lock.wait();
            }
            log.info("first");
            flag = 2;
            lock.notifyAll();
        }
    }

    public static void second() throws InterruptedException {
        synchronized (lock) {
            while (flag != 2) {
                lock.wait();
            }
            log.info("second");
            flag = 3;
            lock.notifyAll();
        }
    }

    public static void third() throws InterruptedException {
        synchronized (lock) {
            while (flag != 3) {
                lock.wait();
            }
            log.info("third");
        }
    }
}

```
</CodeGroupItem>

<CodeGroupItem title="Ans2">

```java
/**
 * ReentrantLock + Condition + flag
 */
@Slf4j
public class PrintOrder2 {
    private static volatile int flag = 1;
    private static final Lock lock = new ReentrantLock();
    private static final Condition condition = lock.newCondition();

    public static void first() throws InterruptedException {
        lock.lock();
        try {
            while (flag != 1) {
                condition.await();
            }
            log.info("first");
            flag = 2;
            condition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    public static void second() throws InterruptedException {
        lock.lock();
        try {
            while (flag != 2) {
                condition.await();
            }
            log.info("second");
            flag = 3;
            condition.signalAll();
        } finally {
            lock.unlock();
        }
    }

    public static void third() throws InterruptedException {
        lock.lock();
        try {
            while (flag != 3) {
                condition.await();
            }
            log.info("third");
        } finally {
            lock.unlock();
        }
    }
}

```
</CodeGroupItem>

<CodeGroupItem title="Ans3">

```java
/**
 * Spin + flag
 */
@Slf4j
public class PrintOrder3 {
    private static volatile int flag = 1;

    public static void first() throws InterruptedException {
        while (flag != 1) {
            Thread.yield();
        }
        log.info("first");
        flag = 2;
    }

    public static void second() throws InterruptedException {
        while (flag != 2) {
            Thread.yield();
        }
        log.info("second");
        flag = 3;
    }

    public static void third() throws InterruptedException {
        while (flag != 3) {
            Thread.yield();
        }
        log.info("third");
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Ans4">

```java
/**
 * Semaphore
 */
@Slf4j
public class PrintOrder4 {
    private static Semaphore second = new Semaphore(0);
    private static Semaphore third = new Semaphore(0);

    public static void first() {
        log.info("first");
        second.release();
    }

    public static void second() throws InterruptedException {
        second.acquire();
        log.info("second");
        third.release();
    }

    public static void third() throws InterruptedException {
        third.acquire();
        log.info("third");
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="Ans5">

```java
/**
 * CountDownLatch
 */
@Slf4j
public class PrintOrder5 {
    private static CountDownLatch second = new CountDownLatch(1);
    private static CountDownLatch third = new CountDownLatch(1);

    public static void first() {
        log.info("first");
        second.countDown();
    }

    public static void second() throws InterruptedException {
        second.await();
        log.info("second");
        third.countDown();
    }

    public static void third() throws InterruptedException {
        third.await();
        log.info("third");
    }
}
```
</CodeGroupItem>
</CodeGroup>


## 交替打印
> [https://leetcode.cn/problems/print-foobar-alternately/](https://leetcode.cn/problems/print-foobar-alternately/)

<CodeGroup>

<CodeGroupItem title="Ans1">

```java

```
</CodeGroupItem>

<CodeGroupItem title="">
</CodeGroupItem>

<CodeGroupItem title="">
</CodeGroupItem>

</CodeGroup>