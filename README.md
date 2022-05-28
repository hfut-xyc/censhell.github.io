## 介绍
- 本仓库有 2 个分支。一个是 `master` 分支，记录着原始的 markdown 文件；另一个是 html 分支，存放着静态 html 文件
- 前端页面使用的是 [Vuepress2](https://v2.vuepress.vuejs.org/)

## 排版
- 插入图片统一使用 `<div align="center"><img src=""/></div>` 而不是 `![]()`，这样既可以实现居中，也可以调整图片大小

## 注意
- 不要在 markdown 中使用 `<font>`, `<center>` 等废弃标签，尽管在开发环境下不会报错，但是由于 Vuepress2 的严格机制，打包时会出错

***
## Introduction
- This repository has 2 branches. One is `master`, recording the raw markdown files, the other is `html`, containing the built static html files
- The employed frontend framework is [Vuepress2](https://v2.vuepress.vuejs.org/)

## Typesetting
- Image