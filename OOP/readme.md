# 面向对象的编程语言 JavaScript

> JavaScript 是一门弱类型（动态）编程语言。
> 它和像 Java 这种强类型语言不通的在于，你不用提前声明变量的数据类型，就可以给一个变量进行赋值，并能且在后续可以为这个变量赋值任意其他不同类型的值。
> 这是它非常灵活的地方，当然也是容易出现问题的地方，因为太过灵活的赋值行为会打破既有对的对数据的处理逻辑，可能要加各种类型的判断来避免一些不必要的异常的出现。

```javascript
/**
 * 两数求和
 * @param {*} a number
 * @param {*} b number
 */
function sum(a, b) {
  return a + b;
}

sum(1, {}); // 异常状态

// 比如我们有这样一个很简单的求和函数，接受两个参数，
// 我们理所当然的认为参数类型应该都是数字类型，但是在实际的调用过程中，
// 我们并无法保证调用端对的传值是否符合我们的预期，而在编码阶段，JS并不具备这种你那个类型检查的能力，
// 如果需要在编码阶段就能暴露出这种问题，我们那需要借助TypeScript的静态检查
```

## JavaScript 的面向对象的实现

> 实现一个类

```javascript
/**
 * Person 构造函数
 * @param {*} name string
 */
function Person(name) {
  this.name = name;
}

const person = new Person("小明");

console.log(person.name); // 小明

console.log(person instanceof Person); // true
```

既然是面向对象就会有继承，JavaScript 的继承是基于原型链来实现的。

### 原型链继承

> 这是最基本基础的继承方式，但是存在两个问题
>
> 1. 引用类型的属性被所有实例共享
> 2. 在创建子类的实例的时候无法向父类传参

```javascript
/**
 * 人类基类
 */
function Human() {
  this.gender = "male";
}

/**
 * Person 构造函数
 * @param {*} name string
 */
function Person(name) {
  this.name = name;
}

Person.prototype = new Human(); // 将Human的实例 赋值给Person的原型，所有的Person的实例都具有了Human上面的gender属性且值为male

const xiaoming = new Person("小明");

const xiaohong = new Person("小红");

console.log(xiaoming.name); // 小明

console.log(xiaoming.gender); // male

console.log(xiaohong.name); // 小红

console.log(xiaohong.gender); // male  但其实我想小红是个女孩，却无法传参，且我一旦修改了小红的性别，连同小明也修改了
```

### 借助构造函数继承

> 这是很经典的继承方式有两个好处
>
> 1. 可以向父类传参
> 2. 修改某一个实例的父类上的属性不会引发另外一个的改变
>
> 当然也存在问题：那就是每次 new 一个子类的实例，都要实例化一次父类 （方法都在构造函数中定义，每次创建实例都会创建一遍方法）

```javascript
/**
 * 人类基类
 */
function Human(gender) {
  this.gender = gender;
}

/**
 * Person 构造函数
 * @param {*} name string
 */
function Person(name, gender) {
  Human.call(this, gender);
  this.name = name;
}

const xiaoming = new Person("小明", "male");
const xiaohong = new Person("小红", "female");

console.log(xiaoming.name); // 小明
console.log(xiaoming.gender); // male
xiaoming.name = "大红";
xiaoming.gender = "女性";
console.log(xiaoming.name); // 大红
console.log(xiaoming.gender); // 女性
console.log(xiaohong.name); // 小红
console.log(xiaohong.gender); // female
```

### 组合继承

> 融合原型链继承和构造函数的优点，是 JavaScript 中最常用的继承模式。
> 而且我们看到只有通过原型链的方式实现的继承，才会在使用 instanceof 去判断类型的时候返回 true

```javascript
/**
 * 人类基类
 */
function Human(gender) {
  this.gender = gender;
  this.hobbies = [];
}

/**
 * Person 构造函数
 * @param {*} name string
 */
function Person(name) {
  this.name = name;
}

/**
 * 男人
 * @param {*} name
 * @param {*} age
 */
function Man(name, age) {
  Person.call(this, name);
  this.age = age;
}

Man.prototype.constructor = Man;

/**
 * 女人
 * @param {*} name
 * @param {*} age
 */
function Woman(name, age) {
  Person.call(this, name);
  this.age = age;
}

Woman.prototype.constructor = Woman;

Woman.prototype = new Human("female");

Man.prototype = new Human("male");

const xiaoming = new Man("小明", 20);
xiaoming.hobbies.push("篮球");
const xiaohong = new Woman("小红", 18);
xiaohong.hobbies.push("跳舞");

console.log(xiaoming.name); // 小明
console.log(xiaoming.gender); // male
console.log(xiaoming.hobbies); // [ '篮球' ]

console.log(xiaoming instanceof Human); // true
console.log(xiaoming instanceof Person); // false
console.log(xiaoming instanceof Man); // true

console.log(xiaohong.name); // 小红
console.log(xiaohong.gender); // female
console.log(xiaohong.hobbies); // [ '跳舞' ]
```

