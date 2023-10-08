function first() {
    second();
    console.log('첫 번째');
  }
  function second() {
    third();
    console.log('두 번째');
  }
  function third() {
    console.log('세 번째');
  }
  first();
//세 번째
//두 번째
//첫 번째

  function run() { 
    console.log('3초 후 실행');
  }
  console.log('시작');
  setTimeout(run, 3000);
   
  console.log('끝');
  //특정 밀리초(1,000분의 1초) 이후에 코드를 실행하는 setTimeout
//시작
//끝
//3초 후 실행

function longRunningTask() {
  // 오래 걸리는 작업
  console.log('작업 끝');
}

console.log('시작');
longRunningTask();
console.log('다음 작업');
//시작
//작업 끝
//다음 작업

function longRunningTask() {
  // 오래 걸리는 작업
  console.log('작업 끝');
}
console.log('시작');
setTimeout(longRunningTask, 0);
console.log('다음 작업');
//시작
//다음 작업
//작업 끝
//setTimeout(콜백, 0)은 코드를 논블로킹으로 만들기 위해 사용하는 기법 중 하나

