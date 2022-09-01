# 多线程
## 按序打印
> [https://leetcode.cn/problems/print-in-order/](https://leetcode.cn/problems/print-in-order/)

第一种解法可以使用 Semaphore

::: details Solution 1
``` java
import java.util.concurrent.Semaphore;

public class PrintInOrder {

    private static Semaphore second = new Semaphore(0);
    private static Semaphore third = new Semaphore(0);

    public static void first()  {
        System.out.println("first");
        second.release();
    }

    public static void second()  {
        try {
            second.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("second");
        third.release();
    }

    public static void third()  {
        try {
            third.acquire();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("third");
    }

    public static void main(String[] args) {
        Thread t1 = new Thread(PrintInOrder::first);
        Thread t2 = new Thread(PrintInOrder::second);
        Thread t3 = new Thread(PrintInOrder::third);
        t1.start();
        t2.start();
        t3.start();
    }
}
```
:::

::: details Solution 2
```java
import java.util.concurrent.CountDownLatch;

public class PrintInOrder2 {

    private static CountDownLatch second = new CountDownLatch(1);
    private static CountDownLatch third = new CountDownLatch(1);

    public static void first()  {
        System.out.println("first");
        second.countDown();
    }

    public static void second()  {
        try {
            second.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("second");
        third.countDown();
    }

    public static void third()  {
        try {
            third.await();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        System.out.println("third");
    }

    public static void main(String[] args) {
        Thread t1 = new Thread(PrintInOrder2::first);
        Thread t2 = new Thread(PrintInOrder2::second);
        Thread t3 = new Thread(PrintInOrder2::third);
        t1.start();
        t2.start();
        t3.start();
    }
}

```
:::

## 交替打印
> [https://leetcode.cn/problems/print-foobar-alternately/](https://leetcode.cn/problems/print-foobar-alternately/)

::: details Solution 
```java
import java.util.concurrent.Semaphore;

public class PrintFooBar {

    private static int n = 5;
    private static Semaphore foo = new Semaphore(1);
    private static Semaphore bar = new Semaphore(0);

    public static void foo() {
        for (int i = 1; i <= n; i++) {
            try {
                foo.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("foo");
            bar.release();
        }
    }

    public static void bar() {
        for (int i = 1; i <= n; i++) {
            try {
                bar.acquire();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            System.out.println("bar");
            foo.release();
        }
    }

    public static void main(String[] args) {
        Thread t1 = new Thread(PrintFooBar::foo);
        Thread t2 = new Thread(PrintFooBar::bar);
        t1.start();
        t2.start();
    }
}
```
:::