再看一个小例子

```javascript
function Human(gender) {
  this.gender = gender;
}

function Man(gender) {
  Human.call(this, gender);
}

Man.prototype = new Human("female");

const man = new Man("male");

console.log(man instanceof Man); // true
console.log(man instanceof Human); // true
console.log(man.gender); // male

// 这个例子说明 构造函数式的继承传参会复写原型链里的初始传参
// 当注释了 Man.prototype = new Human("female");这一行，man instanceof Human 值是false
```

### 原型继承

> 这种原型是继承非常有意思,通过下面的打印就能看出,虽然打印对象本身没有 name，age 字段，但是我们通过点也能取到值，但是通过 hasOwnProperty 判断实例上是否具有 name 和 age 属性，结果又是 false,那么 name 和 age 到底存在在哪里呢？看着行代码就知道了：`Man.prototype = person;`
> 缺点：包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样

```javascript
/**
 * @param {*} person
 */
function createMan(person) {
  function Man() {
    this.gender = "male";
  }

  Man.prototype = person;

  return new Man();
}

const person1 = {
  name: "小明",
  age: 20,
  hobbies: ["basketball"],
};

const xiaoming = createMan(person1);
const xiaohong = createMan(person1);

console.log(xiaoming); // { gender: 'male' }
console.log(xiaohong); // { gender: 'male' }

// 修改小红的性别和年龄、姓名  如果不做这些修改 小明和小红属性上没什么区别
xiaohong.gender = "female";
xiaohong.age = 18;
xiaohong.name = "小红";
xiaohong.hobbies.push("跳舞");

console.log(xiaohong.name); // 小红
console.log(xiaohong.age); // 18
console.log(xiaohong.gender); // female
console.log(xiaohong.hobbies); // [ 'basketball', '跳舞' ]

console.log(xiaoming.name); // 小明
console.log(xiaoming.age); // 20
console.log(xiaoming.gender); // male
console.log(xiaoming.hobbies); // [ 'basketball', '跳舞' ]  我们发现对于引用类型，一个实例变化，也会影响其他的实例

console.log(xiaoming.hasOwnProperty("name")); // false
console.log(xiaoming.hasOwnProperty("age")); // false
console.log(xiaoming.hasOwnProperty("gender")); // true

for (const key in xiaoming) {
  console.log(key); // 这里会依次打印 gender,name,age,hobbies
}
```

### 寄生式继承

> 创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做增强对象，最后返回对象。
> 缺点： 跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

```javascript
function createMan(person) {
  const cloned = Object.create(person);

  cloned.gender = "male";

  cloned.hobbies = ["backetball"];

  cloned.addHobby = function (hobby) {
    cloned.hobbies.push(hobby);
  };

  return cloned;
}

const person = {
  name: "xiaoming",
  age: 20,
};

const xiaoming = createMan(person);

xiaoming.addHobby("baseball");

console.log(xiaoming);
// {
//     gender: 'male',
//     hobbies: [ 'backetball', 'baseball' ],
//     addHobby: [Function]
// }

console.log(xiaoming.name); // 小明
console.log(xiaoming.age); // 20
```

### 寄生组合式继承

> 如名字所示，就是组合和寄生的结合：
> 相比寄生，他继承的数据属性不会互相影
> 相比组合又少了一次 Human 的调用
> 且通过 instanceof 判断都为 true,说明创造的实例即是 Man 的实例 也是 Human 的实例

```javascript
function createMan(Child, Parent) {
  const prototype = Object.create(Parent.prototype);

  prototype.constructor = Child;

  Child.prototype = prototype;
}

function Human(name) {
  this.name = name;
  this.hobbies = [];
}

function Man(name, age) {
  Human.call(this, name);
  this.gender = "male";
  this.age = age;
}

createMan(Man, Human);

const xiaoming = new Man("小明", 20);
const xiaoliang = new Man("小亮", 18);

console.log(xiaoming instanceof Man); // true
console.log(xiaoming instanceof Human); // true
console.log(xiaoliang instanceof Man); // true
console.log(xiaoliang instanceof Human); // true

xiaoming.hobbies.push("basketball");
console.log(xiaoming); // Man { hobbies: [ 'basketball' ], gender: 'male', age: 20 }
xiaoliang.age = 29;
xiaoliang.gender = "female";
console.log(xiaoliang); // Man { hobbies: [], gender: 'female', age: 29 }
```
