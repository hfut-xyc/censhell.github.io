# 线程安全分析

## 如何实现线程安全
导致线程不安全的原因主要是多线程访问修改同一个对象的成员变量或静态变量

因此，实现线程安全大致有 3 种策略：
1. 同步访问共享变量
2. 无共享变量
3. 共享变量不可变

### 同步访问共享变量
1.使用 synchronized 或 ReentrantLock 加锁实现同步

2.使用线程安全类
- Random
- StringBuffer
- Vector, HashTable
- ConcurrentHashMap 等 java.utils.concurrent 包下的类
- AtomicInteger 等 java.utils.concurrent.atomic 包下的类

### 无共享变量

1.使用局部变量替代成员变量，但局部变量并不一定就是线程安全的，因为可能会出现变量作用域逃逸
2.ThreadLocal

### 共享变量不可变
1.如果是基本类型，使用 final 修饰即可
```java
private static final int MAX_COUNT = 0;
```

2.如果是引用类型，仅用 final 修饰只表明其引用指向的对象不可变，并不保证对象的状态不可变，所以还要使用不可变类，例如 String，Integer
```java
private static final String FORMAT = "yyyy-MM-dd";
```

## 例1-SimpleDateFormat
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
1.加锁同步访问
```java{10-12}
@Slf4j
public class ThreadSafe2 {

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