# AQS

Abstract Queued Synchronizer



## 例题实战

### 按序打印
[](https://leetcode.cn/problems/print-in-order/)
``` java
class Foo {

    private Semaphore second = new Semaphore(0);
    private Semaphore third = new Semaphore(0);    

    public Foo() {}

    public void first() throws InterruptedException {
        System.out.println("first");
        second.release();
    }

    public void second() throws InterruptedException {
        second.acquire();
        System.out.println("second");
        third.release();
    }

    public void third() throws InterruptedException {
        third.acquire();
        System.out.println("third");
    }

    public static void main(String[] args) {
        Thread
    }
}

```


```java
class Foo {
    
    CountDownLatch latch1 = new CountDownLatch(1);
    CountDownLatch latch2 = new CountDownLatch(1);

    public void first(Runnable printFirst) throws InterruptedException {
        printFirst.run();
        latch1.countDown();
    }

    public void second(Runnable printSecond) throws InterruptedException {
        latch1.await();
        printSecond.run();
        latch2.countDown();
    }

    public void third(Runnable printThird) throws InterruptedException {    
        latch2.await();
        printThird.run();
    }
}

```

### 交替打印
[](https://leetcode.cn/problems/print-foobar-alternately/)

```java
class FooBar {

    private int n;
    Semaphore foo = new Semaphore(1);
    Semaphore bar = new Semaphore(0);

    public FooBar(int n) {
        this.n = n;
    }

    public void foo(Runnable printFoo) throws InterruptedException {  
        for (int i = 1; i <= n; i++) {
            foo.acquire();
            printFoo.run();
            bar.release();
        }
    }

    public void bar(Runnable printBar) throws InterruptedException {     
        for (int i = 1; i <= n; i++) {
            bar.acquire();
            printBar.run();
            foo.release();
        }
    }
}


```
### 打印奇偶数
[](https://leetcode.cn/problems/print-zero-even-odd/)