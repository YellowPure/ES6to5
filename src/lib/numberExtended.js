0b111110111 === 503 //true 二进制
0o767 === 503 // true 八进制

// Number.isFinite, Number.isNaN()

// Number.isFinite()用来检查一个数值是否非无穷（infinity）
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite('15'); // false
Number.isFinite(Infinity); //false
Number.isFinite(NaN); // false
Number.isFinite(true); //false

// Number.isNan 用来检查一个值是否为NaN

/**
 * 与传统的全局方法isFinite()和isNaN()的区别在于，
 * 传统方法先调用Number()将非数值的值转为数值，
 * 再进行判断，而这两个新方法只对数值有效，非数值一律返回false
 */
Number.isNaN(NaN) //true
Number.isNaN(15) //false
Number.isNaN('15') //false
Number.isNaN(true) // false
Number.isNaN(9 / NaN) // true
Number.isNaN('true' / 0) //true
Number.isNaN('true' / 'true') //true

Number.parseFloat('13.4@') // 13.4
Number.parseInt('13.6') // 13 

Number.isInteger(3.0); //true
Number.isInteger(false); // false
Number.isInteger('3'); // false

// Number.EPSILON的实质是一个可以接受的误差范围
// 引入一个这么小的量的目的，在于为浮点数计算，设置一个误差范围。我们知道浮点数计算是不精确的
Number.EPSILON
// 2.220446049250313e-16

function withinErrorMargin(left, right) {
    return Math.abs(left - right) < Number.EPSILON;
}
withinErrorMargin(0.1 + 0.2, 0.3) // true
withinErrorMargin(0.2 + 0.2, 0.4) // false

Math.pow(2, 53) === Math.pow(2, 53) + 1 // true

Number.MIN_SAFE_INTEGER === -9007199254740991
Number.MAX_SAFE_INTEGER === 9007199254740991
//判断一个整数是否落在安全范围
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false

// 验证参与计算的每个值
Number.isSafeInteger(9007199254740993)
// false
Number.isSafeInteger(990)
// true
Number.isSafeInteger(9007199254740993 - 990)
// true
9007199254740993 - 990
// 返回结果 9007199254740002
// 正确答案应该是 9007199254740003

function trusty(left, right, result) {
    if (Number.isSafeInteger(left) && Number.isSafeInteger(right) && Number.isSafeInteger(result)) {
        return result;
    }
    new RangeError('Operation connot be trusted!');
}
trusty(9007199254740993, 990, 9007199254740993 - 990)
// RangeError: Operation cannot be trusted!

trusty(1, 2, 3);
// 3

/**
 * Math对象扩展
 */

// Math.trunc方法用于去除一个数的小数部分，返回整数部分
Math.trunc(4.9) // 4
Math.trunc(-4.3) // 4
Math.trunc(-0.4432) // -0
Math.trunc('123.456') // 123
Math.trunc(NaN) // NaN
Math.trunc('asd') // NaN
Math.trunc() // NaN

// Math.sign方法用来判断一个数到底是正数、负数、还是零
Math.sign(15.3) //+1
Math.sign(-11.4) //-1
Math.sign(+0) //+0
Math.sign(-0) // -0
Math.sign('foo') // NaN
Math.sign(); //NaN

// Math.cbrt方法用于计算一个数的立方根
Math.cbrt(-1) // -1
Math.cbrt(0) // 0
Math.cbrt(2) //1.2599210498948734
Math.cbrt('8') // 2
Math.cbrt('hello')//NaN

// JavaScript的整数使用32位二进制形式表示，Math.clz32方法返回一个数的32位无符号整数形式有多少个前导0。
Math.clz32(0) //32
Math.clz32(1) //31
Math.clz32(0b01000000000000000000000000000000) //1

Math.clz32(1 << 1) //30

Math.clz32() // 32
Math.clz32(NaN) // 32
Math.clz32(Infinity) // 32
Math.clz32(null) // 32
Math.clz32('foo') // 32
Math.clz32([]) // 32
Math.clz32({}) // 32
Math.clz32(true) // 31

// Math.imul方法返回两个数以32位带符号整数形式相乘的结果，返回的也是一个32位的带符号整数
Math.imul(2, 4)//8

// Math.fround() 返回一个数的单精度浮点数形式

Math.fround(1.337); // 1.3370000123977661
Math.fround(1.5);   // 1.5

// Math.hypot方法返回所有参数的平方和的平方根。

Math.hypot(3, 4) // 5

Math.hypot() // 0
Math.hypot(-3) //3

// Math.expm1(x)返回ex - 1，即Math.exp(x) - 1。

Math.expm1(-1); // -0.6321205588285577
Math.expm1(0);  // 0
Math.expm1(1);  // 1.718281828459045

// Math.log1p(x)方法返回1 + x的自然对数，即Math.log(1 + x)。如果x小于-1，返回NaN
Math.log1p(10)
// Math.log10(x)返回以10为底的x的对数。如果x小于0，则返回NaN。
Math.log10()
// Math.log2(x)返回以2为底的x的对数。如果x小于0，则返回NaN。
Math.log2()

console.log(2 ** 2, '2**2'); 
// 双xxx
// Math.sinh,Math.cosh,Math.asinh,Math.acosh,Math.tanh,Math.atanh

