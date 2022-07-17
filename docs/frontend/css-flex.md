# flex 布局

## contrainer级别

| 属性 | 功能 |
| --- | --- |
|display |  |
|flex-direction ||
|flex-wrap||
|flex-flow|`flex-direction`+`flex-wrap`|
|justify-content||
|align-items||
|align-content||


## item 级别
| 属性 | 功能 |
| --- | --- |
|order|  |
|flex-grow||
|flex-shrink||
|flex-basis||
|flex|`flex-grow`+`flex-shrink`+`flex-basis`|
|align-self||

## 整体对齐
- 与布局方向一致，设置容器内所有元素对齐：`justify-content`
- 与布局方向垂直，设置容器内所有元素对齐：`align-items`

```html
<!DOCTYPE html>
<html>
<head>
<style>
.row {
  display: flex;
  flex-direction: row;
  height: 200px;
  border: 3px solid green; 
}

.red {
  background-color: red; 
  color: white;
}

.blue {
  background-color: blue; 
  color: white;
}
</style>
</head>

<body>
<div class="row">
  <div class="red">row1-测试文本</div>
  <div class="blue">row1-测试文本</div>
</div>
<div class="row" style="justify-content: center;">
  <div class="red">row2-测试文本</div>
  <div class="blue">row2-测试文本</div>
</div>
<div class="row" style="align-items: center;">
  <div class="red">row3-测试文本</div>
  <div class="blue">row3-测试文本</div>
</div>
<div class="row" style="align-items: center; justify-content: center;">
  <div class="red">row4-测试文本</div>
  <div class="blue">row4-测试文本</div>
</div>
</body>
</html>
```

## 单个元素对齐

- 与布局方向一致，设置容器内某个元素对齐：`justify-self`
- 与布局方向垂直，设置容器内某个元素对齐：`align-self`

```html
<!DOCTYPE html>
<html>
<head>
<style>
.row {
  display: flex;
  flex-direction: row;
  height: 200px;
  border: 3px solid green; 
}

.red {
  background-color: red; 
  color: white;
}

.blue {
  background-color: blue; 
  color: white;
}
</style>
</head>

<body>
<div class="row">
  <div class="red">row1-测试文本</div>
  <div class="blue">row1-测试文本</div>
</div>
<div class="row">
  <div class="red">row2-测试文本</div>
  <div class="blue" style="justify-self: center;">row2-测试文本</div>
</div>
<div class="row">
  <div class="red" style="align-self: center;">row3-测试文本</div>
  <div class="blue">row3-测试文本</div>
</div>
<div class="row">
  <div class="red">row4-测试文本</div>
  <div class="blue" style="align-self: center;">row4-测试文本</div>
</div>
</body>
</html>
```