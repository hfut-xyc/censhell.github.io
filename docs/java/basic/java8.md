# Java8 新特性

## Lambda 表达式
- 在lambda表达式中，只能引用值不会改变的变量
- 在lambda表达式中，声明一个与外部变量同名的参数或局部变量是不合法的
- 在lambda表达式中，使用 this 关键字时，是指创建这个lambda表达式的方法的this参数

### 函数式接口

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

### 方法引用

| 类别                     | Lambda表达式                                |
| :----------------------- | :------------------------------------------ |
| `Class::staticMethod`    | `(args) -> Class.staticMethod(args)`        |
| `Class::instanceMethod`  | `(arg0, rest) -> arg0.instanceMethod(rest)` |
| `object::instanceMethod` | `(args) -> object.instanceMethod(args)`     |
| `Class::new`             | `(args) -> new Class(args)`                 |

``` java

```

## Stream

```java
public interface Stream<T> extends BaseStream<T, Stream<T>> {

    Stream<T> filter(Predicate<? super T> predicate);

    <R> Stream<R> map(Function<? super T, ? extends R> mapper);
        
}
```

## Java8 全新时间 API

```java
public class DateTimeDemo {

    public static void test1() {
        Date date = new Date();

        SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(sdf1.format(date));

        SimpleDateFormat sdf2 = new SimpleDateFormat("HH:mm:ss");
        System.out.println(sdf2.format(date));

        SimpleDateFormat sdf3 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        System.out.println(sdf3.format(date));
    }

    public static void test2() {
        LocalDate date = LocalDate.now();
        System.out.println(date);

        LocalTime time = LocalTime.now();
        System.out.println(time);

        LocalDateTime dateTime = LocalDateTime.now();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
        System.out.println(dateTime.format(dtf));
    }

    public static void test3() {
        LocalDate date1 = LocalDate.of(2022, 1, 14);
        LocalDate date2 = LocalDate.parse("2022-01-14");

        LocalTime time1 = LocalTime.of(12, 10, 22);
        LocalTime time2 = LocalTime.parse("12:10:22");

        LocalDateTime dateTime1 = LocalDateTime.of(2022, 1, 14, 12, 10, 22);
        LocalDateTime dateTime2 = LocalDateTime.parse("2022-01-14 12:10:22");
    }
}
```

`SimpleDateFormat` 线程不安全，`DateTimeFormatter` 线程安全


## 参考文献
