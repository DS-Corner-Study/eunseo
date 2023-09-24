//Blocks and Scope
const city = 'New York City';
function logCitySkyline(){
let skyscraper='Empire State Building';
return 'The stars over the ' + skyscraper + ' in ' + city;
}
console.log(logCitySkyline())

//global scope
const satellite = 'The Moon';
const galaxy = 'The Milky Way';
const stars = 'North Star';
function callMyNightSky(){
  return 'Night Sky: ' + satellite + ', ' + stars + ', and ' + galaxy;
}
console.log(callMyNightSky())

//block scope
function logVisibleLightWaves(){
    const lightWaves = 'Moonlight'
    console.log(lightWaves)
    }
//console.log(logVisibleLightWaves())
logVisibleLightWaves();
console.log(lightWaves)


//scope pollution
//화살표 함수 const 변수명 = (매개변수) => {}
const satellite1 = 'The Moon';
const galaxy1 = 'The Milky Way';
let stars1 = 'North Star';

const callMyNightSky = () => {
  stars = 'Sirius';
	return 'Night Sky: ' + satellite1 + ', ' + stars1 + ', ' + galaxy1;
};

console.log(callMyNightSky());
console.log(stars)

//Practive Good Schoping

const logVisibleLightWaves = () => {
    let lightWaves = 'Moonlight';
      let region = 'The Arctic';
    // Add if statement here:
    if(region === 'The Arctic'){
      let lightWaves ='Northern Lights';
      console.log(lightWaves) 
    }
    console.log(lightWaves) 
    console.log(lightWaves);
  };
  
  logVisibleLightWaves();