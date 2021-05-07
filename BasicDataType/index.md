# JavaScript 基本的数据类型

## 基础数据类型

- string 字符串
- number 数字
- boolean 布尔
- null Null
- undefined Undefined
- Symbol ES6 新加入
- BigInt ES10 新加入

> 注意 number 类型内的特殊值：[NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

## 复杂数据类型

- Array 数组
- Object 对象
- Date 日期
- RegExp 正则
- Function 函数
- Map [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Map)
- Set [MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Set)

> 关于 Set 常用于数字数组去重

```javascript
/**
 * 数字数组去重
 * @param {*} arr
 */
function removeRepeatNum(arr = []) {
  return [...new Set(arr)];
}

const origionArr = [1, 1, 1, 2, 3, 4, 5, 6, 6, 7];

console.log(removeRepeatNum(origionArr)); // [1,2,3,4,5,6,7]
```

## 数据类型的判断

```javascript
/**
 * 判断值是否是基础类型
 * @param {*} val
 */
function isBasicType(val) {
  return [
    "String",
    "Number",
    "Boolean",
    "Null",
    "Undefined",
    "Symbol",
    "BigInt",
  ].some((v) => Object.prototype.toString.call(val).includes(v));
}
```

## 面试常问问题

### JS 数据类型有哪些？

> 比较基础，答案略

### JS 这些类型数据在内存里是如何存储的？

> 栈内存是连续的，栈是一种数据结构，先进后出，
> 堆内存 是非连续的，堆是一种数据结构，无序

- 栈内存 存储基础类型
- 堆内存 存储引用类型

![栈内存、堆内存](https://pic2.zhimg.com/v2-5653d1ad171834da53a75a2189f4b2e1_1440w.jpg?source=172ae18b)

### 实现浅拷贝和深拷贝

> 可以参考 lodash 的实现 [lodash github](https://github.com/lodash/lodash/blob/master/cloneDeep.js)

```javascript
/**
 * 浅拷贝
 * @param {*} val
 */
function shallowCopy(val) {
  if (isBasicType(val)) {
    return val;
  }

  const copied = {};

  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      copied[key] = val[key];
    }
  }

  return copied;
}
```

---

```javascript
/**
 * 深拷贝
 * 这里的实现比较基础，只考虑对象的值是基础类型，并没有实现类似Date,RegExp,Function等类型的值
 * @param {*} val
 */
function deepCopy(val) {
  if (isBasicType(val)) {
    return val;
  }

  const copied = {};

  for (const key in val) {
    if (val.hasOwnProperty(key)) {
      if (isBasicType(val[key])) {
        copied[key] = val[key];
      } else {
        // 如果value还是引用类型的话，递归调用进行深拷贝，切断一切引用关联
        copied[key] = deepCopy(val[key]);
      }
    }
  }

  return copied;
}
```

### 隐式转换 或者（a===1 && a===2 && a===3）为 true,a 该如何定义?

> 隐式转换内容比较多，这里推荐一篇比较全的文章 [JavaScript 隐式类型转换，一篇就够了！](https://chinese.freecodecamp.org/news/javascript-implicit-type-conversion/#--1)

> （a===1 && a===2 && a===3）如何为 true [掘金](https://juejin.cn/post/6844903854174109710#heading-14)

```javascript
const a = {
  [Symbol.toPrimitive]: (function (hint) {
    let i = 1;
    return function () {
      return i++;
    };
  })(),
};

if (a == 1 && a == 2 && a == 3) {
  // 这里会打印
  console.log("Yes!");
}
```
