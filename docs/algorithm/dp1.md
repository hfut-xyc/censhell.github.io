# 动态规划-简单题
## 爬楼梯
> [https://leetcode-cn.com/problems/climbing-stairs/](https://leetcode-cn.com/problems/climbing-stairs/)

```java
class Solution {
    public int climbStairs(int n) {
        int[] dp = new int[n + 1];
        // 1.initial state
        dp[0] = 0;
        if (n > 0)
            dp[1] = 1;
        if (n > 1)
            dp[2] = 2;
        // 2.state transfer
        for (int i = 3; i < n + 1; i++) {
            dp[i] = dp[i - 1] + dp[i - 2];
        }
        // 3.target state
        return dp[n];
    }
}
```

## 最大子数组和
> [https://leetcode-cn.com/problems/maximum-subarray/](https://leetcode-cn.com/problems/maximum-subarray/)
```java
```
