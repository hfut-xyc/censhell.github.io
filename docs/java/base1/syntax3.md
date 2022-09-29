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
public class DateTimeTest {

    @Test
    public void test1() throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        System.out.println(sdf.format(new Date()));
        System.out.println(sdf.parse("2022-09-10"));

        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        System.out.println(LocalDateTime.now().format(dtf));
        System.out.println(dtf.parse("2022-09-10"));
    }

    @Test
    public void test2() {
        LocalDate date = LocalDate.now();
        LocalTime time = LocalTime.now();
        LocalDateTime dateTime = LocalDateTime.now();
        System.out.println(date);
        System.out.println(time);
        System.out.println(dateTime);

        LocalDate date1 = LocalDate.of(2022, 9, 10);
        LocalTime time1 = LocalTime.of(12, 10, 22);
        LocalDateTime dateTime1 = LocalDateTime.of(2022, 9, 10, 12, 10, 22);
        System.out.println(date1);
        System.out.println(time1);
        System.out.println(dateTime1);

        LocalDate date2 = LocalDate.parse("2022-09-10");
        LocalTime time2 = LocalTime.parse("12:10:22");
        LocalDateTime dateTime2 = LocalDateTime.parse("2022-09-10T12:10:22");
        System.out.println(date2);
        System.out.println(time2);
        System.out.println(dateTime2);
    }
}
```