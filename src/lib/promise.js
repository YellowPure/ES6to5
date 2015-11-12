/**
 * Promise对象
 * 一个对象，用来传递异步操作的消息
 */
var promise = new Promise(function (resolve, reject) {

});
promise.then(function (value) {
    // success
}, function (value) {
    // failure
});

// example
function timeout(ms) {
    return new Promise((resolve, reject) => {
        setTimeout(resolve, ms, 'done');
    });
}

timeout(2000).then((value) => {
    console.log(value);
});

function loadImageAsync(url) {
    return new Promise(function (resolve, reject) {
        var image = new Image();
        image.src = url;
        image.onload = function () {
            resolve(image);
        }
        image.onerror = function () {
            reject(new Error('Cound not load image at' + url));
        }
    })
}
// loadImageAsync('favi.ico');

function getJSON(url) {
    var promise = new Promise(function (resolve, reject) {
        var client = new XMLHttpRequest();
        client.open("GET", url);
        client.responseType = "json";
        client.setRequestHeader('Accept', "application/json");
        client.onreadystatechange = handler;
        client.send();

        function handler() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status == 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        }
    });
    return promise;
}
getJSON('/src/data.json').then(function (data) {
    console.log('Contents:' + data.name);
}, function (error) {
    console.log('error:' + error);
});

var p1 = new Promise(function (resolve, reject) {
    setTimeout(() => reject(new Error('fail')), 3000);
});
var p2 = new Promise(function (resolve, reject) {
    setTimeout(() => resolve(p1), 1000);
});
p2.then(result => console.log(result));
p2.catch(error => console.log(error));

/**
 * Promise.prototype.then()
 * 为Promise实例添加状态改变时的回调函数
 * 可采用链式写法
 * 
 */

getJSON('/src/data.json').then(function (data) {
    console.log('peole name:' + data.name);
    return getJSON(data.url);
}).then(function (data) {
    console.log('woman name:' + data.name);

}, function (err) {
    console.log('Rejected' + err);
})
// 采用箭头函数
getJSON('src/data.json').then(
    (data) => getJSON(data.url)
    ).then(
        (data) => console.log('Resolved:' + data),
        (err) => console.log('Rejected:' + err)
        );

/**
 * Promise.prototype.catch()函数
 * 指定发生错误时的回调函数
 */

/**
 * Promise.all()
 * 用于将多个promise实例包装成一个新的promise实例
 * 只要有一个promise状态是rejected，包装后的promise状态也是rejected
 * 只有所有的promise状态都变成fulfilled ，all()的状态才是fulfilled
 */
var _promise = [2, 3, 4].map(function (id) {
    return getJSON('src/data' + id + '.json');
});

Promise.all(_promise).then(function (posts) {

}).catch(function (err) {

});

/**
 * Promise.race()
 * 用于将多个promise实例包装成一个新的promise实例
 * 其中实例改变状态，race()的状态就跟着改变
 */
var p3 = Promise.race([
    fetch('/xxx'),
    new Promise(function (resolve, reject) {
        setTimeout(() => reject(new Error('request timeout')), 5000)
    })
]);

p3.then(response => console.log(response));
p3.catch(error => console.log(error));

/**
 * Promise.resolve()
 * 将现有对象转为promise对象
 */
var jsPromise = Promise.resolve($.ajax('/whatever.json'));
jsPromise.then(function(response) {
    console.log('jsPromise',response);
}).catch(function(err) {
    console.log('not find url');
})