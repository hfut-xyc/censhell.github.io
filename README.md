## 介绍
<div align="center">
    <a href="https://hfut-xyc.github.io" target="blank"> 
      <img src="https://badgen.net/badge/Github/HFUT-XYC/blue?icon=github&">
    </a>
</div>

- 本仓库是 hfut-xyc 的个人博客，主要用作学习笔记
- 本仓库有 2 个分支：一个是 `master` 分支，记录着原始的 markdown 文件；另一个是 `html` 分支，存放着静态 html 文件
- 前端页面使用的是 [Vuepress2](https://v2.vuepress.vuejs.org/)，图床使用的是 [sm.ms](https://sm.ms/)

## Tip
- 插入图片统一使用 `<div align="center"><img src=""/></div>` 而不是 `![]()`，这样既可以居中，也可以调整图片大小
- 由于 Vuepress2 的严格机制，不要在 markdown 中使用 `<font>`, `<center>` 等废弃标签，尽管在开发环境下不会报错，但是打包时会出错

## Markdown enhanced
Vuepress2 默认提供了很多[增强版 markdown 功能](https://v2.vuepress.vuejs.org/zh/reference/default-theme/components.html)，丰富了页面的渲染机制
### 自定义容器
```md
::: tip
提示容器
:::

::: warning
警告容器
:::

::: danger
危险容器
:::

::: details
可收缩容器
:::
```

### 代码块选项卡
```md
<CodeGroup>
<CodeGroupItem title="YARN" active>

</CodeGroupItem>
<CodeGroupItem title="NPM" >

</CodeGroupItem>
</CodeGroup>
```
### 徽章
```md
<Badge type="tip" text="v2" vertical="top" />
<Badge type="warning" text="v2" vertical="middle" />
<Badge type="danger" text="v2" vertical="bottom" />
```