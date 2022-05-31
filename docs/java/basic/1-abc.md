# Java基础

## 数据类型
### 基本数据类型
- 
### 自动装箱与拆箱

### 基本类型与 String 转换
```java
// String -> int
String str = "123";
int i = Integer.parseInt(str);
int i = Integer.valueOf(str).intValue();

// int -> String
int i = 123;
String str = i + "";
String str = Integer.toString(i);
String str = String.valueOf(i);
```

### Class Casting
父类引用可以指向子类对象，在此前提下可以强转为子类引用
```java
Object obj = new String();	// upcasting
String str = (String) obj;	// downcasting
```

子类引用不能指向父类对象，否则会抛出异常
```java
Object obj = new Object();		
String str = (String) obj;	// ClassCastException
```

## 参数传递
Java 中的函数传参只有值传递，没有引用传递

## 内部类

### 成员内部类

### 静态内部类

### 匿名内部类

## 异常
```
graph LR
A(Throwable) --> B(Error)
A(Throwable) --> C(Exception)
C(Exception) --> D(RuntimeException)
D(RuntimeException) --> E(ArithmeticException <br/> NullPointerException <br/> IndexOutOfBoundsException)
C(Exception) --> H(IOException)
C(Exception) --> I(SQLException)
C(Exception) --> J(...)
```

## 注解
```java
public @interface 
```

## 反射
在运行状态中，对于任意一个类，都能够知道这个类的所有属性和方法；对于任意一个对象，都能够调用它的所有属性和方法

```java
java.lang.Class;
java.lang.reflect.Constructor;
java.lang.reflect.Field;
java.lang.reflect.Method;
java.lang.reflect.Modifier;
```

获得Class对象的3种方法

- `Object.getClass()`
- `obj.class`
- `Class.forName("packageName.ClassName")`

## 泛型

### 泛型类

``` java
public class Test<T> {
    private T name;
    
    public T getName();
    public void setName(T name);
}
```

### 泛型方法
``` java
public class Test {
    
    public static <T>     
}
```

### Producer Extends Consumer Super

- `<? extends T>`修饰的容器只能往外读(get)，不能往里写(set)，读取的引用只能赋值给类T及其父类
- `<? super T>`修饰的容器可以往里写(set)，但读取的引用只能赋值给Object类

### Comparable vs Comparator
``` java
package java.lang;

public interface Comparable<T> {
    public int compareTo(T o);
}

```
- 使用 Collections 类提供的static方法对集合 List 进行排序时，要么集合元素实现 Comparable 接口，要么提供一个自定义的 Comparator 接口
- Comparator接口是一个函数式接口，传参时可以用 lambda 表达式替代


```java
/**
 * Collections.java
 */
public static <T extends Comparable<? super T>> void sort(List<T> list) {
    list.sort(null);
}

public static <T> void sort(List<T> list, Comparator<? super T> c) {
    list.sort(c);
}
```