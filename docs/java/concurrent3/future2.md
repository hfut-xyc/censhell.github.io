# CompletableFuture

```java
public class CompletableFuture<T> implements Future<T>, CompletionStage<T> {
    
}
```

## 创建
runAsync, supplyAsync
```java
public static CompletableFuture<Void> runAsync(Runnable runnable);
public static <U> CompletableFuture<U> supplyAsync(Supplier<U> supplier);
```

## 回调函数
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

## thenCompose, thenCombine
```java
public <U> CompletableFuture<U> thenCompose(
    Function<? super T, ? extends CompletionStage<U>> fn);

public <U,V> CompletableFuture<V> thenCombine(
    CompletionStage<? extends U> other, 
    BiFunction<? super T,? super U,? extends V> fn);
```

```java

```
## allOf anyOf
```java
public static CompletableFuture<Void> allOf(CompletableFuture<?>... cfs);
public static CompletableFuture<Object> anyOf(CompletableFuture<?>... cfs);
```

## 参考文献
- [《Java 8 实战》第11章-CompletableFuture：组合式异步编程](https://book.douban.com/subject/26772632/)