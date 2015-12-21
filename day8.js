var strings = document.body.textContent.split(/\n/);
var count = 0;
for (var i = 0; i < strings.length; i++) {
    var str = strings[i];
    var evalled = eval(strings[i]);
    console.log(str);
    console.log(evalled);
    count += strings[i].length - eval(strings[i]).length;
};

console.log('count is ' + count);

var count = 0;
var strings = document.body.textContent.split(/\n/);
for (var i = 0; i < strings.length - 1; i++) {
    var string = strings[i];
    var encodedStr = string.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    // debugger;
    count +=  (encodedStr.length + 2) - string.length;

}

console.log(count)

