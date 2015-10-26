var a = "\u0061";// a = 'a'

var s = '𠮷';

// JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。

s.charCodeAt(0)// 55362
s.charCodeAt(1) // 57271

// 测试一个字符是由两字节还是四个字节组成
function is32Bit(c) {
  return c.charPointAt(0) > 0xffff;
}


String.fromCharCode(0x20BB7);
// "ஷ" 不能识别大于0xFFFF 
 
String.fromCodePoint(0x20BB7);

for (let s of 'foo') {
  // "f"
  // "o"
  // "o"
}
// 不能识别大于0xFFFF 字符
'abc'.charAt(0)// a
'𠮷'.charAt(0) // "\uD842"
// Unicode正规化
'\u01D1'.normalize() === '\u004F\u030C'.normalize()
// includes(),startsWith(),endsWith() 第二个参数表示开始搜索的位置

var s = 'Hello world!';
s.startsWith('Hello') // true
s.endsWith('!') // true
s.includes('w') // true

'x'.repeat(4) // 'xxxx'
'na'.repeat(0) // '' 
'na'.repeat(2.7) // 'nana' 小数会被取整
// 'na'.repeat(-1) //RangeError
// 'na'.repeat(Infinity) //RangeError
// -0.9 先取整 , NaN 等同于 0
// 字符串会先转成数字
'na'.repeat('na');// ''
/**
 * 模板字符串 用反引号（`）标识 可以调用函数 可以进行运算 引用对象属性
 * 如果大括号中的值不是字符串，将按照一般的规则转为字符串。比如，大括号中是一个对象，将默认调用对象的toString方法。
 * 变量未声明，报错
 * 
 *  */

var d = document.createElement('div');

var data = {
  supplies: ['hello', 'new', 'customer']
}

d.innerHTML = `There are \` <b>${s.repeat(3) } </b>`;

var template = `
<ul>
  <% for(var i=0; i < data.supplies.length; i++) {%>
    <li><%= data.supplies[i] %></li>
  <% } %>
</ul>
`;

function compile(template) {
  var evalExpr = /<%=(.+?)%>/g;
  var expr = /<%([\s\S]+?)%>/g;

  template = template
    .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
    .replace(expr, '`); \n $1 \n  echo(`');

  template = 'echo(`' + template + '`);';

  var script =
    `(function parse(data){
    var output = "";

    function echo(html){
      output += html;
    }

    ${ template }

    return output;
  })`;

  return script;
}

var parse = eval(compile(template));
d.innerHTML = parse({ supplies: ["broom", "mop", "ffff"] });

// 标签模板
var total = 30;
var msg = passthru`The total is ${total} (${total * 1.05} with tax)`;

function passthru(literals) {
  var result = "";
  var i = 0;

  while (i < literals.length) {
    result += literals[i++];
    if (i < arguments.length) {
      result += arguments[i];
    }
  }
  return result;
}

// console.log(msg); // "The total is 30 (31.5 with tax)"

// 过滤HTML字符串
function safeHTML(templateData) {
  var s = templateData[0];
  for (var i = 1; i < arguments.length; i++) {
    var arg = String(arguments[i]);

    s += arg.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    s += templateData[i];
  }
  return s;
}

// String.raw

String.raw = function (strings, ...values) {
  var output = '';
  for (var index = 0; index < values.length; index++) {
    output += strings.raw[index] + values[index];
  }
  output += strings.raw[index]
  return output;
}

String.raw`Hi ${2 + 3}`; // 'Hi 5'
String.raw({ raw: 'test' }, 3, 2, 4, 5); // 't3e2s4t5'

document.body.appendChild(d);

export {a};