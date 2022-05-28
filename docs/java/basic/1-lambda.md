# Lambda 表达式
- 在lambda表达式中，只能引用值不会改变的变量
- 在lambda表达式中，声明一个与外部变量同名的参数或局部变量是不合法的
- 在lambda表达式中，使用 this 关键字时，是指创建这个lambda表达式的方法的this参数

## 函数式接口

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

## 方法引用

| 类别                     | Lambda表达式                                |
| :----------------------- | :------------------------------------------ |
| `Class::staticMethod`    | `(args) -> Class.staticMethod(args)`        |
| `Class::instanceMethod`  | `(arg0, rest) -> arg0.instanceMethod(rest)` |
| `object::instanceMethod` | `(args) -> object.instanceMethod(args)`     |
| `Class::new`             | `(args) -> new Class(args)`                 |

``` java
public class Test {
    
    
}
```

## 案例

