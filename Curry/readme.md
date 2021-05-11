# [柯里化](https://zh.javascript.info/currying-partials)

```javascript
function curry(func) {
  return function curried(...args) {
    if (args.length >= func.length) {
      // 如果返回的函数的参数大于等于要柯里化的原函数的参数，说明参数传满了，可以直接调用原函数返回结果
      return func.apply(this, args);
    } else {
      // 否则返回一个新的函数，此函数递归调用curried函数，参数是每次返回偏函数的concat之后的数组
      return function (...args2) {
        return curried.apply(this, [...args, ...args2]);
      };
    }
  };
}

function add(a, b, c, d) {
  return a + b + c + d;
}

const myAdd = curry(add);

console.log(myAdd(1)(2)(3)(4)); // 10
```
