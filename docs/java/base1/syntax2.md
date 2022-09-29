# Java 语法（下）

## 异常
Java 中的异常整体分为两类：
- 受检异常（Checked Exception）
- 非受检异常（Unchecked Exception），也叫运行时异常（RuntimeException）

| 类别       | 说明 | 举例|
| ---------- | --------------------------- | ------------------------------- |
| 受检异常   | 必须要手动 catch or throws，否则无法通过编译 | IOException, SQLException                      |
| 非受检异常 | 可以不作处理，由虚拟机接管                   | ArithmeticException, IndexOutOfBoundsException |

## 枚举

## 注解
```java
public enum ElementType {
    /** Class, interface (including annotation type), or enum declaration */
    TYPE,

    /** Field declaration (includes enum constants) */
    FIELD,

    /** Method declaration */
    METHOD,

    /** Formal parameter declaration */
    PARAMETER,

    /** Constructor declaration */
    CONSTRUCTOR,

    /** Local variable declaration */
    LOCAL_VARIABLE,

    /** Annotation type declaration */
    ANNOTATION_TYPE,

    /** Package declaration */
    PACKAGE,

    /**
     * Type parameter declaration
     *
     * @since 1.8
     */
    TYPE_PARAMETER,

    /**
     * Use of a type
     *
     * @since 1.8
     */
    TYPE_USE
}

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

泛型类
``` java
public class Test<T> {
    private T name;
    
    public T getName();
    public void setName(T name);
}
```

泛型方法
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