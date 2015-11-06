/**
 * Set 它类似于数组，但是成员的值都是唯一的，没有重复的值。
 * set内部判断两个值是否相同使用的算法类似精确相等运算（===）
 */

var _s = new Set();

[2, 3, 5, 4, 2, 2, 5].map(x => _s.add(x));

for (let i of _s) {
    // console.log(i);
}

function lis() {
    return [...document.querySelectorAll('li')];
}
console.log(lis());

var lis_set = new Set(lis());
lis_set.size; // 3

_s; // 2,3,5,4
_s.size; // 4
_s.add(2);
_s.size; // 4
_s.has(2); // true
_s.delete(2);
_s.has(2); // false

var arr = Array.from(_s); // [2,3,5,4]

// 提供了一种数组去重的方法
function dedupe(array) {
    return Array.from(new Set(array));
}

dedupe([1, 2, 3, 3]); // [1,2,3]
// 也可以这样:
let unique = [...new Set([1, 1, 2, 3])];

// keys values entries 
// Set没有键名

let _set = new Set(['red', 'yellow', 'green']);

for (let item of _set.keys()) {
    // red 
    // yellow
    // green
}
for (let item of _set.values()) {
    // red 
    // yellow
    // green
}
for (let item of _set.entries()) {
    // ['red','red']
    // ['yellow','yellow']
    // ['green','green']
}
for (let x of _set) {
    // red
    // yellow
    // green
}

let a = new Set([1, 2, 3]);
let b = new Set([4, 3, 2]);
console.log([...a, ...b]);
// 并集
let unicon = new Set([...a, ...b]);
// 1,2,3,4
// 交集
let intersect = new Set([...a].filter(x => b.has(x)));
// 2,3
// 差集
let difference = new Set([...a].filter(x => !b.has(x)));
// 1

// 遍历操作同时改变原先的Set结构 Array.from or 映射
a = new Set([...a].map(val => val * 2)); // 2,4,6
a = new Set(Array.from(a, val => val * 2)); // 4,8,12

/**
 * WeakSet 
 * 成员只能是对象
 */
var ws = new WeakSet();
ws.size; // undefined
ws.forEach; // undefined

var foo = {};
ws.add(foo);
ws.has(foo);// true
ws.delete(foo);
ws.has(foo); // false

// 保证Foos的实例方法只能在Foo的实例上调用
const foos = new WeakSet();
class Foo {
    constructor() {
        foos.add(this);
    }
    method() {
        if(!foos.has(this)) {
            throw new TypeError('Foo.prototype.method 只能在Foo的实例上调用！');
        }
    }
}

/**
 * Map 
 * 键值对的集合(Hash结构)
 */
var data = {};
var element = document.createElement('div');
data[element] = {};
data["[Object HTMLDIVLement]"]; // metadata

// Object结构提供了“字符串-值”的对应，Map结构提供 “值-值”的对应
var m = new Map();
var o = {"p":"hello world"};
m.set(o,"content");
m.get(o); // "content"

for(let key of m.keys()) {
    console.log(key); // Object {p:"hello world"}
}

m.has(o); // true
m.delete(o); // true
m.has(o); // false

var map = new Map([["name","张三"],["title","Author"]]);

map.size; // 2
map.has("name"); // true
map.get("name"); // 张三
map.get('t'); // undefined

// 只有对同一个对象的引用 map才视为是一个值
map.set(["a"] ,555);
map.get(["a"]); // undefined

var k1 = ["a"];
var k2 = ["a"];
map.set(k1,111);
map.set(k2,222);

map.get(k1); // 111
map.get(k2); // 222

// Map的键是简单类型的值（数字，字符串，布尔值） 则只要两个值严格相等 Map就视为一个键

/**
 * Map.set(key,value) 
 * 设置key所对应的键值
 */

/**
 * Map.get(key) 
 * 读取不到返回undefined
 */

/**
 * Map.has(key)
 * 返回一个布尔值，表示某个键是否在Map数据结构中
 */

/**
 * Map.delete(key)
 * 删除某个键 删除失败返回false
 */

/**
 * Map.clear()
 * 清除所有成员，没有返回值
 */

/**
 * 遍历方法
 * keys()
 * values()
 * entries()
 * forEach()
 */

let _m = new Map([
    [1,"one"],
    [2,"two"],
    [3,"three"]
]);

[..._m.keys()];
// [1,2,3]
[..._m.values()];
// ["one","two","three"]
[..._m.entries()];
// [[1,one],[2,two],[3,three]];
[...map];
// [[1,one],[2,two],[3,three]];

// Map对象转为数组
let myMap = new Map().set(true,7).set({foo:3},['abc']);
[...myMap];
// [[true,7],[{foo:3},['abc']]]

// 数组转为Map
myMap = new Map([[true,7],[{foo: 3},['abc']]]);
// Map {true => 7,Object {foo:3} => ['abc']}

// 如果所有Map的键是字符串，可以转为对象
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for( let [k,v] of strMap) {
        obj[k] = v;
    }
    return obj;
}
myMap = new Map().set('yes',true).set('no',false);
strMapToObj(myMap);
// {yes:true,no:false}

// 对象转为Map
function objToStrMap(obj) {
    let strMap = new Map();
    for (let i of Object.keys(obj)) {
        strMap.set(i,obj[i]);
    }
    return strMap;
}
objToStrMap({yes:true,no:false});
// [['yes',true],['no',false]]

function jsonToMap(jsonStr) {
    return new Map(JSON.parse(jsonStr));
}
jsonToMap('[[true,7],[{"foo":3},["abc"]]]');
// Map {true => 7, {"foo":3} => ["abc"]}

/**
 * WeakMap
 * 只接受对象作为键名(null除外)
 */
var wm = new WeakMap();
var ele = document.querySelector('.element');
wm.set(ele,'content');
wm.get(ele); // 'content'

ele.parentNode.removeChild(ele);
ele = null;
wm.get(ele); // undefined

wm.size; // undefined
wm.forEach; // undefined

let _counter = new WeakMap();
let _action = new WeakMap();
class Countdown {
    constructor(counter,action) {
        _counter.set(this,counter);
        _action.set(this,action);
    }
    dec() {
        let counter = _counter.get(this);
        if(counter<1) return ;
        counter --;
        _counter.set(this,counter);
        if(counter == 0) {
            _action.get(this)();
        }
    }
}

let c= new Countdown(2,() => console.log('Done'));

c.dec()
c.dec()
// Done