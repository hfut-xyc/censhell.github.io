# Java 入门

## 数据类型

Java 中有 8 种基本数据类型，分别对应 1 种 包装类型，如下表所示

| 基本类型 | 对应包装类型 | 字节 | bit | 默认值  | 取值范围                                   |
| -------- | ------------ | ---- | --- | ------- | :------------------------------------------ |
| byte     | Byte         | 1    | 8   | 0       | -128 ~ 127                                 |
| short    | Short        | 2    | 16  | 0       | -32768 ~ 32767                             |
| char     | Character    | 2    | 16  | 'u0000' | 0 ~ 65535                                  |
| int      | Integer      | 4    | 32  | 0       | -2147483648 ~ 2147483647                   |
| long     | Long         | 8    | 64  | 0L      | -9223372036854775808 ~ 9223372036854775807 |
| float    | Float        | 4    | 32  | 0f      | 1.4E-45 ~ 3.4028235E38                     |
| double   | Double       | 8    | 64  | 0d      | 4.9E-324 ~ 1.7976931348623157E308          |
| boolean  | Boolean      | NaN  | 1   | false   | true, false                                |

- 包装类型默认值为 null
- 包装类型可用于泛型，基本类型不可以

### 自动装箱与拆箱
```java
Integer i = 0;   // boxing
int x = i;       // unboxing
```
等价于以下两行代码
```java
Integer i = Integer.valueOf(0);
int x = i.intValue();
```

### 基本类型与 String 转换
```java
// int -> String
int i = 123;
String str = i + "";
String str = Integer.toString(i);
String str = String.valueOf(i);
```

```java
// String -> int
String str = "123";
int i = Integer.parseInt(str);
```

### 包装类型的缓存机制
- Byte, Short, Integer, Long 创建了 -128~127 的缓存数据
- Character 创建了 0~127 的缓存数据
- Boolean 创建了 True、False 的缓存数据
- Float, Double 没有缓存机制


### BigDecimal

double 类型的计算有时候会造成精度丢失，所以涉及金额的计算务必使用 `BigDecimal`
```java
public class BigDecimalDemo {
    public static void main(String[] args) {
        System.out.println(0.1 + 0.2);
        System.out.println(1.0 - 0.8);
        System.out.println(2.013 * 100);
        System.out.println(123.3 / 100);

        System.out.println(new BigDecimal(0.1).add(new BigDecimal(0.2)));
    }
}
```

```
0.30000000000000004
0.19999999999999996
201.29999999999998
1.2329999999999999
0.3000000000000000166533453693773481063544750213623046875
```

## Class Casting
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
Java 中的异常整体分为两类：
- 受检异常（Checked Exception）
- 非受检异常（Unchecked Exception），也叫运行时异常（RuntimeException）

| 类别       | 说明 | 举例|
| ---------- | --------------------------- | ------------------------------- |
| 受检异常   | 必须要手动 catch or throws，否则无法通过编译 | IOException, SQLException                      |
| 非受检异常 | 可以不作处理，由虚拟机接管                   | ArithmeticException, IndexOutOfBoundsException |

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