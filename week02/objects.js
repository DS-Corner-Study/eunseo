//객체 생성
let spaceship = {
    homePlanet: 'Earth',
    color: 'silver',
    'Fuel Type': 'Turbo Fuel',
    numCrew: 5,
    flightPath: ['Venus', 'Mars', 'Saturn']
  };
  
  let crewCount =spaceship.numCrew;
  let planetArray=spaceship.flightPath;

//접근방법 --> key가 문자열일경우 
let spaceship2 = {
    'Fuel Type' : 'Turbo Fuel',
    'Active Mission' : true,
    homePlanet : 'Earth', 
    numCrew: 5
   };
  
  let propName =  'Active Mission';
  let isActive=spaceship2[propName]
  console.log(isActive)

//프로퍼티
let spaceship3 = {
    'Fuel Type' : 'Turbo Fuel',
    homePlanet : 'Earth',
    color: 'silver',
    'Secret Mission' : 'Discover life outside of Earth.'
  };
  spaceship3.color='glorious gold'
  //새로운 key 생성
  spaceship.numEngines =3
  //key 삭제
  delete spaceship3['Secret Mission']

  //메소드 
  let retreatMessage = 'We no longer wish to conquer your planet. It is full of dogs, which we do not care for.';

  let alienShip = {
    retreat() {
      console.log(retreatMessage);
    },  // 메서드 사이 , 붙여야 함 
    takeOff() {
      console.log('Spim... Borp... Glix... Blastoff!');
    }
  };
  alienShip.retreat()
  alienShip.takeOff()

  //Nested Objects 
  let spaceship = {
    passengers: null,
    telescope: {
      yearBuilt: 2018,
      model: "91031-XLT",
      focalLength: 2032 
    },
    crew: {
      captain: { 
        name: 'Sandra', 
        degree: 'Computer Engineering', 
        encourageTeam() { console.log('We got this!') },
       'favorite foods': ['cookies', 'cakes', 'candy', 'spinach'] }
    },
    engine: {
      model: "Nimbus2000"
    },
    nanoelectronics: {
      computer: {
        terabytes: 100,
        monitors: "HD"
      },
      'back-up': {
        battery: "Lithium",
        terabytes: 50
      }
    }
  }; 
  
  let capFave= spaceship.crew.captain['favorite foods'][0]
  //Make at least one passenger object in the array that has at least one key-value pair on it.
  spaceship.passengers=[{name:'Space Dog'}]
  let firstPassenger = spaceship.passengers[0]

  //객체 루프 돌기
  let spaceship = {
    crew: {
    captain: { 
        name: 'Lily', 
        degree: 'Computer Engineering', 
        cheerTeam() { console.log('You got this!') } 
        },
    'chief officer': { 
        name: 'Dan', 
        degree: 'Aerospace Engineering', 
        agree() { console.log('I agree, captain!') } 
        },
    medic: { 
        name: 'Clementine', 
        degree: 'Physics', 
        announce() { console.log(`Jets on!`) } },
    translator: {
        name: 'Shauna', 
        degree: 'Conservation Science', 
        powerFuel() { console.log('The tank is full!') } 
        }
    }
}; 

// Write your code below
for (let crewRole in spaceship.crew) {
  let crewMember = spaceship.crew[crewRole];
  console.log(`${crewRole}: ${crewMember.name}`);
}
for (let crewRole in spaceship.crew) {
  let crewMember = spaceship.crew[crewRole];
  console.log(`${crewMember.name}: ${crewMember.degree}`);
}

