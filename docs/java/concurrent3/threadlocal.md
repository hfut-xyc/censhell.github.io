# ThreadLocal

## 介绍
先来看一个简单的例子
```java
public class ThreadLocalDemo {

    private ThreadLocal<Integer> local = ThreadLocal.withInitial(() -> 0);

    public static void main(String[] args) {

    }

}
```

## 应用场景

### SimpleDateFormat
```java

```

### AOP 统计方法运行耗时

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

## 原理
```java
public class Thread implements Runnable {
    ThreadLocal.ThreadLocalMap threadLocals = null;
}
```
- ThreadLocalMap 处理冲突采用线性探测法
- ThreadLocalMap 中的每个 Entry 都包含一个对 key 的弱引用，对 value 的强引用
- **弱引用的特点**：如果对象只被弱引用关联，即没有任何强引用关联，这个对象就可以被回收
- **OOM错误**：如果线程一直不结束，key 可能会变成 null，value指向的对象却无法回收，随着 ThreadLocal 的增多，可能会出现内存泄露


```java
public class ThreadLocal<T> {

   	static class ThreadLocalMap {

        static class Entry extends WeakReference<ThreadLocal<?>> {
            /** The value associated with this ThreadLocal. */
            Object value;

            Entry(ThreadLocal<?> k, Object v) {
                super(k);
                value = v;
            }
        }

        /**
         * The table, resized as necessary.
         * table.length MUST always be a power of two.
         */
        private Entry[] table;
	}
}
```


- 重写该方法一般采用匿名内部类的形式
- 该方法是延迟加载，当线程第一次调用 get 且之前没有调用 set，才会触发
- 如果已经调用了 remove，再次调用 get 依然会触发

```java
public class ThreadLocal<T> {
    
    protected T initialValue() {
        return null;
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

    public void set(T value) {
        Thread t = Thread.currentThread();
        ThreadLocalMap map = getMap(t);
        if (map != null)
            map.set(this, value);
        else
            createMap(t, value);
    }
}
```

## 参考文献
- [慕课网免费课-ThreadLocal](https://www.imooc.com/learn/1217)