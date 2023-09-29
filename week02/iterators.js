//forEach()
//리스트 하나하나 찾아서 반복한다~
const fruits = ['mango', 'papaya', 'pineapple', 'apple'];

fruits.forEach(fruit => {
  console.log(`I want to eat a ${fruit}`);
});


//----------------------------------------
//map()
//When .map() is called on an array, it takes an argument of a callback function and returns a new array
const animals = ['Hen', 'elephant', 'llama', 'leopard', 'ostrich', 'Whale', 'octopus', 'rabbit', 'lion', 'dog'];

const secretMessage = animals.map(animal => {
  return animal[0];  // 인덱스가 0인 곳만 추출해서 새로운 배열 생성 
});
console.log(secretMessage.join(''));

const bigNumbers = [100, 200, 300, 400, 500];

const smallNumbers=bigNumbers.map(number => number/100)


//--------------------------------------
//findIndex()
const animals2 = ['hippo', 'tiger', 'lion', 'seal', 'cheetah', 'monkey', 'salamander', 'elephant'];

const foundAnimal = animals2.findIndex(ani => ani === 'elephant');
//console.log(foundAnimal) -> 7
const startsWithS=animals2.findIndex(ani => ani[0]==='s')

//----------------------------------------
//reduce()
//메서드는 배열 요소를 반복한 후 단일 값을 반환하므로 배열이 줄어듭니다 .
const newNumbers = [1, 3, 5, 7];
const newSum = newNumbers.reduce(function(accumulator, currentValue) {
  console.log('The value of accumulator: ', accumulator);
  console.log('The value of currentValue: ', currentValue);
  return accumulator + currentValue;
}, 10); // 두 번째 매개변수에 초기값 10을 제공.
//(1,3)->(4,5)->(9,7)->return 16
//두번째 매개변수에 초기값 10을 제공하게 되면 (10,1)->(11,3)->(14,5)->(19,7)->return 26
console.log('Final sum:', newSum);

//------------------------------------------
const words = ['unique', 'uncanny', 'pique', 'oxymoron', 'guise'];

//The .some() method returned true, 
//which means there are <some words> in the array that are shorter than six characters.
console.log(words.some((word) => {
  return word.length < 6;
}));

//.filter() method to <save any words longer than 5 characters> to a new variable called interestingWords, declared with const.
const interestingWords = words.filter((word)=>{
  return word.length>5;
})

//every
//check if <every element> has more than 5 characters.
console.log(interestingWords.every((word) => { 
  return word.length>5}));

//review
const cities = ['Orlando', 'Dubai', 'Edinburgh', 'Chennai', 'Accra', 'Denver', 'Eskisehir', 'Medellin', 'Yokohama'];

const nums = [1, 50, 75, 200, 350, 525, 1000];

//  Choose a method that will return undefined
cities.forEach(city => console.log('Have you visited ' + city + '?'));

// Choose a method that will return a new array
const longCities = cities.filter(city => city.length > 7);

// Choose a method that will return a single value
const word = cities.reduce((acc, currVal) => {
  return acc + currVal[0]
}, "C");

console.log(word)

// Choose a method that will return a new array
const smallerNums = nums.map(num => num - 5);

// Choose a method that will return a boolean value
nums.some(num => num < 0);
