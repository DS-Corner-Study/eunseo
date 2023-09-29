const checkThatTwoPlusTwoEqualsFourAMillionTimes = () => {
    for(let i = 1; i <= 1000000; i++) {
      if ( (2 + 2) != 4) {
        console.log('Something has gone very wrong :( ');
      }
    }
  };
  
  // Write your code below
  
  
  
  //너무 긴 이름이므로 변수 할당 
  const isTwoPlusTwo = checkThatTwoPlusTwoEqualsFourAMillionTimes;
  //새로 선언한 변수로 함수 실행할 수 있음 
  isTwoPlusTwo();
  //원래의 함수 내용 출력
  console.log(isTwoPlusTwo.name)