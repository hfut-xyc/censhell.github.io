# 线程安全分析

导致线程不安全的原因主要是多个线程访问修改共享变量，它可以是成员变量，也可以是静态变量

因此，实现线程安全大致有 3 种策略：
1. 无共享变量
2. 共享变量不可变
3. 同步访问共享变量

## 无共享变量

1.使用局部变量，不用成员变量或静态变量
```java

```
但局部变量并不一定就是线程安全的，因为可能会出现变量作用域逃逸
```java
 
```

2.使用 ThreadLocal
```java
 
```

## 共享变量不可变
1.如果是基本类型，使用 final 修饰即可
```java
private static final int MAX_COUNT = 0;
```

2.如果是引用类型，仅用 final 修饰只表明其引用指向的对象不可变，并不保证对象的状态不可变，所以还要使用不可变类，例如 String，Integer
```java
private static final String FORMAT = "yyyy-MM-dd";
```

## 同步访问共享变量

1.使用 synchronized 或 ReentrantLock 加锁实现同步

2.使用线程安全类
- Random
- StringBuffer
- Vector, HashTable
- ConcurrentHashMap 等 java.utils.concurrent 包下的类
- AtomicInteger 等 java.utils.concurrent.atomic 包下的类