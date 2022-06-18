---
prev: /java/concurrent/3-threadpool.md
next: /java/concurrent/3-atomic.md
---

# Future & CompletableFuture

## Callable
当线程池执行异步任务时，可以提交一个 Runnable 接口的实现，但这种方法有两个缺点：
- run 方法没有返回值
- run 方法不能抛出 checked Exception

为了解决这个问题，可以选择使用 `Callable<T>` 接口
```java
@FunctionalInterface
public interface Runnable {
    void run();
}

@FunctionalInterface
public interface Callable<V> {
    V call() throws Exception;
}
```

## Future
当主线程的线程池提交一个 Callable 任务时，会返回一个 Future 对象，它表示子线程未来的执行结果。

在主线程调用 `Future.get()` 时，如果异步任务已经完成，就直接获得结果；如果还未完成，主线程就会阻塞，直到任务完成后才返回结果。

如果异步任务比较耗时，可以调用 `Future.get(long timeout, TimeUnit unit)` 限时等待结果，防止主线程一直阻塞。

Future 接口的所有方法如下所示
```java
public interface Future<V> {
    boolean cancel(boolean mayInterruptIfRunning);
    boolean isCancelled();
    boolean isDone();
    V get() throws InterruptedException, ExecutionException;
    V get(long timeout, TimeUnit unit) throws InterruptedException, ExecutionException, TimeoutException;
}
```

下面演示如何用线程池创建 Future，并用 isDone 判断任务是否完成

::: details Demo1 Future的创建
```java{9}
public static void test1_get() throws ExecutionException, InterruptedException {
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
:::

## FutureTask
``` java
public interface RunnableFuture<V> extends Runnable, Future<V> {
    void run();
}
```

## CompletableFuture

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T> {
    
}
```

### 创建
runAsync, supplyAsync
```java
public static CompletableFuture<Void> runAsync(Runnable runnable);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
```

### 回调函数
thenAccept, thenApply, thenRun, exceptionally

whenComplete, handle
```java
public CompletableFuture<Void> thenRun(Runnable action);
public CompletableFuture<Void> thenAccept(Consumer<? super T> action);
public <U> CompletableFuture<U> thenApply(Function<? super T,? extends U> fn);
public CompletableFuture<T> exceptionally(Function<Throwable, ? extends T> fn);

public CompletableFuture<T> whenComplete(BiConsumer<? super T,? super Throwable> action);
public <U> CompletableFuture<U> handle(BiFunction<? super T, Throwable, ? extends U> fn);
```

```java

```

### thenCompose, thenCombine
```java
public <U> CompletableFuture<U> thenCompose(
    Function<? super T, ? extends CompletionStage<U>> fn);

public <U,V> CompletableFuture<V> thenCombine(
    CompletionStage<? extends U> other, 
    BiFunction<? super T,? super U,? extends V> fn);
```

```java

```
### allOf anyOf
```java
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs);
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs);
```

## 参考文献
- [《Java 8 实战》第11章-CompletableFuture：组合式异步编程](https://book.douban.com/subject/26772632/)
- 