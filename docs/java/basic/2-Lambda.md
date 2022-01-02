## Lambda Expression
- 在lambda表达式中，只能引用值不会改变的变量
- 在lambda表达式中，声明一个与外部变量同名的参数或局部变量是不合法的
- 在lambda表达式中，使用 this 关键字时，是指创建这个lambda表达式的方法的this参数

**Method Reference**
- `object::instanceMethod`：所有参数作为 instanceMethod 的参数来调用
- `Class::instanceMethod`：第1个参数作为 instanceMethod 的调用对象，剩余参数作为该方法的参数
- `Class::staticMethod`：所有参数作为 staticMethod 的参数来调用
- `Class::new`：所有参数作为构造器的参数

```java
System.out::println //  x -> System.out.println(x)
this::equals 		//  x -> this.equals(x)

String::equals 		// (x, y) -> x.equals(y)

Math::pow 			// (x，y) -> Math.pow(x, y)

BigDecimal::new 	// x -> new BigDecimal(x)
```