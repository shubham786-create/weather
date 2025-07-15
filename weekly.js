let body=document.querySelector("body");
let heading=document.querySelector("h1");
let boxes=document.querySelectorAll(".box");
let input=document.querySelector("input");
let btn=document.querySelector("button");
let hamburger=document.querySelector("#hamburger");
let sun=document.querySelector("#sun");
let metric=document.querySelector("#metric");
let content=document.querySelector("#content");
let changeMode=document.querySelector("#modeBtn");
let searchArea=document.querySelectorAll(".location");
let currentDate=document.querySelectorAll(".date");
let temperature=document.querySelectorAll(".temp");
let precip=document.querySelectorAll(".prec");
let condition=document.querySelectorAll(".condition");
let humidity=document.querySelectorAll(".humidity");
let windSpeed=document.querySelectorAll(".wind");
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
  if(city==undefined || input.value==''){
    alert("Search any location");
  }else{
    coord(city);
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
function Mode(){
	if(mode=="light"){
		body.style.backgroundColor="rgb(14, 6, 51)";
		body.style.color="white";
		heading.style.backgroundColor="rgb(93, 17, 114)";
      
		for(let ele of boxes ){
         ele.style.backgroundColor="rgb(93, 17, 114)";
		}
	
		mode="dark";
	}else{
		body.style.backgroundColor="rgb(129, 186, 243)";
		body.style.color="black";
		heading.style.backgroundColor="rgb(160, 87, 228)";
		for(let ele of boxes ){
         ele.style.backgroundColor="rgb(160, 87, 228)";
		}
	
		mode="light";
	}
}
 
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

metric.addEventListener("click",()=>{
  
  for(let i=0; i<7; i++){
    if(metricMode=="celsius"){
      metric.classList.add("translate-x-5");
		 metric.classList.remove("translate-x-0");
      coord(city);
      metricMode="farenheit";
    }else{
      metric.classList.add("translate-x-0");
		metric.classList.remove("translate-x-5");
      coord(city);
      metricMode="celsius";
    }
  }
})


const weather=async(location2)=>{
const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location2}&apikey=6T00gxnqZquL23Zh5xnZgn9BxwSd7i1P`;
 let data1=await fetch(url);

 let data2=await data1.json();
for(let i=0; i<7; i++){
let dayString=((data2.timelines).daily[i]).time;
let day=new Date(dayString);
let dateData=day.getDate();
let month=day.getMonth() + 1;
let year=day.getFullYear();
 const dayName = day.toLocaleDateString("en-US", { weekday: "long" });
 currentDate[i].innerText=`${dayName}, ${dateData}-${month}-${year}`;

humidity[i].innerText=(((data2.timelines).daily[i]).values).humidityAvg + "%";

let tempMax=(((data2.timelines).daily[i]).values).temperatureMax;

let tempMin=(((data2.timelines).daily[i]).values).temperatureMin;
if(metricMode=="celsius"){
temperature[i].innerText=`${tempMin}℃ /${tempMax}℃`;
}else{
  tempMax=(((tempMax) * 9/5)+32).toFixed(2);
   tempMin=(((tempMin) * 9/5)+32).toFixed(2);
  temperature[i].innerText=`${tempMin}℉/${tempMax}℉`;
}

let weatherCode=(((data2.timelines).daily[i]).values).weatherCodeMax;
if(weatherCode===1000){
    condition[i].innerText="Clear Sky ☀️";
}else if(weatherCode===4001){
    condition[i].innerText="Rain 🌧️";
}else if(weatherCode===4200){
    condition[i].innerText="Light Rain 🌦️";
}else if(weatherCode===5001){
    condition[i].innerText="Snow 🌨️";
}else{
    condition[i].innerText="Thunderstorm ⛈️";
}

windSpeed[i].innerText=(((data2.timelines).daily[i]).values).windSpeedAvg +"mps";

precip[i].innerText=(((data2.timelines).daily[i]).values).precipitationProbabilityAvg +"%";

}
}

const coord=async(city)=>{
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53653fdf49a8ba51dee00ea94a8c3ab2&units=metric`;
 let data1=await fetch(url);

 let data2=await data1.json();
searchArea.forEach((element , index)=>{
searchArea[index].innerText=data2.name + "📍";
});

 let latitude=(data2.coord).lat;
 
 let longitude=(data2.coord).lon;
 let coordinates=`${latitude,longitude}`;
 weather(coordinates);
}
	
  if(city==undefined){
	 coord("Delhi");
  }


