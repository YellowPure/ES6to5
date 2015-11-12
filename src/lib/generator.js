/**
 * ES6提供的异步编程解决方案
 */
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
var hw = helloWorldGenerator();
hw.next();
// {value:'hello',done:false}
hw.next();
// {value:'world',done:false}
hw.next();
// {value:'ending',done:true0}
hw.next();
// {value:undefined,done:true}

// yield语句不能用在普通函数中使用
// (function() {
//     yield 1;
// })();  报错 Unexpected number


/**
 * 报错，因为forEach中方法的参数是一个普通函数 在里面使用了yield语句
 */
// var arr = [1,[[2,3],4],[5,6]];

// var flat = function* (a) {
//     var length = a.length;
//     a.forEach(function(item) {
//         if(typeof item !== 'number') {
//             yield* flat(item);
//         }else {
//             yield item;
//         }
//     })
// };
// for (var f of flat(arr)) {
//     console.log(f);
// }

// console.log('hello'+ yield 123);//SyntaxError

function* foo(x) {
    let y = 2 * (yield (x+1));
    let z = yield(y/3);
    return (x+y+z);
}
var a = foo(5);
a.next(); // {value:6,done:false}
a.next(); // {value:NaN,done:false}
a.next(); // {value:NaN,done:false}

var b = foo(5);
b.next(); // {value:6,done:false}
b.next(12); // {value:24,done:false}
b.next(13); // {value:42,done:true}

function wrapper(generatorFunction) {
    return function(...args) {
        let generatorObject = generatorFunction(...args);
        generatorObject.next();
        return generatorObject;
    }
}
const wrapped = wrapper(function* () {
    console.log(`first input: ${yield}`);
    return "DONE";
});
wrapped().next('hello');

function* dataConsumer() {
    console.log('started');
    console.log(`1.${yield}`);
    console.log(`2.${yield}`);
}
let genObj = dataConsumer();
genObj.next();
// started
genObj.next('111');
// 1.111
genObj.next('2');
// 2.2

// for...of循环可遍历generator函数
function* foo1() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    return 5;
}
for(var i of foo1()) {
    console.log(i);
}
// 1
// 2
// 3
// 4
// 返回对象的done为true的时候，循环中止 故return语句返回值不在循环中


// 利用Generator函数和for...of循环，实现斐波那契数列
function* fibonacci() {
    let [prev,cur] = [0,1];
    for(;;) {
        [prev,cur] = [cur,cur+prev];
        yield cur;
    }
}
for(let n of fibonacci()) {
    if(n>1000) break;
    console.log(n);
}

function* numbers() {
    yield 1;
    yield 2;
    return 3;
    yield 4;
}
[...numbers()]; // [1,2]

Array.from(numbers()); // [1,2]

let [x,y] = numbers(); // [1,2]

function* objectEntries(obj) {
    let propKeys = Reflect.ownKeys(obj);
    
    for(let propKey of propKeys) {
        yield [propKey,obj[propKey]];
    }
}


let jane = { first: 'Jane', last: 'Doe' };

for (let [key, value] of objectEntries(jane)) {
    console.log(key,value);
}
// first Jane
// last Doe

/**
 * Generator.prototype.throw()
 * 可以在函数体外抛出错误，然后在Generator函数体内捕获
 */
var g = function* () {
    while(true) {
        try {
            yield;
        } catch(e) {
          if(e !='a') throw e;
          console.log('内部捕获',e);  
        }
    }
}
var i = g();
i.next();

try{
    i.throw('a');
    i.throw('b');
} catch(e) {
    console.log('外部捕获',e);
}
var g1 = function* () {
    while(true){
        yield;
        console.log('内部捕获',e);
    }
}
var i1 = g1();
i1.next();
try{
    i1.throw('a');
    i1.throw('b');
} catch(e) {
    console.log('外部捕获',e);
}
// 使用Generator函数可简化回调函数中捕获错误的写法
function* g2() {
    try{
        var a = yield foo('a');
        var b = yield foo('b');
        var c = yield foo('c');
    } catch(e) {
        console.log(e);
    }
    
    console.log(a,b,c);
}
var i2 = g2();
i2.next();
try{
    i2.next(42);
} catch(e) {
    console.log(e);
}
// 一旦Generator执行过程中抛出错误，就不会再执行下去
function* g3() {
    yield 1;
    console.log('throwing an exception');
    throw new Error('generator break');
    yield 2;
    yield 3;
}
function log(generator) {
    var v;
    try{
        v = generator.next();
        console.log('第一次运行next方法',v);
    } catch(e) {
        console.log('捕捉错误',v);
    }
    try{
        v = generator.next();
        console.log('第二次运行next方法',v);
    } catch(e) {
        console.log('捕捉错误',v);
    }
    try{
        v = generator.next();
        console.log('第三次运行next方法',v);
    } catch(e) {
        console.log('捕捉错误',v);
    }
    console.log('caller done');
}
log(g3());

/**
 * Generator.prototype.return()
 * 返回给定值，终结遍历
 */
