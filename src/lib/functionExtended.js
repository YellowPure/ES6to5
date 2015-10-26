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