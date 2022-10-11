# Future
## Callable
用线程池执行异步任务时，可以提交一个 Runnable 接口的实现，但这种方法有两个缺点：
- run 方法没有返回值
- run 方法不能抛出 checked Exception
```java
@FunctionalInterface
public interface Runnable {
    void run();
}
```

为了解决这个问题，可以选用 Callable 接口
```java
@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

## Future
当主线程的线程池提交一个 Callable 异步任务时，会返回一个 Future 对象，它就像一个容器，用来存放子线程未来的执行结果。

当任务还未完成时，容器是空的；当任务完成后，线程池就会把结果填充到容器中。

Future 接口的所有方法如下所示
```java
public interface Future<V> {
    V get() throws InterruptedException, ExecutionException;
    V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException;
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
}
```
::: tip get
如果要获取异步任务的结果，可以在主线程调用 `get()`，此时有以下几种情况：
- 如果任务已经完成，就直接获得结果
- 如果任务还未完成，主线程就会阻塞，直到任务完成后才返回结果
- 如果任务执行时抛出异常，会抛出 `ExecutionException`
- 如果任务已经被取消，会抛出 `CancellationException`
- 如果任务很耗时，可以用重载的 `get()` 限时等待，一旦超时就会抛出 `TimeoutException`，从而防止主线程一直阻塞
:::

::: tip cancel
如果想取消任务，可以调用 `cancel()`，此时有以下几种情况：
- 如果任务还未开始，会取消成功，并返回 true
- 如果任务已经结束，会取消失败，并返回 false
- 如果任务正在执行，会根据参数 `mayInterruptIfRunning` 做判断
:::

下面演示几种 Future 的使用方法
<CodeGroup>
<CodeGroupItem title="阻塞等待" active>

```java{9}
public void test1() throws ExecutionException, InterruptedException {
    ExecutorService executor = Executors.newFixedThreadPool(4);
    Future<String> future = executor.submit(() -> {
        Thread.sleep(2500);
        return Thread.currentThread().getName();
    });

    System.out.println(future.isDone());    // false
    String result = future.get();           
    System.out.println(future.isDone());    // true
    System.out.println(result);
    executor.shutdown();
}
```
</CodeGroupItem>
<CodeGroupItem title="抛出异常">

```java{4}
public void test2() {
    ExecutorService executor = Executors.newFixedThreadPool(4);
    Future<String> future = executor.submit(() -> {
        int i = 1 / 0;
    });
    try {
        Thread.sleep(1500);
        future.get();   // 子线程并非一产生异常就抛出，而是调用 get 时才会抛出
    } catch (InterruptedException | ExecutionException e) {
        e.printStackTrace();
    }
    executor.shutdown();
}
```
</CodeGroupItem>
<CodeGroupItem title="限时等待">

```java{13,17}
public void test3() {
    ExecutorService executor = Executors.newFixedThreadPool(4);
    Future<String> future = executor.submit(() -> {
        try {
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            System.out.println(e.getMessage());
        }
        return Thread.currentThread().getName();
    });

    try {
        String result = future.get(1000, TimeUnit.MILLISECONDS);
    } catch (InterruptedException | ExecutionException e) {
        e.printStackTrace();
    } catch (TimeoutException e) {
        boolean cancel = future.cancel(true);
        System.out.println(cancel);
    }
    executor.shutdown();
}
```
</CodeGroupItem>
<CodeGroupItem title="批量执行" active>

```java{9}
public void test4() throws ExecutionException, InterruptedException {
    ExecutorService executor = Executors.newFixedThreadPool(4);
    List<Future<String>> futures = new ArrayList<>();
    for (int i = 0; i < 20; i++) {
        Future<String> future = executor.submit(() -> {
            Thread.sleep(500);
            return Thread.currentThread().getName();
        });
        futures.add(future);
    }

    for (Future future : futures) {
        System.out.println(future.get());
    }
    executor.shutdown();
}
```
</CodeGroupItem>
</CodeGroup>

## FutureTask

FutureTask 类同时实现了 Runnable, Future 接口，可以用来对 Callable 进行包装
<div align="center"><img src="https://s2.loli.net/2022/06/19/aUwnDXKdH7f4qrh.png"/></div>

FutureTask 的一个构造函数如下所示
```java
public class FutureTask<V> implements RunnableFuture<V> {

    public FutureTask(Callable<V> callable) {
        if (callable == null)
            throw new NullPointerException();
        this.callable = callable;
        this.state = NEW;       // ensure visibility of callable
    }
}
```

将它提交给线程池后，可以直接通过 FutureTask 本身获取结果，不用再额外创建 Future 对象
```java{8}
public void test5() throws ExecutionException, InterruptedException {
    ExecutorService executor = Executors.newFixedThreadPool(4);
    FutureTask<String> futureTask = new FutureTask<>(() -> {
        Thread.sleep(500);
        return Thread.currentThread().getName();
    });
    executor.submit(futureTask);
    System.out.println(futureTask.get());
    executor.shutdown();
}
```

## submit or execute
在[上一篇文章](./3-threadpool.md)中，线程池提交任务都是用 execute，但是在本文中换成了 submit

它既能提交 Runnable，也能提交 Callable，且返回均为 Future 对象，但本质上还是要调用 execute

submit 方法的声明位于 `ExecutorService` 接口
```java
public interface ExecutorService extends Executor {
    Future<?> submit(Runnable task);
    <T> Future<T> submit(Callable<T> task);
}
```
submit 方法的实现位于 `AbstractExecutorService` 接口
```java
public abstract class AbstractExecutorService implements ExecutorService {
    
    public Future<?> submit(Runnable task) {
        if (task == null) throw new NullPointerException();
        RunnableFuture<Void> ftask = newTaskFor(task, null);
        execute(ftask);
        return ftask;
    }    

    public <T> Future<T> submit(Callable<T> task) {
        if (task == null) throw new NullPointerException();
        RunnableFuture<T> ftask = newTaskFor(task);
        execute(ftask);
        return ftask;
    }
}
```