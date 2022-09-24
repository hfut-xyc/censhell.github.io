# List

本文主要介绍 ArrayList, LinkedList, Vector

## ArrayList

ArrayList 是

### 常量与变量

```java
public class ArrayList<E> extends AbstractList<E>
    implements List<E>, RandomAccess, Cloneable, java.io.Serializable {
      
    // 默认初始容量大小
    private static final int DEFAULT_CAPACITY = 10;

    private static final Object[] EMPTY_ELEMENTDATA = {};

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

    // 保存数据的数组
    transient Object[] elementData; // non-private to simplify nested class access

    // 当前元素个数
    private int size;
}
```

### 初始化

```java
// 默认构造函数，初始状态是空数组，当添加第一个元素的时候数组容量才变成10
public ArrayList() {
    this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
}

public ArrayList(int initialCapacity) {
    if (initialCapacity > 0) {
        this.elementData = new Object[initialCapacity];
    } else if (initialCapacity == 0) {
        this.elementData = EMPTY_ELEMENTDATA;
    } else {
        throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
    }
}

public ArrayList(Collection<? extends E> c) {
    elementData = c.toArray();
    if ((size = elementData.length) != 0) {
        // c.toArray might (incorrectly) not return Object[] (see 6260652)
        if (elementData.getClass() != Object[].class)
            elementData = Arrays.copyOf(elementData, size, Object[].class);
    } else {
        // replace with empty array.
        this.elementData = EMPTY_ELEMENTDATA;
    }
}
```

```java

// 将元素添加到表尾
public boolean add(E e) {
    // 检查是否需要扩容
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    elementData[size++] = e;
    return true;
}

// 将元素插入到指定位置的前面
public void add(int index, E element) {
    rangeCheckForAdd(index);
    // 检查是否需要扩容
    ensureCapacityInternal(size + 1);  // Increments modCount!!
    // 从index起所有的元素往后挪动1个单位
    System.arraycopy(elementData, index, elementData, index + 1, size - index);
    // 将要插入的元素赋值到index位置
    elementData[index] = element;
    size++;
}

private void ensureCapacityInternal(int minCapacity) {
    // 如果elementData是默认构造函数初始化的空数组
    if (elementData == DEFAULTCAPACITY_EMPTY_ELEMENTDATA) {
        minCapacity = Math.max(DEFAULT_CAPACITY, minCapacity);
    }
    ensureExplicitCapacity(minCapacity);
}

private void ensureExplicitCapacity(int minCapacity) {
    modCount++;
    // 如果所需的最小容量比当前数组长度大   
    if (minCapacity - elementData.length > 0) {
        // 调用grow方法进行扩容
        grow(minCapacity);
    }
}

private void grow(int minCapacity) {
    // 新容量先设为为原来的1.5倍
    int oldCapacity = elementData.length;
    int newCapacity = oldCapacity + (oldCapacity >> 1);
    // 如果1.5倍还是不够，那干脆就把所需最小容量当作数组的新容量
    if (newCapacity - minCapacity < 0)
        newCapacity = minCapacity;
    // 如果新容量超过了ArrayList所定义的最大容量，则比较minCapacity和MAX_ARRAY_SIZE，         
    if (newCapacity - MAX_ARRAY_SIZE > 0)
        newCapacity = hugeCapacity(minCapacity);
      
    // minCapacity is usually close to size, so this is a win:
    elementData = Arrays.copyOf(elementData, newCapacity);
}
```

### 注意事项


#### toArray

::: tip
使用集合转数组的方法，必须使用集合的 toArray(T[] array)，传入的是类型完全一致、长度为 0 的空数组

无参的 `toArray()`，返回值只能是 `Object[]`，若强转其他类型数组将抛出 `ClassCastException`
:::

```java
public Object[] toArray() {
    return Arrays.copyOf(elementData, size);
}

public <T> T[] toArray(T[] a) {
    if (a.length < size)
        return (T[]) Arrays.copyOf(elementData, size, a.getClass());
    System.arraycopy(elementData, 0, a, 0, size);
    if (a.length > size)
        a[size] = null;
    return a;
}
```

#### ArrayList.subList

::: tip
subList 返回值不可强转成 ArrayList，否则会抛出 `ClassCastException`
该方法返回值是 ArrayList 的内部类 SubList，是 ArrayList 的一个视图，对子列表的所有操作最终会反馈到原列表上

在 subList 场景中，对原列表的增加或删除，均会导致子列表的遍历、增加、删除抛出 `ConcurrentModificationException`

:::

#### Arrays.asList

::: tip
asList 将数组转换成集合后，不能使用 add/remove/clear 方法，否则会抛出 `UnsupportedOperationException`

它返回的是 Arrays 的内部类 ArrayList，但是该类并没有实现集合的修改方法
它体现了[适配器模式]()，如果修改了原数组的值，列表值也会随之改变

:::

```java
String[] str = new String[] {"a", "b", "c"};   
List list = Arrays.asList(str); 
str[0] = "c"   // list.get(0) == "c"
```
## LinkedList

## Vector
