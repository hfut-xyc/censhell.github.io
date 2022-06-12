# 线程池

## 为什么要使用线程池
- 线程池可以复用已创建的线程，这样就可以避免频繁地创建与销毁线程
- 可以对线程进行统一管理
- 
## 线程池的创建

<div align="center"><img src="https://s2.loli.net/2022/05/21/IMNrpaF7ynP2TLf.png"/></div>
Spring中的线程池

### 使用构造函数
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
|   Parameter   |           Type           |        Description         |
| :-----------: | :----------------------: | :------------------------: |
| corePoolSize  |           int            |         核心线程数         |
|  maxPoolSize  |           int            |         最大线程数         |
| keepAliveTime |           long           |    非核心线程的存活时间    |
|   workQueue   |      BlockingQueue       |        任务阻塞队列        |
| threadFactory |      ThreadFactory       | 线程工厂，用于创建新的线程 |
|    handler    | RejectedExecutionHandler |   线程池拒绝任务时的策略   |


### 使用 Executors 的静态方法

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
}
```
| Type                | corePoolSize | maxPoolSize | keepAlive | BlockingQueue       |
| ------------------- | ------------ | ----------- | --------- | ------------------- |
| SingleThreadPool    | 1            | 1           | 0s        | LinkedBlockingQueue |
| FixedThreadPool     | n            | n           | 0s        | LinkedBlockingQueue |
| CachedThreadPool    | 0            | 2147483647  | 60s       | SynchronousQueue    |
| ScheduledThreadPool | n            | 2147483647  | 0s        | DelayedWorkQueue    |

::: tip
线程池不允许使用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让人更加明确线程池的运行规则，规避资源耗尽的风险

- `SingleThreadPool`、`FixedThreadPool` 允许的请求队列长度为 Integer.MAX_VALUE，可能会堆积大量的请求，导致 OOM 
- `CachedThreadPool`、`ScheduledThreadPool` 允许的创建线程数量为 Integer.MAX_VALUE，可能会创建大量的线程，导致 OOM
:::

## BlockingQueue

## 线程池的任务执行
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
![]()

## 线程池的生命周期

![]()

| State      | Description                                                          |
| ---------- | -------------------------------------------------------------------- |
| RUNNING    | 能接受新提交的任务，也能处理阻塞队列的任务                           |
| SHUTDOWN   | 不接受新提交的任务，但能处理阻塞队列的任务                           |
| STOP       | 不接受新提交的任务，也不能处理阻塞队列的任务，正在处理的任务也被中断 |
| TIDYING    | 所有任务都终止，`workCount = 0`                                      |
| TERMINATED | 在钩子函数 `terminate()` 调用后进入该状态                            |
- isShutdown：判断线程池是否已经关闭
- isTerminated：判断线程池是否已经终止
- awaitTermination：判断线程池在规定时间内是否终止

## 线程池的拒绝策略

|      Parameter      |                         Description                         |
| :-----------------: | :---------------------------------------------------------: |
|     AbortPolicy     | 丢弃任务，并抛出 RejectedExecutionException，默认的拒绝策略 |
|    DiscardPolicy    |                     丢弃任务，不抛异常                      |
| DiscardOldestPolicy |       丢弃队列最前面的任务，然后重新提交被拒绝的任务        |
|  CallerRunsPolicy   |          反客为主，让提交任务的线程自己处理该任务           |


## Reference