function* gen() {
    yield 1;
    yield 2;
    yield 3;
}
var _gen = gen();
_gen.next(); //{value:1,done:false}
_gen.return('foo'); // {value:"foo",done:true}  不提供参数 value = undefined
_gen.next(); // {value:undefined, done:true}

// 如果Generator函数内部有try...finally代码块，那么return方法会推迟到finally代码块执行完再执行。

/**
 * yield* 语句
 * Generator函数内部调用另一个Generator函数默认情况下无效
 * 该语句用于在一个Generator函数中执行另一个Generator函数
 */
function* bar() {
    yield 'x';
    yield* gen();
    yield 'y';
}
// 等同于
function* barAndGen() {
    yield 'x';
    yield 1;
    yield 2;
    yield 3;
    yield 'y';
}
// 等同于
function* barAndGen1() {
    yield 'x';
    for(let i of gen()){
        console.log(v);
    }
    yield 'y';
}

function* gen1() {
    yield* ['a','b','c'];
}
gen1().next(); // {value:'a',done:false}

// 凡是具有iterator接口的都可以被yield* 遍历
let read = (function* () {
   yield 'hello';
   yield* 'hello'; 
}());
read.next().value; // hello
read.next().value; // h

function* foo1() {
    yield 2;
    yield 3;
    return 'foo1';
}
function* bar1() {
    yield 1;
    var v = yield* foo1();
    console.log('v:'+v);
    yield 4;
}
var b = bar1();
b.next();
// {value:1,done:false}
b.next();
// {value:2,done:false}
b.next();
// {value:3,done:false}
b.next();
// 'v:foo1'
// {value:4,done:true}
b.next();
// {value:undefined,done:true}

function* genFuncWithReturn() {
    yield 'a';
    yield 'b';
    return 'The Result';
}
function* logReturned(genObj) {
    let result = yield* genObj;
    console.log(result);
}
[...logReturned(genFuncWithReturn())];
// The Result
//  ['a','b']

// 去处嵌套数组的所有成员
function* iterTree(tree) {
    if(Array.isArray(tree)) {
        for (var i =0;i< tree.length; i++) {
            yield* iterTree(tree[i]);
        }
    } else {
        yield tree;
    }
}

const tree = ['a',[['b','c'],['d','e']]];
for(let x of iterTree(tree)) {
    console.log(x);
}
// a,b,c,d,e
/**
 * 使用yield* 遍历完全二叉树
 */

// 二叉树构造函数
// 左树，当前结点，右树
function Tree(left,label,right) {
    this.left = left;
    this.label = label;
    this.right = right;
}

// 中序遍历函数
// 返回一个遍历器，所以使用generator函数
// 采用递归算法，左树和右树用yield*遍历
function* inorder(t) {
    if(t) {
        yield* inorder(t.left);
        yield t.label;
        yield* inorder(t.right);
    }
}

// 生成二叉树
function make(array) {
    if(array.length == 1) return new Tree(null,array[0],null);
    return new Tree(make(array[0]),array[1],make(array[2]));
}
let _tree = make([[['a'],'b',['c']],'d',[['e'],'f',['g']]]);

var result = [];
for(let node of inorder(_tree)) {
    result.push(node);
}
console.log('////');
console.log(_tree);
// ['a','b','c','d','e','f','g']

/**
 * 作为对象属性的Generator函数
 */
let obj = {
    * myGeneratorFunc() {
        
    }
};

/**
 * Generator函数的this
 */
function* gThis() {
    this.name = 11;
}
gThis.prototype.hello = function() {
    return 'hi~';
}
obj = gThis();
obj instanceof gThis; // true
obj.hello(); // hi~
obj.name; // undefined Generator函数返回的总是遍历器对象 因此this对象赋值不生效

function* F() {
    yield this.x = 2;
    yield this.y = 3;
}
var _obj = {};
var f = F.bind(_obj)();
f.next();
f.next();
f.next();
console.log(_obj);

/**
 * Generator 函数推导
 * ES7提出Generator函数推导
 */
// let generator = function* () {
//     for (let i=0;i<6;i++) {
//         yield i;
//     }
// }
// let squared = (for (n of generator()) n*n );

/**
 * 应用
 * 异步操作的同步化表达
 */
function showLoadingScreen() {};
function loadUIDataAsynchronously() {};
function hideLoadingScreen() {};
function* loadUI() {
    showLoadingScreen();
    yield loadUIDataAsynchronously();
    hideLoadingScreen();
}
var loader = loadUI();
// 加载UI
loader.next();

// 卸载UI
loader.next();

// function* main() {
//     var result = yield request('./src/data.json');
//     var resp = JSON.parse(result);
//     console.log(resp.value);
// }

// function request(url) {
//     makeAjaxCall(url,function(response) {
//        it.next(response); 
//     });
// }

// function makeAjaxCall(url,callback) {
//     var http = new XMLHttpRequest();
//     http.open('GET',url,true);
//     http.send(null);
//     http.onreadystatechange = state_Change;
//     function state_Change(state) {
//         if(http.readyState == 4) {
//             if(http.status == 200) {
//                 callback();
//             }
//         }
//     }
// }
// var it = main();
// it.next();

