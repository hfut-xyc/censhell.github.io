# Java 参数传递

对象和引用


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