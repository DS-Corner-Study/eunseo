//this
const robot = {
    provideInfo: function() {
      return `I am ${this.model} and my current energy level is ${this.energyLevel}.`;
    },
    model: '1E78V2',
    energyLevel: 100
  };
  
  console.log(robot.provideInfo());
//참고 : 화살표 함수를 쓰려면 provideInfo : () => {}
//화살표 함수는 본질적으로 호출 객체가 아닌 함수 자체에 이미 정의된 값을 바인딩 하거나 연결합니다. 
//this위의 코드 조각에서 값은 전역 객체this 이거나 전역 범위에 존재하는 객체이며 속성이 없으므로 undefined 를 반환합니다 

//함수사용 1
const goat = {
    name: 'Billy',
    color: 'biege',
    giveDetails(){
      console.log(`${this.name} is a ${this.color} goat.`)
    }
  }

//함수사용 2
const goat1 = {
    name: 'Billy',
    color: 'biege',
    giveDetails: function() {
      console.log(`${this.name} is a ${this.color} goat.`)
    }
  }

// _일반적인 규칙 중 하나는 속성 이름 앞에 밑줄을 표시하여 해당 속성을 변경해서는 안 된다는 의미입니다. 
//getter 및 setter 
const robot1 = {
    _energyLevel: 100,
    recharge(){
      this._energyLevel += 30;
      console.log(`Recharged! Energy is currently at ${this._energyLevel}%.`)
    }
  };
  
  robot1._energyLevel='high'  // 숫자를 넣어야 하지만 문자열이 들어감 
  robot1.recharge();

  //get
  const person = {
    _firstName: 'John',
    _lastName: 'Doe',
    get fullName() {
      if (this._firstName && this._lastName){
        return `${this._firstName} ${this._lastName}`;
      } else {
        return 'Missing a first name or a last name.';
      }
    }
  }
  
  // To call the getter method: 
  person.fullName; // 'John Doe'

//get키워드 다음에 함수를 사용
//조건문을 사용하여 와 가 if...else모두 존재하는지 확인하고 (둘 다 실제 값을 반환하는지 확인하여) 결과에 따라 다른 값을 반환합니다._firstName_lastName
//this 를 사용하여 호출 객체의 내부 속성에 액세스할 수 있습니다.fullName 에서는 .this._firstName, this._lastName 에  액세스합니다 
//일반적으로 getter 메소드는 괄호 세트를 사용하여 호출할 필요가 없습

const robot2 = {
    _model: '1E78V2',
    _energyLevel: 100,
    get energyLevel() {
      if (typeof this._energyLevel === 'number') {
        return `My current energy level is ${this._energyLevel}`;
      } else {
        return 'System malfunction: cannot retrieve energy level';
      }
    }
  };
  
  console.log(robot2.energyLevel);
  

//seter
const person1 = {
    _age: 37,
    set age(newAge){
      if (typeof newAge === 'number'){
        this._age = newAge;
      } else {
        console.log('You must assign a number to age');
      }
    }
  };
//check for what value is being assigned to this._age.
//only values that are numbers will reassign this._age

const robot4 = {
    _model: '1E78V2',
    _energyLevel: 100,
    _numOfSensors: 15,
    get numOfSensors(){
      if(typeof this._numOfSensors === 'number'){
        return this._numOfSensors;
      } else {
        return 'Sensors are currently down.'
      }
    },
    set numOfSensors(num){
      if(typeof num ==='number')
        {
          if(num>=0)
          this._numOfSensors=num;
        }
        else
        console.log('Pass in a number that is greater than or equal to 0')
    },
    
  };
  
  robot.numOfSensors = 100;  // seter 사용하는 법 -> 할당하면 됨 
  console.log(robot.numOfSensors)
  
//FAcotry
const robotFactory = (model, mobile) => {
    return {
      model: model,
      mobile: mobile,
      beep(){
        console.log('Beep Boop')
      }
    }
  }
  const tinCan = robotFactory('P-500',true);  // 인스턴스 생성 
  tinCan.beep();
  
  //-----------------------------

  const robotFactory2 = (model, mobile) => {
    return {
      model,  // 속성 값 약어 사용 가능 
      mobile,
      beep() {
        console.log('Beep Boop');
      }
    }
  }
  
  // To check that the property value shorthand technique worked:
  const newRobot = robotFactory2('P-501', false)
  console.log(newRobot.model)
  console.log(newRobot.mobile)

//구조화 할당
const robot3 = {
    model: '1E78V2',
    energyLevel: 100,
    functionality: {
      beep() {
        console.log('Beep Boop');
      },
      fireLaser() {
        console.log('Pew Pew');
      },
    }
  };
  //구조화 해제된 할당을 사용하여 의 속성을 추출하는 const변수를 생성
  const { functionality } = robot3
  //functionality가 참조하고 있으므로 간단히 를 통해 robot.functionality사용할 수 있는 메서드를 호출할 수 있음 
  functionality.beep()

  //-----------------------------
//Object.keys() 예시
const object1 = {
    a: 'somestring',
    b: 42,
    c: false,
  };
  
  console.log(Object.keys(object1));
  // Expected output: Array ["a", "b", "c"]

  //-----------------------------
  //Object.entries() 예시
  const object2 = {
    a: 'somestring',
    b: 42,
  };
  
  for (const [key, value] of Object.entries(object2)) {
    console.log(`${key}: ${value}`);
  }
  
  // Expected output:
  // "a: somestring"
  // "b: 42"
  
  //-----------------------------
//Object.assign()

  const target = { a: 1, b: 2 };
const source = { b: 4, c: 5 };

const returnedTarget = Object.assign(target, source);

console.log(target);
// Expected output: Object { a: 1, b: 4, c: 5 }

console.log(returnedTarget === target);
// Expected output: true

//다른 예시
const newRobot2 = Object.assign( robot, { laserBlaster: true, voiceRecognition: true });
console.log(newRobot2);