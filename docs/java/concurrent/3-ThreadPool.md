---
next: /java/concurrent/3-future.md
---

# 线程池

## 介绍

### 为什么要使用线程池
- 线程池可以复用已创建的线程，从而避免反复创建与销毁线程
- 线程池可以控制并发数量，防止内存占用过多
- 可以对线程进行统一管理

### 线程池的体系

线程池的继承体系如下图所示，我们所使用的线程池一般是 ThreadPoolExecutor
<div align="center"><img src="https://s2.loli.net/2022/06/14/twYJGhB81XeuqUk.png"/></div>

父类接口中的一些重要方法如下，用法后面会详细介绍
```java
public interface Executor {
    void execute(Runnable command);
}

public interface ExecutorService extends Executor {
    void shutdown();
    List<Runnable> shutdownNow();
    boolean isShutdown();
    boolean isTerminated();
    boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException;
    
    Future<?> submit(Runnable task);
    <T> Future<T> submit(Runnable task, T result);
    <T> Future<T> submit(Callable<T> task);
}
```

## 线程池的创建
### 使用 ThreadPoolExecutor 手动创建
线程池的构造函数如下所示
```java
public ThreadPoolExecutor(int corePoolSize,
                          int maximumPoolSize,
                          long keepAliveTime,
                          TimeUnit unit,
                          BlockingQueue<Runnable> workQueue,
                          ThreadFactory threadFactory,
                          RejectedExecutionHandler handler) {
    if (corePoolSize < 0 ||
        maximumPoolSize <= 0 ||
        maximumPoolSize < corePoolSize ||
        keepAliveTime < 0)
        throw new IllegalArgumentException();
    if (workQueue == null || threadFactory == null || handler == null)
        throw new NullPointerException();
    this.corePoolSize = corePoolSize;
    this.maximumPoolSize = maximumPoolSize;
    this.workQueue = workQueue;
    this.keepAliveTime = unit.toNanos(keepAliveTime);
    this.threadFactory = threadFactory;
    this.handler = handler;
}
```
参数的含义如下表所示
| Parameter     | Type                     | Description                |
| :------------ | :----------------------- | :------------------------- |
| corePoolSize  | int                      | 核心线程数                 |
| maxPoolSize   | int                      | 最大线程数                 |
| keepAliveTime | long                     | 非核心线程的存活时间       |
| workQueue     | BlockingQueue            | 任务阻塞队列               |
| threadFactory | ThreadFactory            | 线程工厂，用于创建新的线程 |
| handler       | RejectedExecutionHandler | 线程池拒绝任务时的策略     |

> 关于阻塞队列的详细介绍，可以阅读[这篇文章](./3-container#blockingqueue.md)

### 使用 Executors 自动创建
```java
public class Executors {
    public static ExecutorService newSingleThreadExecutor() {
        return new FinalizableDelegatedExecutorService
            (new ThreadPoolExecutor(1, 1,
                                    0L, TimeUnit.MILLISECONDS,
                                    new LinkedBlockingQueue<Runnable>()));
    }

    public static ExecutorService newFixedThreadPool(int nThreads) {
        return new ThreadPoolExecutor(nThreads, nThreads,
                                      0L, TimeUnit.MILLISECONDS,
                                      new LinkedBlockingQueue<Runnable>());
    }

    public static ExecutorService newCachedThreadPool() {
        return new ThreadPoolExecutor(0, Integer.MAX_VALUE,
                                      60L, TimeUnit.SECONDS,
                                      new SynchronousQueue<Runnable>());
    }

    public static ScheduledExecutorService newScheduledThreadPool(int corePoolSize) {
        return new ScheduledThreadPoolExecutor(corePoolSize);
    }
}
```

| Type                | corePoolSize | maxPoolSize | keepAlive | BlockingQueue       |
| ------------------- | ------------ | ----------- | --------- | ------------------- |
| SingleThreadPool    | 1            | 1           | 0s        | LinkedBlockingQueue |
| FixedThreadPool     | n            | n           | 0s        | LinkedBlockingQueue |
| CachedThreadPool    | 0            | 2147483647  | 60s       | SynchronousQueue    |
| ScheduledThreadPool | n            | 2147483647  | 0s        | DelayedWorkQueue    |


### 使用建议
::: tip
不要用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让人更加明确线程池的运行规则，规避资源耗尽的风险
- SingleThreadPool、FixedThreadPool 允许的**阻塞队列长度**为 Integer.MAX_VALUE，可能会堆积大量的请求，导致 OOM
- CachedThreadPool、ScheduledThreadPool 允许的**创建线程数量**为 Integer.MAX_VALUE，可能会创建大量的线程，导致 OOM
:::

::: tip
**线程池线程数量的设置**
- CPU 密集型：最佳线程数为 CPU 核心数的 1~2 倍
- 耗时 IO 型：最佳线程数 = CPU 核心数 * (1 + 平均等待时间 / 平均工作时间)
:::

## 线程池的任务执行
线程池的提交任务的逻辑如下图所示

![]()

```java
public class ThreadPoolExecutor extends AbstractExecutorService {
    public void execute(Runnable command) {
        if (command == null)
            throw new NullPointerException();
        int c = ctl.get();
        // 当前线程数 < 核心线程数，调用 addWorker 创建核心线程执行任务
        if (workerCountOf(c) < corePoolSize) {
            if (addWorker(command, true))
                return;
            c = ctl.get();
        }
        // 
        if (isRunning(c) && workQueue.offer(command)) {
            int recheck = ctl.get();
            // 线程池已经关闭，则删除这个任务并拒绝
            if (!isRunning(recheck) && remove(command))
                reject(command);
            // 
            else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
        }
        else if (!addWorker(command, false))
            reject(command);
    }
}
```

创建线程池并执行任务的演示程序如下
```java

```

## 线程池的生命周期
线程池的生命周期如下图所示
![]()

各个状态的含义如下表所示
| State      | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| RUNNING    | 能接受新提交的任务，也能处理阻塞队列的任务                           |
| SHUTDOWN   | 不接受新提交的任务，但能处理阻塞队列的任务                           |
| STOP       | 不接受新提交的任务，也不能处理阻塞队列的任务，正在处理的任务也被中断 |
| TIDYING    | 所有任务都终止，工作线程数为 0                                       |
| TERMINATED | 调用 `terminate()` 后进入该状态                                      |


与线程池状态相关的常用函数如下
| Method           | Return  | Description                                  |
| ---------------- | ------- | -------------------------------------------- |
| shutdown         | void    |                                              |
| shutdownNow      | List    |                                              |
| awaitTermination | boolean | 在线程池关闭后，阻塞至超时或者所有任务完成 |
| isShutdown       | boolean | 判断线程池是否关闭                           |
| isTerminated     | boolean | 判断线程池是否终止                           |


### 演示程序
关闭线程池的演示代码如下
```java

```


## 线程池的拒绝策略

| Parameter           | Description                                                 |
| :------------------ | :---------------------------------------------------------- |
| AbortPolicy         | 丢弃任务，并抛出 RejectedExecutionException，默认的拒绝策略 |
| DiscardPolicy       | 丢弃任务，不抛异常                                          |
| DiscardOldestPolicy | 丢弃队列最前面的任务，然后重新提交被拒绝的任务              |
| CallerRunsPolicy    | 反客为主，让提交任务的线程自己处理该任务                    |


## 参考文献
- [《深入浅出 Java 多线程》第12章-线程池原理](http://concurrent.redspider.group/article/03/12.html)
- [《Java 并发编程的艺术》](https://book.douban.com/subject/26591326/)
- [Java线程池实现原理及其在美团业务中的实践](https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html)