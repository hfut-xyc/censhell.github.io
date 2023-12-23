# Java 语法

## Java vs C++
- Java 是纯粹的面向对象语言，所有的对象都继承自 java.lang.Object，C++ 为了兼容 C 即支持面向对象也支持面向过程。
- Java 通过虚拟机从而实现跨平台特性，但是 C++ 依赖于特定的平台。
- Java 没有指针，它的引用可以理解为安全指针，而 C++ 具有和 C 一样的指针。
- Java 支持自动垃圾回收，而 C++ 需要手动回收。
- Java 不支持多重继承，只能通过实现多个接口来达到相同目的，而 C++ 支持多重继承。
- Java 不支持操作符重载，虽然可以对两个 String 对象执行加法运算，但是这是语言内置支持的操作，不属于操作符重载，而 C++ 可以。
- Java 的 goto 是保留字，但是不可用，C++ 可以使用 goto

## Java 数据类型

Java 的数据类型分为基本类型和引用类型

基本类型有 8 种，每种都分别对应 1 种 包装类型，如下表所示

| 基本类型 | 对应包装类型 | 字节 | 位数 | 默认值  | 取值范围                                   |
| -------- | ------------ | ---- | ---- | ------- | :----------------------------------------- |
| byte     | Byte         | 1    | 8    | 0       | -128 ~ 127                                 |
| short    | Short        | 2    | 16   | 0       | -32768 ~ 32767                             |
| char     | Character    | 2    | 16   | 'u0000' | 0 ~ 65535                                  |
| int      | Integer      | 4    | 32   | 0       | -2147483648 ~ 2147483647                   |
| long     | Long         | 8    | 64   | 0L      | -9223372036854775808 ~ 9223372036854775807 |
| float    | Float        | 4    | 32   | 0f      | 1.4E-45 ~ 3.4028235E38                     |
| double   | Double       | 8    | 64   | 0d      | 4.9E-324 ~ 1.7976931348623157E308          |
| boolean  | Boolean      | NaN  | 1    | false   | true, false                                |

::: warning 注意
- 所有包装类型默认值为 null
- 包装类型可用于泛型，基本类型不可以
:::

## 自动装箱与自动拆箱

基本类型转为包装类型也叫自动装箱，反之叫自动拆箱，本质都是调用了包装类型的函数
```java
Integer i = 0;      // Integer i = Integer.valueOf(0);
int x = i;          // int x = i.intValue();

Double d = 0.1f;    // Double d = Double.valueOf(0.1);
double y = d;       // double y = d. 

```

## 基本类型与 String 转换
```java
// int -> String
int i = 123;
String str = i + "";
String str = Integer.toString(i);
String str = String.valueOf(i);

// String -> int
String str = "123";
int i = Integer.parseInt(str);
```

## 包装类型的缓存机制
- Byte, Short, Integer, Long 创建了 -128~127 的缓存数据
- Character 创建了 0~127 的缓存数据
- Boolean 创建了 True、False 的缓存数据
- Float, Double 没有缓存机制

所有整型包装类对象之间值的比较，全部使用 equals 方法比较

```java
Integer i1 = 10;
Integer i2 = new Integer(10);

// false
System.out.println(i1 == i2); 

// true
System.out.println(i1.equals(i2)); 
```


## 类型转换

基本类型之间转换

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

## 浮点计算的精度丢失

```java
System.out.println(0.1 + 0.2);      // 0.30000000000000004
System.out.println(1.0 - 0.8);      // 0.19999999999999996

System.out.println(2.013 * 100);    // 201.29999999999998
System.out.println(123.3 / 100);    // 1.2329999999999999
```

涉及到金额的运算，不要使用浮点类型，务必使用 `BigDecimal`
```java
// 0.3
System.out.println(new BigDecimal("0.1").add(new BigDecimal("0.2")));

// 0.2 
System.out.println(new BigDecimal("1.0").subtract(new BigDecimal("0.8")));

// 201.300
System.out.println(new BigDecimal("2.013").multiply(new BigDecimal("100")));

// 1.233
System.out.println(new BigDecimal("123.3").divide(new BigDecimal("100")));      

```

## Java 参数传递
C++ 中函数传参的方式有`值传递`和`引用传递`两种方式，但是 Java 中的函数传参只有值传递，没有引用传递

```java
public class PassArg {

    public static void passBasic(int i) {
        i = 100;
    }

    public static void passArray(int[] array) {
        array[0] = 100;
    }

    public static void passRef1(StringBuilder str) {
        str.append("world");
    }

    public static void passRef2(StringBuilder str) {
        str = new StringBuilder("Java");
    }

    public static void main(String[] args) {
        int i = 0;
        passBasic(i);
        System.out.println(i);

        int[] array = {1, 2, 3};
        passArray(array);
        System.out.println(array[0]);

        StringBuilder str = new StringBuilder("hello");
        passRef1(str);
        System.out.println(str);    // helloworld

        passRef2(str);
        System.out.println(str);    // helloworld
    }

}

```

## super 关键字
子类拥有父类对象所有的属性和方法，但是父类中的私有属性和方法子类无法访问，只是拥有


## Java 内部类

成员内部类

静态内部类

匿名内部类


## Java 日期与格式化
```java
    public void test1() throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(sdf.format(new Date()));
        System.out.println(sdf.parse("2022-09-10"));

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        System.out.println(LocalDateTime.now().format(dtf));
        System.out.println(dtf.parse("2022-09-10"));
    }
```

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

## Lambda 表达式与方法引用
- 在lambda表达式中，只能引用值不会改变的变量
- 在lambda表达式中，声明一个与外部变量同名的参数或局部变量是不合法的
- 在lambda表达式中，使用 this 关键字时，是指创建这个lambda表达式的方法的this参数

|     函数式接口      | 函数描述符        | 方法          | 应用举例               |
| :-----------------: | ----------------- | :------------ | ---------------------- |
|      Runnable       | () -> void        | run()         | Thread(Runnable)       |
|    Callable\<T\>    | () -> T           | call()        |                        |
|   Comparator\<T\>   | (T, T) -> int     | compare(T, T) | List.sort(Comparator)  |
|    Consumer\<T\>    | T -> void         | accept(T)     | List.forEach(Consumer) |
|   Predicate\<T\>    | T -> boolean      | test(T)       | List.removeIf          |
|    Supplier\<T\>    | () -> T           | get()         | HashMap()              |
|   Function<T, R>    | T -> R            | apply(T)      | HashMap(int)           |
| BiFunction<T, U, R> | (T, U) -> R       | apply(T, U)   | HashMap(int, float)    |
|  BiConsumer<T, U>   | (T, U) ->void     |               |                        |
|  BiPredicate<T, U>  | (T, U) -> boolean |               |                        |


| 类别                     | Lambda表达式                                |
| :----------------------- | :------------------------------------------ |
| `Class::staticMethod`    | `(args) -> Class.staticMethod(args)`        |
| `Class::instanceMethod`  | `(arg0, rest) -> arg0.instanceMethod(rest)` |
| `object::instanceMethod` | `(args) -> object.instanceMethod(args)`     |
| `Class::new`             | `(args) -> new Class(args)`                 |


