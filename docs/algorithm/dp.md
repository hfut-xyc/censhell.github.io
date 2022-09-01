# 动态规划
<div align="center">
    <a href="https://leetcode.cn/problemset/all/?topicSlugs=dynamic-programming" target="blank"> 
      <img src="https://badgen.net/badge/LeetCode/Dynamic Programming/blue?icon=sourcegraph&">
    </a>
</div>

## 简单题
### 爬楼梯
> [https://leetcode-cn.com/problems/climbing-stairs/](https://leetcode-cn.com/problems/climbing-stairs/)

::: details Solution 
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
:::

### 最大子数组和
> [https://leetcode-cn.com/problems/maximum-subarray/](https://leetcode-cn.com/problems/maximum-subarray/)
::: details Solution
```java
```
:::

## 中等题
::: warning 
:::
### 不同路径
> [https://leetcode-cn.com/problems/unique-paths/](https://leetcode-cn.com/problems/unique-paths/)
::: details Solution
```java
class Solution {
    public int uniquePaths(int m, int n) {
        int[][] dp = new int[m][n];

        // 1.inital state
        for (int i = 0; i < m; i++) {
            dp[i][0] = 1;
        }
        for (int j = 0; j < n; j++) {
            dp[0][j] = 1;
        }

        // 2.state transfer
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = dp[i-1][j] + dp[i][j-1];
            }
        }

        // 3.target state
        return dp[m-1][n-1];
    }
}
```
:::

### 最小路径和
> [https://leetcode-cn.com/problems/minimum-path-sum/](https://leetcode-cn.com/problems/minimum-path-sum/)

::: details Solution
```java
class Solution {
    public int minPathSum(int[][] grid) {
        int m = grid.length;
        int n = grid[0].length;
        int[][] dp = new int[m][n];

        // 1.inital state
        dp[0][0] = grid[0][0]; 
        for (int i = 1; i < m; i++) {
            dp[i][0] = dp[i-1][0] + grid[i][0];
        }
        for (int j = 1; j < n; j++) {
            dp[0][j] = dp[0][j-1] + grid[0][j];
        }

        // 2.state transfer
        for (int i = 1; i < m; i++) {
            for (int j = 1; j < n; j++) {
                dp[i][j] = Math.min(dp[i-1][j] + grid[i][j], dp[i][j-1] + grid[i][j]);
            }
        }
        // 3.target state
        return dp[m-1][n-1];
    }
}
```
:::

### 最小下降路径和
> [https://leetcode.cn/problems/minimum-falling-path-sum/](https://leetcode.cn/problems/minimum-falling-path-sum/)
::: details Solution
```java
class Solution {
    public int minFallingPathSum(int[][] matrix) {
        int n = matrix.length;
        int[][] dp = new int[n][n];

        // 1.initial state
        for (int j = 0; j < n; j++) {
            dp[0][j] = matrix[0][j];
        }

        // 2.state transfer
        for (int i = 1; i < n; i++) {
            for (int j = 0; j < n; j++) {
                if (j == 0) {
                    dp[i][j] = Math.min(dp[i-1][j] + matrix[i][j], dp[i-1][j+1] + matrix[i][j]);
                } else if (j == n - 1) {
                    dp[i][j] = Math.min(dp[i-1][j] + matrix[i][j], dp[i-1][j-1] + matrix[i][j]);
                } else {
                    dp[i][j] = Math.min(dp[i-1][j-1] + matrix[i][j], dp[i-1][j+1] + matrix[i][j]);
                    dp[i][j] = Math.min(dp[i][j], dp[i-1][j] + matrix[i][j]);
                }
            }
        }

        // 3.target state
        int res = Integer.MAX_VALUE;
        for (int j = 0; j < n; j++) {
            res = Math.min(res, dp[n - 1][j]);
        }
        return res;
    }
}
```
:::




### 打家劫舍
> [https://leetcode-cn.com/problems/house-robber](https://leetcode-cn.com/problems/house-robber)

::: details Solution
```java
public class Solution {
    public int rob(int[] nums) {
        int n = nums.length;
        int[] dp = new int[n];

        // 1.initial state
        dp[0] = nums[0];
        if (n > 1) {
            dp[1] = Math.max(nums[0], nums[1]);
        }

        // 2.state transfer
        for (int i = 2; i < n; i++) {
            dp[i] = Math.max(dp[i - 1], dp[i - 2] + nums[i]);
        }

        // 3.target state
        return dp[n - 1];
    }
}

```
:::

### 零钱兑换
> [https://leetcode-cn.com/problems/coin-change/](https://leetcode-cn.com/problems/coin-change/)
::: details Solution
```java
```
:::



### 零钱兑换II
> [https://leetcode-cn.com/problems/coin-change-2/](https://leetcode-cn.com/problems/coin-change-2/)
::: details Solution
```java
```
:::


### 最长回文子串
> [https://leetcode.cn/problems/longest-palindromic-substring/](https://leetcode.cn/problems/longest-palindromic-substring/)
::: details Solution
```java
```
:::

### 最长回文子序列
> [https://leetcode-cn.com/problems/longest-palindromic-substring](https://leetcode-cn.com/problems/longest-palindromic-substring)
::: details Solution
```java
```
:::


### 最长递增子序列
> [https://leetcode-cn.com/problems/longest-increasing-subsequence](https://leetcode-cn.com/problems/longest-increasing-subsequence)
::: details Solution
```java
```
:::

### 最长公共子序列 
> [https://leetcode-cn.com/problems/longest-common-subsequence](https://leetcode-cn.com/problems/longest-common-subsequence)
::: details Solution
```java
```
:::

## 困难题
::: danger 
:::
### 编辑距离
> [https://leetcode-cn.com/problems/edit-distance](https://leetcode-cn.com/problems/edit-distance)
::: details Solution
```java
```
:::