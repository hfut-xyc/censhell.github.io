# 多线程基础

## 线程的创建

::: tip JDK 官方文档原文如下
> [文档链接](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html) 

There are two ways to create a new thread of execution. 

One is to declare a class to be a subclass of `Thread`. 
This subclass should override the `run` method of class `Thread`

The other way to create a thread is to declare a class that implements the `Runnable` interface. 
That class then implements the `run` method.
:::

线程的创建**本质上**只有两种方法：
- 方法1：继承 Thread 类，重写 run 方法
- 方法2：实现 Runnable 接口

在此基础上还衍生出一些其他的方法：
- 线程池+Runnable/Callable
- FutureTask

演示代码如下
<CodeGroup>
<CodeGroupItem title="继承Thread" active>

``` java
public class ThreadCreation {

    static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
        }
    }

    public static void main(String[] args) {
        Thread t1 = new MyThread();
        t1.start();
    }
}
```
</CodeGroupItem>

<CodeGroupItem title="实现Runnable">

``` java
public class ThreadCreation {
    
    public static void main(String[] args) {
        Thread t2 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName());
        });
        t2.start();
    }
}
```
</CodeGroupItem>
<CodeGroupItem title="线程池">

``` java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();
    executor.submit(() -> {
        System.out.println("HelloWorld");
    });

    Future<String> future = executor.submit(() -> "HelloWorld");
}
```
</CodeGroupItem>
<CodeGroupItem title="">

``` java
public static void main(String[] args) {
    ExecutorService executor = Executors.newCachedThreadPool();

}
```
</CodeGroupItem>
</CodeGroup>

通过查看 Thread 类的源码可知：
- 方法 1 是直接重写了整个 run 方法
- 方法 2 是调用了传入的 Runnable 接口的 run 方法
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


## 线程的中断

### 打断 sleep, wait, join 方法

### 打断正常运行的方法

### 打断 LockSupport 方法

## 线程的状态

```java
public enum State {
    NEW,
    RUNNABLE,
    BLOCKED,
    WAITING,
    TIMED_WAITING,
    TERMINATED;
}
```

| State | Description |
|--|--|
| NEW |  线程刚创建，还未调用 `start()` 启动 |
| RUNNABLE | 可能正在运行，也有可能在等待 CPU 分配时间片 |
| TERMINATED |  |
| BLOCKED | 等待锁的释放以进入临界区 |
| WAITING |  |
| TIMED_WAITING |  |


## 守护线程