# 线程的创建

## 两种方法

按照 [JDK 官方文档](https://docs.oracle.com/en/java/javase/17/docs/api/java.base/java/lang/Thread.html) 的说法，线程的创建有2种方式：
- 方法1：继承 Thread 类，重写 run 方法
- 方法2：实现 Runnable 接口
> There are two ways to create a new thread of execution. 
>
> One is to declare a class to be a subclass of `Thread`. This subclass should override the `run` method of class `Thread`
>
> The other way to create a thread is to declare a class that implements the `Runnable` interface. That class then implements the `run` method. 

```java
public class ThreadCreation {

    public static void main(String[] args) {
        // 方法1-继承Thread类
        Thread t1 = new MyThread();

        // 方法2-Lambda表达式
        Thread t2 = new Thread(() -> {
            System.out.println(Thread.currentThread().getName());
        });

        // 方法2-匿名内部类
        Thread t3 = new Thread(new Runnable() {
            @Override
            public void run() {
                System.out.println(Thread.currentThread().getName());
            }
        });
    }

    static class MyThread extends Thread {
        @Override
        public void run() {
            System.out.println(Thread.currentThread().getName());
        }
    }
}
```

## 两者的本质区别

通过查看 Thread 类的源码可知，

```java
public class Thread {
    
    /* What will be run. */
    private Runnable target;
    
    @Override
    public void run() {
	    if (target != null) {
            target.run();
        }   
    }   
}
```

## 其他的方法

