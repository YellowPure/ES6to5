function logs(x, y = "wolrd") {
    console.log(x, y);
}
logs('hello');

function fetch(url, { headers = {}, body = '', method = 'get'} = {}) {
    console.log(method);
}
fetch('https://baidu.com', {});
fetch('https://baidu.com');

// 指定默认值后 length属性 失真
function foo(x = 5, y = 7) {
    console.log([x, y]);
}
foo();

(function (a = 5) { }).length; //0

// 报错
// function foo1(x = 5){
//     let x = 1;
//     const x = 0;
// }

// rest 参数 
// rest参数之后不能再有其他参数（即只能是最后一个参数），否则会报错
function add(...values) {
    let sum = 0
    for (var val of values) {
        sum += val;
    }
}
add(2, 3, 5); // 10

function push(array, ...items) {
    items.forEach(function (item) {
        array.push(item);
    });
}
push([0], 1, 2, 3); // [0,1,2,3]

(function (a) { }).length; // 1
(function (...a) { }).length; //0

// 扩展运算符（spread）是三个点（...）。它好比rest参数的逆运算，将一个数组转为用逗号分隔的参数序列

console.log(1, ...[2, 3, 4], 5);

// 简化求出一个数组最大元素
Math.max(...[14, 3, 77]);

var _arr1 = [0, 1, 2];
var _arr2 = [3, 4, 5];
_arr1.push(..._arr2); // [0,1,2,3,4,5]
var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3];
// [ 'a', 'b', 'c', 'd', 'e' ]

// const [...butLast,lst] = [1,2,3,4] // 报错
// 扩展运算符必须放在末尾

let map = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
]);

let arr = [...map.keys()];

// var go = function*() {
//     yield 1;
//     yield 2;
//     yield 3;
// };
// [...go()];

// name属性
console.log(foo.name); // 'foo'

var func1 = function () {};

// ES5
func1.name // ""

// ES6
func1.name // "func1"

/**
 * 箭头函数
 * （1）函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象
 * （2）不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误
 * （3）不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替
 * （4）不可以使用yield命令，因此箭头函数不能用作Generator函数
 * */ 

var f = v => v;
// 等同于
var f = function(v){
    return v;
}

var f = () =>5;
// 等同于
var f = function() {return 5;}

var sum = (num1,num2) =>  ({num1,num2});
console.log(sum(3,4));

const isEven = n => n%2 === 0;
const square = n => n*n;

// 正常函数写法
[1,2,3].map(function (x) {
  return x * x;
});

// 箭头函数写法
[1,2,3].map(x => x * x);

// 箭头函数没有内部this、arguments、super、new.target
function foo1() {
   setTimeout( () => {
      console.log("id:", this.id);
   },100);
};

foo1.call( { id: 42 } );
// id: 42

let insert = (value) => ({into:(array) => ({after:(afterValue) => {
    array.splice(array.indexOf(afterValue)+1,0,value);
}})});

insert(2).into([1,3]).after(1);//[1,2,3]

const plus1 = a=> a+1;
const mult2 = a => a*2;
mult2(plus1(5));

// 函数绑定 ES7 babel已实现 需打开实验性开关

var part = '123';

var _fo = {
    part:'456'
}

function bar() {
    console.log(this.part);
    return this.part;
}
// _fo::bar;
// 等同于
// bar.call(foo);

// 尾调用优化
// 指某个函数的最后一步是调用另一个函数
function ff(x) {
    return g(x);
};
// 不属于的情况
/*
function ff(x) {
    return g(x)+1;
}
function ff(x) {
    let r = g(x);
    return r; 
}
function ff(x) {
    g(x);
}
*/
var g = function(x) {
    return x;
}

function _f() {
    let m = 1;
    let n = 2;
    return g(m+n);
}
_f();
// 等同于
function _f() {
    return g(3);
}
_f();
// 等同于
g(3);
// 这就叫做“尾调用优化”（Tail call optimization），即只保留内层函数的调用帧。如果所有函数都是尾调用，那么完全可以做到每次执行时，调用帧只有一项，这将大大节省内存。这就是“尾调用优化”的意义。

/**
 * 尾递归
 *  
 * */ 
 function factorial(n) {
     if(n===1)return 1;
     return n*factorial(n-1);
 }
 factorial(5);
//  递归优化后只保留了一个调用记录
 function factorial1(n,total) {
     if(n === 1) return total;
     return factorial(n-1, n*total);
 }
factorial1(5,1);
// 额外的函数来转化成单函数
function tailFactorial(n,total) {
    if (n===1) return total;
    return tailFactorial(n-1,n*total);
}
function factorial2(n){
    return tailFactorial(n,1);
}
factorial2(5);
// 柯里化 currying 将多参数的函数转换成单参数的形式
function currying(fn,n) {
    return function(m){
        return fn.call(this,m,n);
    }
}

function tailFactorial2(n,total) {
    if (n ===1) return total;
    return tailFactorial2(n-1,n*total);
}
const factorial3 = currying(tailFactorial2,1);

factorial3(5);
// ES6 方法
function factorial4(n,total = 1){
    if (n===1) return total;
    return factorial4(n-1,n*total);
}
factorial4(5);