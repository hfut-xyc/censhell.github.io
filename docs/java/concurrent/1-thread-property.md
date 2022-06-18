# 线程的属性

```java
public class Thread implements Runnable {

    private volatile String name;
    private int priority;
    private boolean daemon = false;

    private ThreadGroup group;
    private ClassLoader contextClassLoader;

    private long tid;
    private volatile int threadStatus = 0;
}
```
## 线程 id, 线程名

## 优先级

## 线程状态
```java
public enum State {
    NEW,
    RUNNABLE,
    BLOCKED,
    WAITING,
    TIMED_WAITING,
    TERMINATED;
}
```

