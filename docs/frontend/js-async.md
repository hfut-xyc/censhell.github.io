# JavaScript 异步编程

本文将依次介绍 JS 中的异步编程的三种写法：
- 回调函数嵌套
- Promise
- async/await

## 回调函数嵌套

```js
setTimeout(function () {
    console.log("1st");
    setTimeout(function () {
        console.log("2nd");
        setTimeout(function () {
            console.log("3rd");
        }, 1000);
    }, 1000);
}, 1000);
```

## Promise

```js
new Promise(function (resolve, reject) {
    setTimeout(function () {
        console.log("1st");
        resolve();
    }, 1000);
}).then(function () {
    return new Promise(function (resolve, reject) {
        setTimeout(function () {
            console.log("2nd");
            resolve();
        }, 1000);
    });
}).then(function () {
    setTimeout(function () {
        console.log("3rd");
    }, 1000);
});
```


## async/await
