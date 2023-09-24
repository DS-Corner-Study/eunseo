//Function Declarations
greetWorld(); // Output: Hello, World!

function greetWorld() {
  console.log('Hello, World!');
}

//Calling a Function
function sayThanks(){
    console.log('Thank you for your purchase! We appreciate your business.');
  }
  sayThanks();
  sayThanks();
  sayThanks();

//Parameters and Arguments
function sayThanks(name) {
    console.log('Thank you for your purchase '+ name + '! We appreciate your business.');
  }
  sayThanks('Cole');

//Default Parameters
function makeShoppingList(item1='milk', item2='bread', item3='eggs'){
    console.log(`Remember to buy ${item1}`);
    console.log(`Remember to buy ${item2}`);
    console.log(`Remember to buy ${item3}`);
  }
  //makeShoppingList('milk', 'bread','eggs');

//Return
function monitorCount(rows,columns){
    return rows*columns;
  }
  const numOfMonitors = monitorCount(5,4);
  console.log(numOfMonitors);

//Helper Functions
function monitorCount(rows, columns) {
    return rows * columns;
  }
  
  function costOfMonitors(rows, columns){
  return monitorCount(rows, columns)*200;  // function내부 function 
  }
  const totalCost = costOfMonitors(5,4);
  console.log(totalCost);

//Function Expressions
const plantNeedsWater = function plantNeedsWater(day){
    if(day === 'Wednesday')
    return true;
    else
    return false;
  }
  
  
  plantNeedsWater('Tuesday');
  console.log(plantNeedsWater('Tuesday'));

//Arrow Functions
/*
Arrow functions remove the need to type out the keyword function every time you need to create a function. 
Instead, you first include the parameters inside the ( ) and then add an arrow => that points to the function body surrounded in { } like this
-->function이라고 선언하지 않고 사용할 수 있다는 장점
(여기 안에 매개변수), =>가 가리키는 {}여기에 함수의 구현
함수 호출할때는 원래 함수와 동일하게 가능함 
*/
const plantNeedsWater1 = (day)=> {
    if (day === 'Wednesday') {
      return true;
    } else {
      return false;
    }
  };
  
//Concise Body Arrow Functions
const plantNeedsWater3 = day => 
   day === 'Wednesday' ? true : false;

const squareNum = num => num * num;

/*
Zero Parameters
const functionName = () => {};
One Parameters
const functionName = paramOne => {};
Two More Parameters
const functionName = (paramOne, paramTwo) =>{};

Single Line Block
const sumNumbers = number => number + number;

Multi-line Block
const sumNumbers = number => {
    const sum = number + number;
    return sum; // return statement
}
The contents of the block should immediately follow the arrow => and "the return keyword can be removed".
*/