# 线程的创建

## 两种基本方法

线程的创建本质上只有 2 种方法：
- 方法1：继承 Thread 类，重写 run 方法
- 方法2：实现 Runnable 接口

::: tip
[Oracle 官方文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html) 原文如下

There are two ways to create a new thread of execution. 

One is to declare a class to be a subclass of `Thread`. This subclass should override the `run` method of class `Thread`

The other way to create a thread is to declare a class that implements the `Runnable` interface. That class then implements the `run` method.
:::

演示代码如下，非常简单
```java
public class ThreadCreation {
    public static void main(String[] args) {
        // 方法1-继承Thread类
        Thread t1 = new MyThread();

        // 方法2-Lambda表达式
        Thread t2 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName());
        });

        // 方法2-匿名内部类
        Thread t3 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
    }

    static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
        }
    }
}
```

### 两者的本质区别

通过查看 Thread 类的源码可知：方法 1 是直接重写了整个 run 方法，方法 2 是调用了传入的 Runnable 接口的 run 方法

一般来说我们更推荐使用方法 2
```java
public class Thread {
    
    /* What will be run. */
    private Runnable target;
    
    @Override
    public void run() {
        if (target != null) {
            target.run();
        }   
    }   
}
```

## 其他的方法
网上有也有很多说法，把线程池、Callable、Timer 等也分别归为一种方法

其实这种说法是不太准确的，因为它们的底层实现还是用到了两种最基本的方法

### 通过线程池创建
``` java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();
    executor.submit(() -> {
        System.out.println(Thread.currentThread().getName());
    });
}
```

### 通过 Callable 创建
``` java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();
    Callable<String> callable = () -> Thread.currentThread().getName();
    Future<String> future = executor.submit(callable);
}
```

### 通过 Timer 创建
```java
public static void main(String[] args) {
    Timer timer = new Timer();
    timer.scheduleAtFixedRate(new TimerTask() {
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
        }
    }, 0, 1000);
}
```