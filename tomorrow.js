let body=document.querySelector("body");
let main=document.querySelector("#main");
let Location=document.querySelector("#location");
let temperature=document.querySelector("#temp");
let unit=document.querySelector("#unit");
let humid=document.querySelector("#humidity");
let vision=document.querySelector("#visibility");
let Pressure=document.querySelector("#pressure");
let speed=document.querySelector("#wind");
let cloudCondition=document.querySelector("#condition");
let input=document.querySelector("input");
let btn=document.querySelector("button");
let hamburger=document.querySelector("#hamburger");
let content=document.querySelector("#content");
let changeMode=document.querySelector("#modeBtn");
let sun=document.querySelector("#sun");
let metric=document.querySelector("#metric");
let mode="dark";
let metricMode="celsius";
let city;


input.addEventListener("change", ()=>{
  
  let location=(input.value).trim();
 
  capitalize(location); 
});

function capitalize(location){
   let capital=location[0];
   city=capital.toUpperCase() + location.slice(1);
   return city;
}

btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  if(city==undefined){
    alert("Search any location");
  }else{
    weatherInfo(city);
    input.value='';
  }
});

hamburger.addEventListener("click", ()=>{
    content.classList.toggle("hidden");
});

changeMode.addEventListener("click", ()=>{
	if(mode=="dark"){
		Mode();
		sun.classList.add("translate-x-10");
		sun.classList.remove("translate-x-0");
		sun.innerText="☀️";
	}else{
		Mode();
	    sun.classList.add("translate-x-0");
		sun.classList.remove("translate-x-10");
		sun.innerText="🌙";
	}
});


metric.addEventListener("click",()=>{

	
	if(metricMode =="celsius"){
    temperature.innerText = ((parseFloat(temperature.innerText) * 9/5) + 32).toFixed(2);
        unit.innerText="℉";
		metric.classList.add("translate-x-5");
		metric.classList.remove("translate-x-0");
		metricMode="farenheit";
	}else{
		temperature.innerText= ((((temperature.innerText)-32)*5/9)).toFixed(2);
        unit.innerText="℃";
		metric.classList.add("translate-x-0");
		metric.classList.remove("translate-x-5");
		metricMode="celsius";
	}
});

 
input.addEventListener("focus", () => {
  if (mode === "dark") {
    input.style.backgroundColor = "rgb(93, 17, 114)";
  } else {
    input.style.backgroundColor = "rgb(160, 87, 228)";
  }
});

input.addEventListener("blur", () => {
  input.style.backgroundColor = ""; 
});

function Mode(){
	if(mode=="light"){
		body.style.backgroundColor="rgb(14, 6, 51)";
		body.style.color="white";
		content.style.backgroundColor="rgb(14,6,51)";
        main.style.backgroundColor="rgb(93, 17, 114)";
	  mode="dark";
	}else{
		body.style.backgroundColor="rgb(129, 186, 243)";
		body.style.color="black";
		content.style.backgroundColor="rgb(129, 186, 243)";
        main.style.backgroundColor="rgb(160, 87, 228)";
	    mode="light";
	}
}

const weatherInfo=async(city)=>{
  
     let apiKey = "53653fdf49a8ba51dee00ea94a8c3ab2&units=metric";
     let iteration=0;
     let sum=0;
     let weatherCondition=[];
     let rain=0;
     let clouds=0;
     let clear=0;
     let humidity=0;
     let pressure=0;
     let visibility=0;
     let windSpeed=0;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    let data1=await fetch(url);
    try{
    let data2=await data1.json();
    console.log(data2);
    Location.innerText=(data2.city).name;
    for(let i=0; i<(data2.list).length; i++){
    let date=(data2.list[i]).dt_txt;
      let todayDate=new Date((data2.list[0]).dt_txt); 
      let today=todayDate.getDate();
    let currentDate=new Date(date);
    let day=currentDate.getDate();
  if(day == today+1){
     iteration++;
     sum += ((data2.list[i]).main).temp;
      humidity += ((data2.list[i]).main).humidity;
      pressure += ((data2.list[i]).main).pressure;
      visibility += ((data2.list[i]).visibility);
      windSpeed += ((data2.list[i]).wind).speed;
     let condition=(((data2.list[i]).weather[0]).main);
     if(condition=="Rain"){
      rain++;
     }else if(condition=="Clouds"){
      clouds++;
     }else{
      clear++;
     }
     weatherCondition.push(condition);
  }
  if(day == today+2){
    break;
  }
}

let temp= (sum /iteration).toFixed(2);
if(metricMode=="celsius"){
temperature.innerText=temp ;
unit.innerText="℃";
}else{
  temperature.innerText=temp;
  unit.innerText="℉";
}
let humidAvg=(humidity/iteration).toFixed(0);
humid.innerText=humidAvg+ "%";
let pressureAvg=(pressure/iteration).toFixed(0);
Pressure.innerText=pressureAvg +"hpa";
let visibleAvg=(visibility/iteration).toFixed(0);
vision.innerText=visibleAvg + "m";
let wind=(windSpeed/iteration).toFixed(2);
 speed.innerText=wind + "mps";
if(clouds>rain && clouds>clear){
  console.log("clouds");
  cloudCondition.innerText="Mostly Cloudy ☁️"
}else if(rain>clouds && rain>clear){
  console.log("rain");
  cloudCondition.innerText="Mostly Rain ⛈️"
}else{
  console.log("clear");
  cloudCondition.innerText="Mostly Clear 🌤️";
}

}
catch{
  alert(`Error😔:
    could not fetch the weather data for that city.Please check the name !`);
}
}


if(city==undefined){
	weatherInfo("Delhi");
  }
