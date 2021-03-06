const str = "this is a string";

console.log(typeof str === "string"); // true

const num = 20;

console.log(typeof num === "number"); // true

console.log(typeof NaN === "number"); // true

console.log(NaN === NaN); // false

const booleanVal = true;

console.log(typeof booleanVal === "boolean"); // true

const none = null;

console.log(typeof none === "object"); // true

console.log(none === null); // true

let notDefined = undefined;

console.log(typeof notDefined === "undefined"); // true

console.log(notDefined === undefined); // true

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
 * ??????????????????????????????
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
 * ?????????
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

wait2Copy.person.age = 28; // ?????????????????????age?????????shallowCopied???person??????age??????????????????

console.log(shallowCopied.person.age); // 28

/**
 * ?????????
 * ??????????????????????????????????????????????????????????????????????????????????????????Date,RegExp,Function???????????????
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
        // ??????value?????????????????????????????????????????????????????????????????????????????????
        copied[key] = deepCopy(val[key]);
      }
    }
  }

  return copied;
}

const deepCopied = deepCopy(wait2Copy);

console.log(wait2Copy.person !== deepCopied.person); // true

console.log(deepCopied.person.age); // 28

wait2Copy.person.age = 35; // ?????????????????????age?????????deepCopied???person??????age?????????????????????????????????????????????????????????

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
  // ???????????????
  console.log("Yes!");
}

/**
 * ??????????????????
 * @param {*} arr
 */
function removeRepeatNum(arr = []) {
  return [...new Set(arr)];
}

const origionArr = [1, 1, 1, 2, 3, 4, 5, 6, 6, 7];

console.log(removeRepeatNum(origionArr)); // [1,2,3,4,5,6,7]
