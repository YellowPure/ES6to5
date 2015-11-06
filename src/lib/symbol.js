/**
 * 第七种数据类型 Symbol
 */
var s1 = Symbol('foo');
var s2 = Symbol('bar');

s1.toString(); // 'Symbol(foo)'
s2.toString(); // 'Symbol(bar)'

s1 = Symbol();
s2 = Symbol();
s1 === s2; //false

s1 = Symbol('foo');
s2 = Symbol('foo');
s1 === s2; //false
// Symbol类型的值不能和其他类型的值进行运算
// 'your symbol is' + s1; // 报错

String(s1); // Symbol(foo)
s1.toString(); // Symbol(foo)

Boolean(s1); // true
!s1; // false

// 不能转为数值
try {
    Number(s1);
} catch (e) {
    new TypeError('Connot convert a Symbol value to a number ');
};

// Symbol值作为对象属性名时，不能使用点运算符
var mySymbol = Symbol();
var a = {};

a.mySymbol = 'hello';
a[mySymbol]; // undefined
a['mySymbol']; // 'hello'

const COLOR_RED = Symbol();
const COLOR_GREEN = Symbol();
// 常量使用Symbol值，其他任何值都不可能相同的值
function getComplete(color) {
    switch (color) {
        case COLOR_RED:
            return COLOR_RED;
            break;
        case COLOR_GREEN:
            return COLOR_GREEN;
            break;
        default:
            new Error('Undefined Color');
    }
}

var obj = {};
var _a = Symbol('a');
obj[_a] = 'Hello';
var ff = Symbol('ff');

var objectSymbols = Object.getOwnPropertySymbols(obj); //[Symbol(a)]

Object.defineProperty(obj, ff, { value: 'world' });

for (var i in obj) {
    console.log(i);//无输出
}
Object.getOwnPropertyNames(obj); // []
Object.getOwnPropertySymbols(obj); // [Symbol(foo)]

obj.enum = 2;
obj.other = '3';

Reflect.ownKeys(obj); // [Symbol(foo),'enum','other']

// 利用这个特性，为对象定义一些非私有的、但又希望只用于内部的方法
var size = Symbol('size');

class Collection {
    constructor() {
        this[size] = 0;
    }
    add(item) {
        this[this[size]] = item;
        this[size]++;
    }
    static sizeOf(instance) {
        return instance[size];
    }
}

var x = new Collection();
Collection.sizeOf(x); // 0
x.add('foo');
Collection.sizeOf(x); // 1

Object.keys(x); //['0']
Object.getOwnPropertyNames(x); //['0']
Object.getOwnPropertySymbols(x); // [Symbol(size)]

/**
 * Symbol.for()
 * 接受一个字符串作为参数，然后搜索有没有以该参数作为名称的Symbol值。如果有，就返回这个Symbol值，否则就新建并返回一个以该字符串为名称的Symbol值
 * Symbol('cat') 30次，返回30个不同的Symbol值 Symbol('cat') 30此 返回同一个Symbol值
 * 
 */
var n1 = Symbol.for('foo');
var n2 = Symbol.for('foo');
n1 === n2; //true

/**
 * Symbol.keyFor()
 * 返回一个已登记的Symbol类型值的key
 */
Symbol.keyFor(n1); // 'foo' 未登记的Symbol值，返回undefined

// let iframe = document.createElement('iframe');
// iframe.src=String(window.location);
// document.body.appendChild(iframe);

// 在不同的iframe或service worker中取到同一个值
// iframe.contentWindow.Symbol.for('foo') === Symbol.for('foo'); // true

/**
 * Symbol.hasInstance
 * 该对象使用instanceof运算符时，会调用这个方法，判断该对象是否为某个构造函数的实例
 */
class MyClass {
    [Symbol.hasInstance](foo) {
        return foo instanceof Array;
    }
}
var o = new MyClass();
o instanceof Array; // false

/**
 * Symbol.isConcatSpreadable
 * type Boolean
 * 表示该对象使用Array.prototype.concat()时，是否可以展开
 */

let arr1 = ['c', 'd'];
['a', 'b'].concat(arr1); // ['a','b','c','d']

let arr2 = ['c', 'd'];

arr2[Symbol.isConcatSpreadable] = false;
['a', 'b'].concat(arr2, 'e'); //['a','b',['c','d'],'e']
// 类似数组的对象也可以展开，但是Symbol.isConcatSpreadable 默认为false
let o1 = { 0: 'c', 1: 'd', length: 2 };
['a', 'b'].concat(o1, 'e'); // ['a','b',o1,'e']

o1[Symbol.isConcatSpreadable] = true;
['a', 'b'].concat(o1, 'e'); // ['a','b','c','d','e']

/**
 * Symbol.species
 * 对象的Symbol.species属性，指向一个方法。该对象作为构造函数创造实例时，会调用这个方法。即如果this.constructor[Symbol.species]存在，就会使用这个属性作为构造函数，来创造新的实例对象
 */

/**
 * Symbol.match
 * 对象的Symbol.match属性，指向一个函数。当执行str.match(myObject)时，如果该属性存在，会调用它，返回该方法的返回值
 */

/**
 * Symbol.replace
 * 当该对象被String.prototype.replace方法调用时，会返回该方法的返回值
 */
var searchValue = 'a';
var replaceValue = 'b';
String.prototype.replace(searchValue, replaceValue);
// 等同于
try {
    searchValue[Symbol.replace](this, replaceValue);
} catch (e) {
    new Error();
}

/**
 * Symbol.search
 */
var regexp = /a+/g;
String.prototype.search(regexp);
// 等同于
try {
    regexp[Symbol.search](this);
} catch (e) {
    new Error();
}

class MySearch {
    constructor(value) {
        this.value = value;
    }
    [Symbol.search](string) {
        return string.indexOf(this.value);
    }
}
'foobar'.search(new MySearch('foo')); // 0

/**
 * Symbol.split
 * String.prototype.split(s1,s2);
 * s1[Symbol.split](this.s2)
 */

/**
 * Symbol.iterator
 * 指向该对象的默认遍历器方法
 */

/**
 * Symbol.toPrimitive
 * 被调用时，接受一个字符串参数，表示当前运算模式
 * Number 该场合需要转成数值
 * String 转成字符串
 * Default 可以转成字符串，也可以转成数值
 */
let toP = {
    [Symbol.toPrimitive](hint) {
        let result = null;
        switch (hint) {
            case 'number':
                result = 123;
            case 'string':
                result = 'str';
            case 'default':
                result = 'default';
            default:
                new Error();
        }
        return result;
    }
};
2 * toP; // 246
/**
 * Symbol.toStringTag
 * 对象的Symbol.toStringTag属性，指向一个方法。在该对象上面调用Object.prototype.toString方法时，如果这个属性存在，它的返回值会出现在toString方法返回的字符串之中，表示对象的类型
 * 这个属性可以用来定制[object Object]或[object Array]中object后面的那个字符串
 */
/**
 * Symbol.unscopables
 * 对象的Symbol.unscopables属性，指向一个对象。该对象指定了使用with关键字时，哪些属性会被with环境排除
 */
// 对Symbol 后面的几个属性的使用和理解很困惑