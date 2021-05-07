const str = "this is a string";

console.log(typeof str === "string"); // true

const num = 20;

console.log(typeof num === "number"); // true

const booleanVal = true;

console.log(typeof booleanVal === "boolean"); // true

const none = null;

console.log(typeof none === "object"); // true

console.log(none === null); // true

let notDefined = undefined;

console.log(typeof notDefined === "undefined"); // true

const unique = Symbol("unique");

console.log(typeof unique === "symbol"); // true

const func = () => {};

console.log(typeof func === "function"); // true

const bigNum = 1000000000000000n;

console.log(typeof bigNum === "bigint"); // true

const obj = { name: "Peter" };

console.log(typeof obj === "object"); // true

console.log(Object.prototype.toString.call(obj) === "[object Object]"); // true

const arr = [1, 2, true];

console.log(Array.isArray(arr)); // true

console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true

console.log(typeof arr === "object"); // true

console.log(arr instanceof Array); // true

const date = new Date();

console.log(Object.prototype.toString.call(date) === "[object Date]");

console.log(date instanceof Date); // true

console.log(typeof date === "object"); // true

const regExp = new RegExp(/[a-z]/g);

console.log(regExp instanceof RegExp); // true

console.log(Object.prototype.toString.call(regExp) === "[object RegExp]"); // true

console.log(typeof regExp === "object"); // true

function func2() {}

console.log(func2 instanceof Function); // true

console.log(Object.prototype.toString.call(func2) === "[object Function]"); // true

console.log(typeof func2 === "function"); // true

const map = new Map();

console.log(typeof map === "object"); // true

console.log(Object.prototype.toString.call(map) === "[object Map]"); // true

console.log(map instanceof Map); // true

const set = new Set();

console.log(typeof set === "object"); // true

console.log(Object.prototype.toString.call(set) === "[object Set]"); // true

console.log(set instanceof Set); // true

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

console.log(isBasicType(str)); // true

console.log(isBasicType(num)); // true

console.log(isBasicType(booleanVal)); // true

console.log(isBasicType(null)); // true

console.log(isBasicType(undefined)); // true

console.log(isBasicType(Symbol(1))); // true

console.log(isBasicType(10000000000000n)); // true

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

const wait2Copy = { person: { name: "peter", age: 20 } };

const shallowCopied = shallowCopy(wait2Copy);

console.log(wait2Copy.person === shallowCopied.person); // true

console.log(shallowCopied.person.age); // 20

wait2Copy.person.age = 28; // 修改了元数据的age之后，shallowCopied的person下的age也发生了变化

console.log(shallowCopied.person.age); // 28

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

const deepCopied = deepCopy(wait2Copy);

console.log(wait2Copy.person !== deepCopied.person); // true

console.log(deepCopied.person.age); // 28

wait2Copy.person.age = 35; // 修改了元数据的age之后，deepCopied的person下的age没有发生变化，因为切换了指针的指向关系

console.log(deepCopied.person.age); // 28

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
