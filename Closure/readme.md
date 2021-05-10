# 闭包

> 闭包是指有权访问另一个函数作用域中的变量的函数，创建闭包最常用的方式就是在一个函数内部创建另一个函数。

## 创建一个闭包

```javascript
function createClosure() {
  const num = 1;
  return function () {
    return num;
  };
}

let outter_num = createClosure()();

console.log(outter_num); // 1
outter_num++;

console.log(outter_num); // 2
```

## 闭包的作用

- 能够访问函数定义时所在的词法作用域(阻止其被回收)。
- 私有化变量
- 模拟块级作用域
- 创建模块

```javascript
// 私有化变量
function privateValue() {
  let value = "private";

  function inner() {
    return value;
  }

  return {
    inner,
  };
}

const privateHandler = privateValue();

console.log(privateHandler.inner()); // private

// 模拟块级作用域
function blockScope() {
  for (var index = 0; index < 10; index++) {
    function logIndex(index) {
      setTimeout(() => {
        console.log(index);
      }, 1000);
    }

    logIndex(index);
  }
}

blockScope();

// 创建模块

function createModule() {
  const num = 0;
  function increase(n = 1) {
    return num + n;
  }

  function decrease(n = 1) {
    return num - n;
  }

  return {
    increase,
    decrease,
  };
}

const myModule = createModule();

console.log(myModule.increase(20)); // 20
console.log(myModule.decrease(10)); // 10
```

## 闭包的缺点

> 闭包会导致函数的变量一直保存在内存中，过多的闭包可能会导致内存泄漏

[参考文章-掘金](https://juejin.cn/post/6844903869399433224#heading-0)
