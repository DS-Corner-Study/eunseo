// 구조 분해 할당 문법
const { odd, even } = require('./var');

// var.js에서 변수를 불러온 뒤, 숫자의 홀짝을 판별하는 함수를 선언
function checkOddOrEven(num) {
  if (num % 2) { // 홀수이면
    return odd;
  }
  return even;
}

// 다시 module.exports에 함수를 대입 
// -> 다른 모듈(var.js)을 사용하는 파일을 다시 모듈(func.js)로 만들 수 있음 
module.exports = checkOddOrEven;