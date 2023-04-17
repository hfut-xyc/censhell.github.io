# Java 序列化
json, xml, jdk, 
protobuf, protostuff


使用 JDK 自带的序列化，只需实现 Serializable 接口，`transient` 关键字修饰的变量不会被序列化

```java
public class SerializeTest {

    static class Student implements Serializable {
        private Integer id;
        private String name;
        private transient String address;

        public Student(Integer id, String name, String address) {
            this.id = id;
            this.name = name;
            this.address = address;
        }

        @Override
        public String toString() {
            return "id=" + id + ", name=" + name + ", address='" + address;
        }
    }

    @Test
    public void test1() throws IOException, ClassNotFoundException {
        Student student = new Student(1, "aaa", "bbb");

        // serialize
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        ObjectOutputStream oos = new ObjectOutputStream(bos);
        oos.writeObject(student);

        // deserialize
        ByteArrayInputStream bis = new ByteArrayInputStream(bos.toByteArray());
        ObjectInputStream ois = new ObjectInputStream(bis);
        Student stu = (Student) ois.readObject();
        System.out.println(stu);
    }
}
```