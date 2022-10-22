# ThreadPool

## 为什么要用线程池
1. 线程池可以复用已创建的线程，避免频繁创建与销毁线程，从而降低资源消耗，提高响应速度。
2. 可以对线程进行统一管理

## 线程池的体系

线程池的继承体系如下图所示，我们所用的线程池一般是 ThreadPoolExecutor

![ThreadPool.png](https://s2.loli.net/2022/10/05/7CRZJkAbqH2seGp.png)

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

> 关于阻塞队列的详细介绍，可以阅读[这篇文章](./3-container.md#blockingqueue)

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


::: warning 创建线程池的方式
不要用 Executors 去创建，而是通过 ThreadPoolExecutor 的方式，这样的处理方式让人更加明确线程池的运行规则，规避资源耗尽的风险
- SingleThreadPool、FixedThreadPool 允许的**阻塞队列长度**为 Integer.MAX_VALUE，可能会堆积大量的请求，导致 OOM
- CachedThreadPool、ScheduledThreadPool 允许的**创建线程数量**为 Integer.MAX_VALUE，可能会创建大量的线程，导致 OOM
:::

::: tip 线程池线程数量的设置
- CPU 密集型：最佳线程数为 CPU 核心数的 1~2 倍
- 耗时 IO 型：最佳线程数 = CPU 核心数 * (1 + 平均等待时间 / 平均工作时间)
:::

## 线程池的任务执行

线程池的提交任务的逻辑如下图所示

<div align="center"><img src="https://s2.loli.net/2022/06/22/mHWVMk6UNbQsx58.png" >
</div>

线程池创建子线程的核心方法是 execute，它的声明位于 `Executor` 接口
```java
public interface Executor {
    void execute(Runnable command);
}
```

execute 方法的实现位于 `ThreadPoolExecutor` 类
```java
public class ThreadPoolExecutor extends AbstractExecutorService {
    public void execute(Runnable command) {
        if (command == null)
            throw new NullPointerException();
        int c = ctl.get();
        // 1.如果当前线程数 < 核心线程数, 调用 addWorker 创建核心线程执行任务
        if (workerCountOf(c) < corePoolSize) {
            if (addWorker(command, true))
                return;
            c = ctl.get();
        }
        // 2.如果当前线程数 >= 核心线程数, 将任务添加到阻塞队列
        if (isRunning(c) && workQueue.offer(command)) {
            int recheck = ctl.get();
            // 2.1 如果线程池已关闭，则将该任务从队列中删除并拒绝
            // 在多线程的环境下，可能会出现任务刚入队，线程池不处于 RUNNING 的情况，此时该任务永远无法执行
            if (!isRunning(recheck) && remove(command))
                reject(command);
            // 2.2 如果线程池未关闭，并且线程数为 0，创建非核心线程
            // 这种情况对应是 CachedThreadPool，它只会创建非核心线程
            else if (workerCountOf(recheck) == 0)
                addWorker(null, false);
        }
        // 3.如果阻塞队列已满，尝试创建非核心线程，如果失败则拒绝任务
        else if (!addWorker(command, false))
            reject(command);
    }
}

private boolean addWorker(Runnable firstTask, boolean core) {
    // ...
}
```

## 线程池的生命周期
线程池的生命周期如下图所示


线程池的生命周期有 5 种状态，每个状态的含义如下表所示
| State      | Description                                                      |
| ---------- | ---------------------------------------------------------------- |
| RUNNING    | 能接受新提交的任务，也能处理阻塞队列的任务                       |
| SHUTDOWN   | 不再接受新提交的任务，执行中和等待中的任务会继续执行             |
| STOP       | 不再接受新提交的任务，执行中的任务全部中断，等待中的任务全部取消 |
| TIDYING    | 所有任务都终止，工作线程数为 0                                   |
| TERMINATED | 调用 `terminate()` 后进入该状态                                  |

```java
public interface ExecutorService extends Executor {
    // 线程池进入 SHUTDOWN 状态，执行中和等待中的任务继续执行
    void shutdown();
    
    // 线程池进入 STOP 状态，执行中的任务全部中断，等待中的任务全部取消并返回为列表
    List<Runnable> shutdownNow();

    // 只要线程池不在 RUNNING 状态，此方法就返回 true
    boolean isShutdown();

    // 线程池状态是否为 TERMINATED
    boolean isTerminated();

    // 在线程池关闭后，阻塞至所有任务完成或者超时 
    boolean awaitTermination(long timeout, TimeUnit unit) throws InterruptedException;
}
```

关闭线程池的演示代码如下
<CodeGroup>
<CodeGroupItem title="">

```java

```
</CodeGroupItem>
<CodeGroupItem title="" >

```java

```
</CodeGroupItem>
<CodeGroupItem title="" >

```java

```
</CodeGroupItem>
<CodeGroupItem title="" >

```java

```
</CodeGroupItem>
</CodeGroup>


## 线程池的拒绝策略
当线程池的线程数达到最大值，且阻塞队列已满时，再提交任务就会被拒绝，4 种拒绝策略如下表所示

| Parameter           | Description                                                 |
| :------------------ | :---------------------------------------------------------- |
| AbortPolicy         | 丢弃任务，并抛出 RejectedExecutionException，默认的拒绝策略 |
| DiscardPolicy       | 丢弃任务，不抛异常                                          |
| DiscardOldestPolicy | 丢弃队列最前面的任务，然后重新提交被拒绝的任务              |
| CallerRunsPolicy    | 反客为主，让提交任务的线程自己处理该任务                    |


## 定时任务线程池

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

## 参考文献
- [《深入浅出 Java 多线程》第12章-线程池原理](http://concurrent.redspider.group/article/03/12.html)
- [深度解读 Java 线程池设计思想及源码实现-Javadoop](https://javadoop.com/post/java-thread-pool)
- [Java 线程池实现原理及其在美团业务中的实践](https://tech.meituan.com/2020/04/02/java-pooling-pratice-in-meituan.html)