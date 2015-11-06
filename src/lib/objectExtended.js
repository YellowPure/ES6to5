function getPoint() {
    let x = 1;
    let y = 10;
    console.log({ x, y });
    return { x, y };
}
getPoint();//{x:1,y:10}

var ms = {};
function getItem(key) {
    return key in ms ? ms[key] : null;
}

function setItem(key, value) {
    ms[key] = value;
}

function clear() {
    ms = {}
}

export {
getPoint,
getItem,
setItem,
clear
}
// 属性表达式
let obj = {
    ['he' + 'llo']() {
        return 'hi'
    }
}
//报错 属性表达式和简洁表达法不能同时使用
// var foo = 'bar';
// var bar = 'abc';
// var baz = { [foo] };

// 函数的name属性返回函数名
clear.name; // 'clear'

(new Function()).name; //'anonymous'
const key1 = Symbol('description');
const key2 = Symbol();
let obj1 = {
    [key1]() { },
    [key2]() { }
}
obj1[key1].name; // 'description'
obj1[key2].name; // ''

// Object.is 比较两个值是否严格相等 和===的行为基本一致
Object.is('foo', 'foo'); // true
Object.is({}, {}); // false

+0 === -0; //true
NaN === NaN; //false

Object.is(+0, -0); //false
Object.is(NaN, NaN); // true

/**
 * Object.assign
 * Object.assign方法用来将源对象（source）的所有可枚举属性，复制到目标对象（target）
 * 如果目标对象与源对象有同名属性，或多个源对象有同名属性，则后面的属性会覆盖前面的属性
 * 只拷贝自身属性，enumerable （不可枚举属性）和继承属性不会被拷贝
 * 对于嵌套的对象，Object.assign的处理方法是替换
 * Symbol值的属性也会被拷贝
 */
var target = { a: 1 };
var source1 = { b: 2 };
var source2 = { c: 3 };
Object.assign(target, source1, source2);
target; // {a:1,b:2,c:3}

source2.d = 4, source2.c = 4;
Object.assign(target, source2);
target;//{a:1,b:2,c:4,d:4}

source2.a = { b: 'hello' };
Object.assign([0, 1, 2], [4, 5]); // [4,5,2] 把数组视为属性名为 0,1,2的对象,目标数组的0号属性4覆盖了0号属性0

// 为对象添加属性
class Point {
    constructor(x = 1, y = 2) {
        Object.assign(this, { x, y });
    }
    out() {
        return this.x, this.y;
    }
}
// 为对象添加方法

Object.assign(Point.prototype, {
    out1() {
        return 'hello'
    }
});
var p = new Point();
console.log(p.out1);
// 克隆对象
function clone(origin) {
    let originProto = Object.getPrototypeOf(origin);
    return Object.assign(Object.create(originProto), origin);
}
// 合并多个对象
const merge = (target, ...sources) => Object.assign({}, ...sources);
// 返回一个新对象
const merge1 = (...sources) => Object.assign({}, ...sources);

// 为属性指定默认值
const DEFAULTS = {
    logLevel: 0,
    outputFormat: 'html'
};
function processContent(options) {
    let _options = Object.assign({}, DEFAULTS, options);
}

/**
 * 属性可枚举性
 * Object.getOwnPropertyDescriptor
 */
let _obj = { foo: 123 };
Object.getOwnPropertyDescriptor(_obj, 'foo');
// {
//     value:'123',
//     writable:true,
//     enumerable:true,
//     configurable:true
// }

/**
 * __proto__属性 本质是一个内部属性，无论从语义还是兼容性 都不要使用这个属性
 * 使用 Object.setPrototypeOf() Object.getPrototypeOf() Object.create()
 */
/**
 * Object.setPrototypeOf 设置原型对象方法
 * 设置proto对象为o对象的原型
   */
let proto = {};
let o = { x: 10 };
Object.setPrototypeOf(o, proto);
proto.y = 20;
proto.z = 2;
o;// {x:10,y:20,z:2}

/**
 * Object.getPrototypeOf 读取一个对象的原型对象
 *  */

function Rectangle() {

};
var rect = new Rectangle();
Object.getPrototypeOf(rect) === Rectangle.prototype // true
Object.setPrototypeOf(rect, Object.prototype);
Object.getPrototypeOf(rect) === Rectangle.prototype; // false

/**
 * Object.observe(),Object.unobserve()
 * 监听对象（以及数组）的变化
 * observe第三个参数指定监听的事件种类
 * Object.observe方法目前共支持监听六种变化：
 *   add：添加属性
 *   update：属性值的变化
 *   delete：删除属性
 *   setPrototype：设置原型
 *   reconfigure：属性的attributes对象发生变化
 *   preventExtensions：对象被禁止扩展（当一个对象变得不可扩展时，也就不必再监听了）
 *  chrome 33以上已支持 babel未支持
 */

var user = {};
Object.observe(user, function (changes) {
    changes.forEach(function (change) {
        console.log('发生变动的属性：' + change.name);
        console.log('变动前的值：' + change.oldValue);
        console.log('变动后的值：' + change.object[change.name]);
        console.log('变动类型：' + change.type);
    });
}, ['add', 'delete']);
user.firstName = 'Jordan';
user.secondName = 'Michael';
var _o = {};
function observe(changes) {
    changes.forEach(function (change) {
        console.log(change.name);
    })
}
Object.observe(_o, observe);
Object.unobserve(_o, observe);

// rest参数拷贝是浅拷贝
let {x, y,...z} = { x: 1, y: 3, a: 4, b: 5, c: 6 };
// x:1 y:2 z:{a:4,b:5,c:6}

let jbo = { a: { b: 1 } };
let {..._x} = jbo;
jbo.a.b = 2;
_x.a.b; // 2
// Rest参数不会拷贝继承自原型对象的属性
let o1 = { a: 1 };
let o2 = { a: 2 };
o2.__proto__ = o1;
let o3 = {...o2 };
o3.a; // 2 

// 扩展运算符
let _z = { a: 3, b: 4 };
let n = {..._z };

let aClone = {..._z };
// 等同于
aClone = Object.assign({}, _z);

let aWithOverrides = {...aClone, x: 1, y: 2 };
// 等同于
aWithOverrides = Object.assign({}, aClone, { x: 1, y: 2 }); // a的x和y属性会被覆盖

// 扩展运算符的参数是null或者undefined 值会被忽略 不会报错
let emptyObject = {...null,...undefined };