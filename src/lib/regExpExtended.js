
// babel 不支持 正则表达式第二个参数重新指定修饰符
// new RegExp(/abc/ig,'i').flags;
// u修饰符 将字符识别为一个字符
/^\uD83D/u.test('\uD83D\uDC2A'); // false
/^\uD83D/.test('\uD83D\uDC2A'); // true


// 点字符
var s = "𠮷";

/^.$/.test(s); // false
/^.$/u.test(s); // true

// Unicode字符表示法
/\u{61}/.test('a'); // false
/\u{61}/u.test('a'); // true
/\u{20BB7}/u.test('𠮷'); // true

// 量词
/a{2}/.test('aa'); // true
/a{2}/u.test('aa'); // true
/𠮷{2}/.test('𠮷𠮷'); // false
/𠮷{2}/u.test('𠮷𠮷'); // true

// 预定义模式
/^\S$/.test('𠮷'); // false
/^\S$/u.test('𠮷'); // true

function codePointLength(text) {
  var result = text.match(/[\s\S]/gu);
  return result ? result.length : 0;
}

var s = "𠮷𠮷";

// s.length; // 4
codePointLength(s); // 2

// i修饰符
/[a-z]/i.test('\u212A'); // false
/[a-z]/iu.test('\u212A'); // true

// Y修饰符 每次匹配都是从剩余字符串的头部开始 对应sticky属性 babel未实现
var s = "aaa_aa_a";
var r1 = /a+/g;
// var r2 = /a+/y; // 报错 babel未实现
// flags属性，会返回正则表达式的修饰符 babel未实现
console.log(r1.source, r1.flags, r1.sticky);
// r2.sticky // true

r1.exec(s); // ["aaa"]
// r2.exec(s); // ["aaa"]

r1.exec(s); // ["aa"]
// r2.exec(s); // null