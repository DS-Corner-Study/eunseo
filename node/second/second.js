const newObject = {
    sayJS() {
      console.log('JS');
    },
    sayNode,  // 속성명과 변수명이 같다면 한번만 써도 됨 
    [es + 6]: 'Fantastic',
  };
  newObject.sayNode(); // Node
  newObject.sayJS(); // JS
  console.log(newObject.ES6); // Fantastic
  //메서드를 만들 때 [이름 : 함수] (x), 메서드 이름만 작성하고 바로 실행 내용 작성하면 됨 
//----------------------------

var Human = function(type) {
    this.type = type || 'human';
  };
  
  Human.isHuman = function(human) {
    return human instanceof Human;
  }
  
  Human.prototype.breathe = function() {
    alert('h-a-a-a-m');
  };
  
  var Zero = function(type, firstName, lastName) {
    Human.apply(this, arguments);
    this.firstName = firstName;
    this.lastName = lastName;
  };
  
  Zero.prototype = Object.create(Human.prototype);
  Zero.prototype.constructor = Zero; // 상속하는 부분
  Zero.prototype.sayName = function() {
    alert(this.firstName + ' ' + this.lastName);
  };
  var oldZero = new Zero('human', 'Zero', 'Cho');
  Human.isHuman(oldZero); // true
 // Human 생성자 함수가 있고, 그 함수를 Zero 생성자 함수가 상속합니다. Zero 생성자 함수를 보면 상속받기 위한 코드가 상당히 난해함을 알 수 있습니다. Human.apply와 Object.create 부분이 상속받는 부분입니다.

 //class 형식 
 class Human {
    constructor(type = 'human') {
      this.type = type;
    }
  
    static isHuman(human) {
      return human instanceof Human;
    }
  
    breathe() {
      alert('h-a-a-a-m');
    }
  }
  
  class Zero extends Human {
    constructor(type, firstName, lastName) {
      super(type);
      this.firstName = firstName;
      this.lastName = lastName;
    }
  
    sayName() {
      super.breathe();
      alert(`${this.firstName} ${this.lastName}`);
    }
  }
  
  const newZero = new Zero('human', 'Zero', 'Cho');
  Human.isHuman(newZero); // true

  //--------------------------------

//프로미스
const condition = true; // true이면 resolve, false이면 reject
const promise = new Promise((resolve, reject) => {
  if (condition) {
    resolve('성공');
  } else {
    reject('실패');
  }
});
// 다른 코드가 들어갈 수 있음
promise
  .then((message) => {
    console.log(message); // 성공(resolve)한 경우 실행
  })
  .catch((error) => {
    console.error(error); // 실패(reject)한 경우 실행
  })
  .finally(() => { // 끝나고 무조건 실행
    console.log('무조건');
});
//실행은 바로 하되 결괏값은 나중에 받는 객체입니다. 결괏값은 실행이 완료된 후 then이나 catch 메서드를 통해 받습니다. 

//then이나 catch에서 다시 다른 then이나 catch를 붙일 수 있습니다
promise
  .then((message) => {
    return new Promise((resolve, reject) => {
      resolve(message);
    });
  })
  .then((message2) => {
    console.log(message2);
    return new Promise((resolve, reject) => {
      resolve(message2);
    });
  })
  .then((message3) => {
    console.log(message3);
  })

  .catch((error) => {
    console.error(error);
});

//hen에서 new Promise를 return해야 다음 then에서 받을 수 있다는 것을 기억하자 

function findAndSaveUser(Users) {
  Users.findOne({})
    .then((user) => {
      user.name = 'zero';
      return user.save();
    })
    .then((user) => {
      return Users.findOne({ gender: 'm' });
    })
    .then((user) => {
      // 생략
    })
    .catch(err => {
      console.error(err);
    });
}

const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');
Promise.all([promise1, promise2])
  .then((result) => {
    console.log(result); // ['성공1', '성공2'];
  })
  .catch((error) => {
    console.error(error);
  });


 // 정확히 어떤 프로미스에서 reject되었는지 알기 위해서는 Promise.all 대신 Promise.allSettled를 사용해야 합니다.

  const promise11 = Promise.resolve('성공1');
  const promise21 = Promise.reject('실패2');
  const promise31 = Promise.resolve('성공3');
  Promise.allSettled([promise11, promise21, promise31])
    .then((result) => {
      console.log(result);
  /* [
  *    { status: 'fulfilled', value: '성공1' },
  *    { status: 'rejected', reason: '실패2' },
  *    { status: 'fulfilled', value: '성공3' }
  *  ]
  */
    })
    .catch((error) => {
      console.error(error);
    });

