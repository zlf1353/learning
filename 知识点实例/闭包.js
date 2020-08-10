function output1 () {
  for (var i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 2000);
  }
}
output1()//10个10


//模仿块级作用域
//1~9
function output () {
  for (var i = 0; i < 10; i++) {
    (function (num) {
      setTimeout(function () {
        console.log(num);
      }, 2000);
    })(i)
  }
}
output()


function output2 () {
  for (let i = 0; i < 10; i++) {
    setTimeout(function () {
      console.log(i);
    }, 2000);
  }
}
output2()//10个10