console.log(this);  // 최상위 스코프에 존재하는 this는 module.exports(또는 exports 객체)를 가리킴
console.log(this === module.exports);
console.log(this === exports);
function whatIsThis() {
  console.log('function', this === exports, this === global);
}
whatIsThis();