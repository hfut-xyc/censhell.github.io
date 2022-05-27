# 线程池

## 为什么要用线程池

## 创建线程池

![](https://s2.loli.net/2022/05/21/IMNrpaF7ynP2TLf.png)

### 使用构造函数
|            Parameter             |        Description         |
| :------------------------------: | :------------------------: |
|         int corePoolSize         |         核心线程数         |
|         int maxPoolSize          |         最大线程数         |
|        long keepAliveTime        |    非核心线程的存活时间    |
| BlockingQueue workQueue |        任务阻塞队列        |
|   ThreadFactory threadFactory    | 线程工厂，用于创建新的线程 |
| RejectedExecutionHandler handler |   线程池拒绝任务时的策略   |

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



### 使用Executors的静态方法

| Implementation      | corePoolSize | maxPoolSize       | keepAliveTime | BlockingQueue       |
| ------------------- | ------------ | ----------------- | ------------- | ------------------- |
| SingleThreadPool    | 1            | 1                 | 0s            | LinkedBlockingQueue |
| FixedThreadPool     | n            | n                 | 0s            | LinkedBlockingQueue |
| CachedThreadPool    | 0            | Integer.MAX_VALUE | 60s           | SynchronousQueue    |
| ScheduledThreadPool | n            | Integer.MAX_VALUE | 0s            | DelayedWorkQueue    |

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

## 线程池执行任务



![](https://gitee.com/hfut-xyc/vuepress-blog/raw/master/image/java/2.png)

## 线程池的生命周期

![](https://gitee.com/hfut-xyc/vuepress-blog/raw/master/image/java/3.png)

| State      | Description                                                  |
| ---------- | ------------------------------------------------------------ |
| RUNNING    | 能接受新提交的任务，也能处理阻塞队列的任务                   |
| SHUTDOWN   | 不接受新提交的任务，但能处理阻塞队列的任务                   |
| STOP       | 不接受新提交的任务，也不能处理阻塞队列的任务，正在处理的任务也被中断 |
| TIDYING    | 所有任务都终止，`workCount = 0`                              |
| TERMINATED | 在钩子函数 `terminate()` 调用后进入该状态                    |
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