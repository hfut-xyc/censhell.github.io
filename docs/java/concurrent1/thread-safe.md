# 线程安全分析

导致线程不安全的原因主要是多线程访问修改同一个对象的成员变量或静态变量

因此，实现线程安全大致有 3 种策略：
- 同步访问共享变量
- 无共享变量
- 共享变量不可变

## 同步访问共享变量
1. 使用 synchronized 或 ReentrantLock 实现互斥同步
2. 使用 AtomicInteger 等原子类实现非互斥同步
3. 使用线程安全类
- StringBuffer
- Vector, HashTable
- ConcurrentHashMap, BlockingQueue, CopyOnWriteArrayList 等
- Random

组合操作并不保证线程安全
以多线程访问 SimpleDateFormat 为例，下面的代码如果直接运行，大概率会报异常
```java
@Slf4j
public class ThreadUnSafe {
    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

    public static void main() {
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                try {
                    log.info("{}", sdf.parse("2022-09-10"));
                } catch (ParseException e) {
                    log.error("{}", e.getMessage());
                }
            }).start();
        }
    }
}
```
一个简单的解决措施就是加锁同步访问
```java{10-12}
@Slf4j
public class ThreadSafe {

    private static SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
    
    public static void main() {
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                try {
                    synchronized(sdf) {
                        log.info("{}", sdf.parse("2022-09-10"));
                    }
                } catch (ParseException e) {
                    log.error("{}", e.getMessage());
                }
            }).start();
        }
    }
}
```

## 无共享变量

1. 使用栈封闭。
将成员变量替换为函数内的局部变量，但这可能会导致变量作用域逃逸，并不一定能保证线程安全
2. 使用 ThreadLocal

## 共享变量不可变
1.使用 final 关键字。适用于共享变量是基本类型
```java
private static final int count = 0;
```

2.使用不可变类。如果共享变量是引用类型，仅用 final 修饰只表明其引用指向的对象不可变，并不保证对象的状态不可变，
```java
private static final String FORMAT = "yyyy-MM-dd";
```

## demo-转账

2.将 SimpleDateFormat 对象设置为每个线程内部的局部变量
```java{6}
@Slf4j
public class ThreadSafe1 {
    public static void main() {
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                try {
                    log.info("{}", sdf.parse("2022-09-10"));
                } catch (ParseException e) {
                    log.error("{}", e.getMessage());
                }
            }).start();
        }
    }
}
```

3.使用 ThreadLocal
```java{10}
@Slf4j
public class ThreadSafe3 {
    private static ThreadLocal<SimpleDateFormat> threadLocal = 
        ThreadLocal.withInitial(() -> new SimpleDateFormat("yyyy-MM-dd"));

    public static void main() {
        for (int i = 0; i < 5; i++) {
            new Thread(() -> {
                try {
                    log.info("{}", threadLocal.get().parse("2022-09-10"));
                } catch (ParseException e) {
                    log.error("{}", e.getMessage());
                }
            }).start();
        }
    }
}
```

4.使用 DateTimeFormatter
```java

```