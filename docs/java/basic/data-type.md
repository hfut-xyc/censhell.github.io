# Java 数据类型

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