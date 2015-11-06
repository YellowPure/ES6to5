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