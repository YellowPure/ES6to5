"use strict";
// Array.from方法用于将两类对象转为真正的数组：类似数组的对象（array-like object）和可遍历（iterable）的对象（包括ES6新增的数据结构Set和Map）
console.log(Array.from('hello'));

let ps = document.querySelectorAll('p');
Array.from(ps).forEach(function (p) {
    console.log(p);
});

function foo() {
    let args = Array.from(arguments); // [0,1,2,3]
    // var args = [...arguments]; //[0,1,2,3]
    console.log(args);
}

foo(0, 1, 2, 3);

Array.from({ 0: "a", 1: "b", 2: "c", length: 3 });

Array.from([1, 2, 3], (x) => x * x); // [1,4,9]

Array.from([1, , 2, , 3], (n) => n || 0); //[1,0,2,0,3]

function typesof() {
    return Array.from(arguments, value => typeof value);
}
typesof(NaN, null, []);//['number','object','object']

Array.from({ length: 2 }, () => 'jack') // ['jack','jack']

// 正确处理Unicode字符
function countSymbols(string) {
    return Array.from(string).length;
}

// Array.of方法用于将一组值，转换为数组
Array.of(3, 23, 5) //[3,23,5]

/**
 * Array.copyWithin
 * 数组实例的copyWithin方法，在当前数组内部，将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组。也就是说，使用这个方法，会修改当前数组
 *  */
var ar = [1, 2, 3, 4, 5];
ar.copyWithin(4, 0);//[1,2,3,4,1,2]

// find() findIndex()
var findarr = [1, 4, -5, 10];
findarr.find((n) => n < 0) // -5
findarr = [1, 5, 10, 15];
findarr.find(function (value, index, arr) {
    return value > 4;
});//5
// findIndex 都不符合返回-1
[1, 5, 10, 15].findIndex(function (value, index, arr) {
    return value > 9;
});// 2

/**
 * Array.fill()
 * fill方法使用给定值，填充一个数组
 *  */

['a', 'b', 'c'].fill(7);
// [7,7,7]
new Array(3).fill(7); // [7,7,7]
['a', 'b', 'c'].fill(9, 0, 1); // [7,'b','c']

/**
 * entries(),keys(),values() 遍历数组
 *  */

for (let index of ['a', 'b'].keys()) {
    console.log(index); // 0, 1
};
var entriesArr = ['a', 'b'];

// 
if (['a', 'b'].values) {
    for (let elem of entriesArr.values()) {
        console.log(elem); // a, b
    }
} else {
    new RangeError('not support values');
}


for (let [index, value] of ['a', 'b'].entries()) {
    console.log(index, value); // 0 'a', 1 'b'
};

// includes方法返回一个布尔值，表示某个数组是否包含给定的值

[1, 2, 3].includes(2); // true
[1, 2, NaN].includes(NaN); // true
[1, 2, 3].includes(3, 3); // false
[1, 2, 3].includes(3, -4); // true

const contains = (() => Array.prototype.includes ? (arr, value) => arr.includes(value) : (arr, value) => arr.some(el=> el === value)
    )();
contains(["foo", "bar"], "baz"); // => false

// ES6 将空位转为undefined
new Array(3)//[,,]

// 数组推导 ES7 
// var a1 = [1, 2, 3, 4];
// var a2 = [for (i of a1) i * 2]; // babel未实现

// console.log(a2);