//함수 선언부를 일반 함수 대신 async function으로 교체한 후, 프로미스 앞에 await을 붙였습니다. 
//이제 함수는 해당 프로미스가 resolve될 때까지 기다린 뒤 다음 로직으로 넘어갑니다. 
//예를 들면, await Users.findOne({})이 resolve될 때까지 기다린 다음에 user 변수를 초기화하는 것입니다.
async function findAndSaveUser(Users) {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
  } catch (error) {
    console.error(error);
  }
}
/*화살표 버전
const findAndSaveUser = async (Users) => {
  try {
    let user = await Users.findOne({});
    user.name = 'zero';
    user = await user.save();
    user = await Users.findOne({ gender: 'm' });
    // 생략
  } catch (error) {
    console.error(error);
  }
};
*/

//for문과 async/await을 같이 써서 프로미스를 순차적으로 실행
const promise13 = Promise.resolve('성공1');
const promise23 = Promise.resolve('성공2');
(async () => {
  for await (promise of [promise13, promise23]) {
    console.log(promise);
  }
})();
/*
async 함수의 반환값은 항상 Promise로 감싸집니다. 
따라서 실행 후 then을 붙이거나 또 다른 async 함수 안에서 await을 붙여서 처리할 수 있습니다.
async function findAndSaveUser(Users) {
  // 생략
}

findAndSaveUser().then(() => { /* 생략  });
// 또는
async function other() {
    const result = await findAndSaveUser();
  }
*/

//map
const m = new Map();

m.set('a', 'b'); // set(키, 값)으로 Map에 속성 추가
m.set(3, 'c'); // 문자열이 아닌 값을 키로 사용 가능합니다
const d = {};
m.set(d, 'e'); // 객체도 됩니다

m.get(d); // get(키)로 속성값 조회
console.log(m.get(d)); // e

m.size; // size로 속성 개수 조회
console.log(m.size) // 3

for (const [k, v] of m) { // 반복문에 바로 넣어 사용 가능합니다
  console.log(k, v); // 'a', 'b', 3, 'c', {}, 'e'
} // 속성 간의 순서도 보장됩니다

m.forEach((v, k) => { // forEach도 사용 가능합니다
  console.log(k, v); // 결과는 위와 동일
});

m.has(d); // has(키)로 속성 존재 여부를 확인합니다
console.log(m.has(d)); // true

m.delete(d); // delete(키)로 속성을 삭제합니다
m.clear(); // clear()로 전부 제거합니다
console.log(m.size); // 0
//Map은 속성들 간의 순서를 보장하고 반복문을 사용할 수 있습니다. 속성명으로 문자열이 아닌 값도 사용할 수 있고 size 메서드를 통해 속성의 수를 쉽게 알 수 있다는 점에서 일반 객체와 다릅니다.


//set
const s = new Set();
s.add(false); // add(요소)로 Set에 추가합니다
s.add(1);
s.add('1');
s.add(1); // 중복이므로 무시됩니다
s.add(2);

console.log(s.size); // 중복이 제거되어 4

s.has(1); // has(요소)로 요소 존재 여부를 확인합니다
console.log(s.has(1)); // true

for (const a of s) {
  console.log(a); // false 1 '1' 2
}

s.forEach((a) => {
  console.log(a); // false 1 '1' 2
})

s.delete(2); // delete(요소)로 요소를 제거합니다
s.clear(); // clear()로 전부 제거합니다

const a = 0;
const b = a || 3; // || 연산자는 falsy 값이면 뒤로 넘어감
console.log(b); // 3

const c = 0;
const d2 = c ?? 3; // ?? 연산자는 null과 undefined일 때만 뒤로 넘어감
console.log(d2); // 0;

const e = null;
const f = e ?? 3;
console.log(f); // 3;

const g = undefined;
const h = g ?? 3;
console.log(h); // 3;



const a1 = {}
a1.b; // a가 객체이므로 문제없음

const c1 = null;
try {
  c1.d;
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'd')
}
c1?.d; // 문제없음

try {
  c1.f();
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading 'f')
}
c1?.f(); // 문제없음

try {
  c1[0];
} catch (e) {
  console.error(e); // TypeError: Cannot read properties of null (reading '0')
}
c1?.[0]; // 문제없음
//c?.d와 c?.f(), c?.[0]의 값은 undefined