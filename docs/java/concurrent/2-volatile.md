# volatile

## 重排序

## 可见性

## 原子性

## 单例模式的8种写法

### 1.饿汉模式

```java
/**
 * 饿汉模式：类加载时就初始化
 */
public class Singleton {

    private static Singleton instance = new Singleton();

	private Singleton() {}

    public static Singleton getInstance() {
        return instance;
    }
}
```

### 2.懒汉模式

```java
/**
 * 懒汉模式：类加载时不初始化，需要用的时候再初始化
 */
public class Singleton {

    private static Singleton instance;
 
    private Singleton() {}
 
    public static synchronized Singleton getInstance(){
        if(instance == null) {
        	instance = new Singleton();
        }
        return instance;
    }
}
```

### 双重检查锁

volatile 不能省略，否则会出现指令重排序问题

```java
public class Singleton {
	
    private static volatile Singleton instance;
 
    private Singleton() {}
 
 	// 如果不采用 Double Check Lock，可能会导致重复初始化
    public static Singleton getInstance(){
        if(instance == null) {
        	synchronized (Singleton.class) {
        		if (instance == null) {
					instance = new Singleton();
				}
        	}
        }
        return instance;
    }
}
```

### 静态内部类

```java
public class Singleton {

   private static class Holder {
       public static Singleton instance = new Singleton();
   }
 
   public static Singleton getInstance(){
       return Holder.instance;
   }
}
```
###  枚举

```java
public enum Singleton {
	INSTANCE;
}
```