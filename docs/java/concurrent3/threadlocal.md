# ThreadLocal

## 基本使用

```java
public class ThreadLocalDemo {

    private ThreadLocal<Integer> local = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) {

    }

}
```
## 实现原理

```java
public class ThreadLocal<T> {
    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }

    public T get() {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null) {
            ThreadLocalMap.Entry e = map.getEntry(this);
            if (e != null) {
                T result = (T)e.value;
                return result;
            }
        }
        return setInitialValue();
    }

    private T setInitialValue() {
        T value = initialValue();
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
        return value;
    }

    public void remove() {
         ThreadLocalMap m = getMap(Thread.currentThread());
         if (m != null)
             m.remove(this);
    }

    static class ThreadLocalMap {
        static class Entry extends WeakReference<ThreadLocal<?>> {
            Object value;
            Entry(ThreadLocal<?> k, Object v) {
                super(k);
                value = v;
            }
        }

        private Entry[] table;
	}
}

public class Thread implements Runnable {
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```
## 内存泄露

内存泄露（OOM, Out of Memory）是指一个对象已经不再使用，可是占有的内存无法回收
如果一个对象只被弱引用（WeakReference）关联，这个对象就可以被 JVM 回收


ThreadLocalMap 中每个 Entry 都包含一个对 key 的弱引用和对 value 的强引用
- 正常情况下，
如果线程一直不结束，key 可能会变成 null，value指向的对象却无法回收

## 空指针异常


## 应用场景

### SimpleDateFormat 实现线程安全

### Spring AOP 计算运行耗时

### Spring-RequestContextHolder

### Spring-DateTimeContextHolder

### MyBatis
Mybatis 中保持事务连接的一致
```java
public class SqlSessionManager implements SqlSessionFactory, SqlSession {

    private final SqlSessionFactory sqlSessionFactory;
    private final SqlSession sqlSessionProxy;

    private final ThreadLocal<SqlSession> localSqlSession = new ThreadLocal<>();

    private SqlSessionManager(SqlSessionFactory sqlSessionFactory) {
        this.sqlSessionFactory = sqlSessionFactory;
        this.sqlSessionProxy = (SqlSession) Proxy.newProxyInstance(
            SqlSessionFactory.class.getClassLoader(),
            new Class[]{SqlSession.class},
            new SqlSessionInterceptor());
    }
}

```
