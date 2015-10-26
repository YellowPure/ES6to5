/**
 * Deconstruction 解构
 */

function multiply(x, y) {
    return x * y;
}

function area(radius) {
    const PI = 3.1415926;
    return PI * radius * radius;
}
// 报错
// let [foo] = 1
// let [foo] = undefined


let [x, y, z] = new Set(["a", "b", "c"]); // x = 'a', y='b',z='c'

//交换值
[x, y, z] = [z, x, y];//x='c',y='a',z='b'

// 返回数组 返回对象

function example() {
    return [1, 2];
}

var [f1, f2] = example();//f1 = 1,f2 = 2

function add([x, y]) {
    return x + y;
}

add([2, 3]) // 5

function move({ x = 0, y = 0} = {}) {
    return [x, y];
}

move({ x: 3 }) //[3,0]

function example2() {
    return {
        foo: 1,
        bar: 2
    }
}

// 提取JSON数据
var jsonData = {
    id: 42,
    status: "ok",
    data: [334, 76]
}

let {id, status, data} = jsonData; // id = 42,status= "ok",data=[334,76]

// 遍历Map结构
var map = new Map();
map.set('first', 'hello');
map.set('second', 'world');

for (let [key, value] of map) {
    // console.log(key+' is '+value);
    // first is hello
    // second is world
}

var obj = {
    p: [
        "hello",
        { y: "world" }
    ]
}

var {p: [x1, {y1}]} = obj;

var {foo, bar} = example2();

var { msg = 'xxx'} = {};

// 字符串解构
const [a, b, c, d] = 'worth'; // a = 'w',b = 'o',c = 'r',d = 't'


export {
multiply,
area
};