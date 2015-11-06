/**
 * 代理器
 * Proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，所以属于一种“元编程”（meta programming），即对编程语言进行编程。
 * babel未实现  
 */

var obj = new Proxy({}, {
    get: function (target, key, receiver) {
        console.log(`getting ${key}!`);
        return Reflect.get(target, key, receiver);;
    },
    set: function (target, key, value, receiver) {
        console.log(`setting ${key}!`);
        return Reflect.set(target, key, value, receiver);
    }
});

obj.count = 1;
//setting count!
++obj.count;
// getting count!
// setting count!
// 2
var target = {};
var handler = {};
var object = {proxy:new Proxy(target,handler)};

let _o = Object.create(obj);
_o.time; //35

var _handler = {
    get: function(target,name) {
        if(name === 'prototype') return Object.prototype;
        return 'hello, '+name;
    },
    apply:function(target,thisBinding,args) {return args[0];},
    construct:function(target,args){return args[1];}
}

var fproxy = new Proxy(function(x,y){
    return x+y;
},_handler);

fproxy(1,2);// 1 调用该函数时 触发_handler.apply

new fproxy(1,2); // 2 触发_handler.construct

fproxy.prototype; // Object.prototype
fproxy.foo; // 'hello, foo'

var person = {
    name:'张三'
};

var proxy = new Proxy(person,{
    get:function(target,prototype) {
        if(prototype in target) {
            return target[prototype];
        } else {
            new Error('Property \"' + prototype + '\" dose not exist;' );
        }     
    }
});

person.name; // 张三
person.age; // throe error

var pipe = (function(){
    let pipe;
    return function(value) {
        pipe = [];
        return new Proxy({},{
           get:function(pipeObject,fnName) {
               if(fnName == "get") {
                   return pipe.reduce(function(val,fn) {
                      return fn(val); 
                   },value);
               }
               pipe.push(window[fnName]);
               return pipeObject;
           } 
        });
    }
}());

var double = function(n){return n*2};
var pow = function(n) {return n*n};
var reverseInt = function(n){return n.toString().split('').reverse().join('')|0};
pipe(3).double.pow.reverseInt.get; //'63'

let validator = {
    set: function(obj,prop,value) {
        if(prop === 'age') {
            if(!Number.isInteger(value)) {
                new TypeError('The age is not an integer');
            }
            if(value > 200) {
                new RangeError('The age seems invalid');
            }
        }
        
        // 对于age以外的属性，直接保存
        obj[prop] = value;
    }
}

let p2 = new Proxy({},validator);
p2.age = 100;
p2.age; // 100
p2.age = 'young'; //报错
p2.age = 300; // 报错

let handler1 = {
    get(target,key) {
        invariant(key,'get');
        return target[key];
    },
    set(target,key,value) {
        invariant(key,'set');
        return true;
    }
}

function invariant(key,action) {
    if(key[0] == '_') {
        new Error(`Invalid attempt to ${action} private "${key}" property` );
    }
}

let target1 = {};
var proxy1 = new Proxy(target1,handler1);
proxy1._prop; // Error: Invalid attempt to get private "_prop" property
proxy1._prop = 'c'; // Error: Invalid attempt to set private "_prop" property

/**
 * apply()函数
 */
var t = function() {return "I'm the target"};

var handler2 = {
    apply() {
        return "I'm the proxy";      
    }
};
var p = new Proxy(t,handler2);
p() === "I'm the proxy";


/**
 * has() 函数  
 * 拦截in操作符
 * 如果原对象不可配置或者禁止扩展 使用has将报错
 * Object.preventExtensions(obj) configurable = false
 */
var handler3 = {
    has(target,key) {
        if(key[0] === '_') {
            return false;
        }
        return target[key];
    }
}
var t1 = {_prop:'_prop',prop:'prop'};
var p1 = new Proxy(t1,handler3);
'_prop' in p1;// false

/**
 * construct() 函数
 * 拦截new 命令
 * 如果返回的不是对象 会抛出错误
 */
var handler4 = {
    construct(target,args) {
        console.log('called:'+args.join(','));
        return {value:args[0]};
    }
};
new handler4(1).value; 
// "called:1"
// 1

/**
 * deleteProperty() 函数
 * 拦截delete操作，如果抛出错误 or return false ，当前属性不能被delete命令删除
 */
var handler5 = {
    deleteProperty(target,key) {
        invariant(key,'delete');
        return true;
    },
    defineProperty(target,key,descriptor) {
        return false;
    }
}
var t2 = {_prop:'foo'};
var p3 = new Proxy(t2,handler5); 
//Error: Invalid attempt to delete private "_prop" property

/**
 * defineProperty()
 * 拦截Object.defineProperty操作
 */
var t3 = {}
var p4 = new Proxy(t3, handler5)
p4.foo = 'bar'
// TypeError: proxy defineProperty handler returned false for property '"foo"'

/**
 * enumerate() 函数
 * 拦截 for...in循环
 */

/**
 * getOwnPropertyDescriptor()
 * 拦截Object.getOwnPropertyDescriptor
 */

/**
 * getPrototypeOf()函数
 * 拦截：
 * Object.getPrototypeOf()
 * Reflect.getPrototypeOf()
 * Object.prototype.__proto__
 * Object.prototype.isPrototypeOf()
 * instanceOf运算符
 */

/**
 * isExtensible()函数
 * 拦截Object.isExtensible()
 */

/**
 * ownKeys()函数
 * 拦截Object.keys()
 */

/**
 * preventExtensions()函数
 * 拦截Object.preventExtensions() 必须返回boolean值
 * 一个限制，当Object.isExtensions(proxy) 为false时，preventExtensions才能返回true，否则报错
 */

/**
 * setPrototypeOf()
 * 拦截Object.setPrototypeOf()
 */

/**
 * Proxy.revocable()
 * 返回一个可取消的Proxy实例
 */

/**
 * Reflect对象
 * 1.将Object上的一些语言层面的函数放到Reflect上
 * 2.修改某些Object方法的返回结果，如：Object.definePrototype(obj,name,desc) 无法定义属性时抛出错误,Reflect.definePrototye(obj,name,desc)返回false
 * 3.Object操作变成函数行为，如：name in obj,delete obj[name]———— Reflect.has(obj,name),Reflect.deletePrototype(obj,name)
 * 4.Reflect对象的方法和Proxy的方法一一对应
 */

var obj1 = {
    get foo() {return this.bar();},
    bar() {}
}

/**
 * Reflect.get()函数
 * 找并返回target对象的name属性，如果没有该属性，则返回undefined。
 * 如果name属性部署了读取函数，则读取函数的this绑定receiver
 */

// wrapper.bar();
Reflect.get(obj1,"foo",wrapper);