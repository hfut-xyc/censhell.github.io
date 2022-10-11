# CompletableFuture

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T> {
    
}
```

## 创建任务
runAsync, supplyAsync
```java
public static CompletableFuture<Void> runAsync(Runnable runnable);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
```

## 处理结果

```java
public CompletableFuture<Void> thenRun(Runnable action);
public CompletableFuture<Void> thenAccept(Consumer<? super T> action);
public <U> CompletableFuture<U> thenApply(Function<? super T,? extends U> fn);

public CompletableFuture<T> whenComplete(BiConsumer<? super T,? super Throwable> action);
```

## 处理异常
```java
public CompletableFuture<T> exceptionally(Function<Throwable, ? extends T> fn);
public <U> CompletableFuture<U> handle(BiFunction<? super T, Throwable, ? extends U> fn);
```

## 组合运行两个任务
thenCompose: 两个任务串行执行，后一个任务要用到前一个任务的结果

thenCombine：两个任务并行执行，两者的运行结果毫不相干
```java
public <U> CompletableFuture<U> thenCompose(
    Function<? super T, ? extends CompletionStage<U>> fn);

public <U,V> CompletableFuture<V> thenCombine(
    CompletionStage<? extends U> other, 
    BiFunction<? super T,? super U,? extends V> fn);
```

```java

```

## 并行运行多个任务
allOf anyOf
```java
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs);
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs);
```

## 参考文献
- [《Java 8 实战》第11章-CompletableFuture](https://book.douban.com/subject/26772632/)
- [CompletableFuture 使用介绍-Javadoop](https://javadoop.com/post/completable-future)
- [CompletableFuture 入门-JavaGuide](https://javaguide.cn/java/concurrent/completablefuture-intro.html)