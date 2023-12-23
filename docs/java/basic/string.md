# Java 字符串

## String 存储形式
Java 8 中，String 使用 `char[]` 存储字符串
```java
public final class String 
    implements java.io.Serializable, Comparable<String>, CharSequence {
    /** The value is used for character storage. */
    private final char value[];
    // ...
}
```

Java 9 之后 String 改用 `byte[]` 存储，并用 `coder` 来标识使用了哪种编码
```java
public final class String 
    implements java.io.Serializable,Comparable<String>, CharSequence {
    
    @Stable
    /** The value is used for character storage. */
    private final byte[] value;

    /** The identifier of the encoding used to encode the bytes*/
    private final byte coder;
}
```
## String 拼接

一般来说，如果涉及大量字符串拼接操作，建议使用 StringBuilder


## String 常量池
```java
String s1 = "a";
String s2 = "b"; 	
String s3 = "ab";               // constant pool    
String s4 = "a" + "b";          // constant pool
String s5 = s1 + s2;            // heap
String s6 = new String("ab"); 	// heap

System.out.println(s3 == s4);   // true
System.out.println(s3 == s5);   // false
System.out.println(s3 == s6);   // false

System.out.println(s4 == s5);   // false
System.out.println(s4 == s6);   // false

System.out.println(s5 == s6);   // false
```
如果在前面加上 final
```java
final String s1 = "a";
final String s2 = "b"; 	
String s3 = "ab";               // constant pool    
String s4 = "a" + "b";          // constant pool
String s5 = s1 + s2;            // constant pool

System.out.println(s3 == s5);   // true
System.out.println(s4 == s5);   // true
```