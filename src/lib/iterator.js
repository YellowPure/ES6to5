/**
 * iterator 遍历器
 * 有三类数据结构原生具备Iterator接口 数组，类似数组的对象、Set、Map结构
 */
var it = makeIterator(['a','b']);

it.next(); //{value:'a',done:false}
it.next(); // {value:'b',done:false}
it.next(); // {value:undefined,done:true}

function makeIterator(array) {
    var nextIndex = 0;
    return {
        next:function() {
            return nextIndex < array.length?
            {value:array[nextIndex++],done:false}:
            {value:undefined,done:true}
        }
    }
}
let arr = ['a','b','c'];
let iter = arr[Symbol.iterator]();
iter.next(); // {value:a,done:false}
iter.next(); // {value:b,done:false}
iter.next(); // {value:c,done:false}
iter.next(); // {value:undefined,done:true}

class RangeIterator {
    constructor(start,stop) {
        this.value = start;
        this.stop = stop;
    }
    
    [Symbol.iterator]() {return this;}
    
    next() {
        let value = this.value;
        if(value < this.stop) {
            this.value++;
            return {done:false,value:value};
        }else {
            return {done:true, value:undefined};
        }
    }
}

function range(start,stop) {
    return new RangeIterator(start,stop);
}
for(let val of range(0,3)) {
    console.log(val);
}

function Obj(value) {
    this.value = value;
    this.next = null;
}

Obj.prototype[Symbol.iterator] = function() {
    var iterator = {
        next: next
    };
    var current = this;
    
    function next() {
        if(current) {
            var value = current.value;
            var done = current == null;
            current = current.next;
            return {
                done:done,
                value:value
            }
        }else {
            return {
                done:true
            }
        }
    }
    return iterator;
}

var one = new Obj(1);
var two = new Obj(2);
var three = new Obj(3);
one.next = two;
two.next = three;
console.log('////');
for (var i of one) {
    console.log('i',i);
}

let obj = {
    data:['hello','world'],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if(index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done:false
                    }
                }else {
                    return {
                        done:true,
                        value:undefined
                    }
                }
            }
        }
    }
}

let iterable = {
    0:'a',
    1:'b',
    2:'c',
    length:3,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
console.log('//////');
for (var i of iterable) {
    console.log(i);
}
// a,b,c

// 普通对象部署数组的symbol.iterator无效
iterable = {
    a:'a',
    b:'b',
    c:'c',
    length:3,
    [Symbol.iterator]:Array.prototype[Symbol.iterator]
}
console.log('//////');
for (var i of iterable) {
    console.log(i);
}
// undefined,undefined,undefined

let set = new Set().add('a').add('b').add('c');

let [x,y] = set;
// x= 'a',y= 'b'
let [first,...rest] = set;
// first = 'a',rest = ['b','c']
/**
 * 调用iterator接口场景
 * 解构赋值 let [x,y] = set;
 * 扩展运算符 [...rest]
 * yield* [2,3,4]
 * 其他场合：
 * for...of
 * Array.from()
 * Map(),Set(),WeakMap(),WeakSet()
 * Promise.all()
 * Promise.race()
 */

/**
 * 字符串的Iterator接口
 */
var someString = 'hi';
typeof someString[Symbol.iterator]; // function
var strIterator = someString[Symbol.iterator]();
strIterator.next(); // {value:'h',done:false}
strIterator.next(); // {value:'i',done:false}
strIterator.next(); // {value:undefined,done:true}

[...someString]; // ["h","i"]
var str = new String("hi");
// 可以修改遍历器行为
str[Symbol.iterator] = function() {
    return {
        next:function() {
            if(this._first) {
                this._first = false;
                return {
                    value:'bye',
                    done:false
                }
            }else {
                return {
                    value:undefined,
                    done:true
                }
            }
        },
        _first:true
    }
};
[...someString]; // ['bye']

function readLinesSync(file) {
    return {
        next() {
            if(file.isAtEndOfFile) {
                file.close();
                return {done:true};
            }
        },
        return() {
            file.close();
            return {done:true};
        }
    }
}

/**
 * for...of循环
 * 部署了Symbol.iterator属性就可以用for...of循环遍历它的成员
 * 数组原生具备iterator接口
 * Set结构返回是值，Map结构返回两个成员为键名和键值的数组
 */

var engines = new Set(['Gecko',"Trident","Webkit","Webkit"]);
console.log('////');
for(var i of engines) {
    console.log(i);
}
// Gecko
// Trident
// Webkit
var es6 = new Map();
es6.set('edition',6);
es6.set('committee',"TC39");
es6.set('standard',"ECMA-262");
for(var [name,value] of es6){
    console.log(name+' : '+value);
}
// edition : 6
// committee : TC39
// standard : ECMA-262

/**
 * 与其他遍历语法的比较
 * for 比较麻烦
 * forEach无法中途跳出，break return不奏效
 * for in 不适用于遍历数组， 以字符串作为键名"0","1","2"
 * 不仅遍历数字键名，还会遍历手动添加的其他键，以及原型链上的键
 * for...of 语法简单，可以和break,return使用，提供遍历所有数据结构的统一操作接口
 */
