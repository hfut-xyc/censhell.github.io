

``` java
public class ArrayList<E> extends AbstractList<E>
        implements List<E>, RandomAccess, Cloneable, java.io.Serializable
{
    // 默认初始容量大小
    private static final int DEFAULT_CAPACITY = 10;

    private static final Object[] EMPTY_ELEMENTDATA = {};

    private static final Object[] DEFAULTCAPACITY_EMPTY_ELEMENTDATA = {};

    private static final int MAX_ARRAY_SIZE = Integer.MAX_VALUE - 8;

    // 保存ArrayList数据的数组
    transient Object[] elementData; // non-private to simplify nested class access

    // 当前数组所包含的元素个数
    private int size;

    /**
     * 用户自定义容量的构造函数
     */
    public ArrayList(int initialCapacity) {
        if (initialCapacity > 0) {
            this.elementData = new Object[initialCapacity];
        } else if (initialCapacity == 0) {
            this.elementData = EMPTY_ELEMENTDATA;
        } else {
            throw new IllegalArgumentException("Illegal Capacity: "+ initialCapacity);
        }
    }

    /**
     * 默认构造函数，初始状态是空数组，当添加第一个元素的时候数组容量才变成10
     */
    public ArrayList() {
        this.elementData = DEFAULTCAPACITY_EMPTY_ELEMENTDATA;
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

    /**
     * 将元素追加到列表的末尾
     */
    public boolean add(E e) {
        // 检查是否需要扩容
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        elementData[size++] = e;
        return true;
    }

    /**
     * 将元素插入到指定位置的前面
     */
    public void add(int index, E element) {
        rangeCheckForAdd(index);
        // 检查是否需要扩容
        ensureCapacityInternal(size + 1);  // Increments modCount!!
        // 将下标从index起所有的元素往后挪动1个单位
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

    private static int hugeCapacity(int minCapacity) {
        if (minCapacity < 0) // overflow
            throw new OutOfMemoryError();
        return (minCapacity > MAX_ARRAY_SIZE) ? Integer.MAX_VALUE : MAX_ARRAY_SIZE;
    }
}
```