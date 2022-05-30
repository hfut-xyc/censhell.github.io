

## 链表
<div align="center">
    <a href="https://leetcode.cn/problemset/all/?topicSlugs=linked-list" target="blank"> 
      <img src="https://badgen.net/badge/LeetCode/Linked List/blue?icon=sourcegraph&">
    </a>
</div>

### 2.两数相加
> [https://leetcode.cn/problems/add-two-numbers/](https://leetcode.cn/problems/add-two-numbers/)
::: details Solution
```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {
    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        int carry = 0;
        ListNode head = null, tail = null;
        while (l1 != null || l2 != null) {
            if (l1 == null) {
                l1 = new ListNode(0);
            }
            if (l2 == null) {
                l2 = new ListNode(0);
            }
            int sum = l1.val + l2.val + carry;
            if (sum < 10) {
                carry = 0;
            } else {
                carry = 1;
            }
            if (head == null) {
                head = new ListNode(sum % 10);
                tail = head;
            } else {
                tail.next = new ListNode(sum % 10);
                tail = tail.next;
            }
           
            l1 = l1.next;
            l2 = l2.next;
        }
        if (carry > 0) {
            tail.next = new ListNode(carry);
        }
        return head;
    }
}
```
:::
