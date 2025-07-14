let input=document.querySelector("input");
let btn=document.querySelector("button");
let locatedPlace=document.querySelector("#location");
let temperature=document.querySelector("#temp");
let unit=document.querySelector("#unit");
let condition=document.querySelector("#condition");
let dateData=document.querySelector("#date");
let humidity=document.querySelector("#humidity");
let visibility=document.querySelector("#visibility");
let airPressure=document.querySelector("#pressure");
let windSpeed=document.querySelector("#wind");
let main=document.querySelector("#main");
let time=document.querySelectorAll(".time");
let akash=document.querySelectorAll(".akash");
let hourTemp=document.querySelectorAll(".hour-temp");
let boxes=document.querySelectorAll(".box");
let changeMode=document.querySelector("#modeBtn");
let sun=document.querySelector("#sun");
let body=document.querySelector("body");
let hamburger=document.querySelector("#hamburger");
let content=document.querySelector("#content");
let metric=document.querySelector("#metric");
let metricMode="celcius";
let mode="dark";
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
    WeatherInfo(city);
    input.value='';
  }
});

const weatherInfo=async(city)=>{
const url1=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53653fdf49a8ba51dee00ea94a8c3ab2&units=metric`;
	let data = await fetch(url1);
	try{
	let info=await data.json();
	if(metricMode=="celcius"){
	temperature.innerText=info.main.temp;
	}else{
		temperature.innerText=(((info.main.temp) * 9/5) +32).toFixed(2);
	}
	locatedPlace.innerText=info.name+"📍";
    if((info.weather[0]).main == "Clouds"){
		condition.innerText=(info.weather[0]). description+"🌧️";
	}else if((info.weather[0]).main =="Clear"){
		condition.innerText=(info.weather[0]). description+"🌤️";
	}else if((info.weather[0]).main=="Rain"){
		condition.innerText=(info.weather[0]). description+"⛈️";
	}

	windSpeed.innerText=info.wind.speed + "mps";
	humidity.innerText=info.main.humidity + "%";
	airPressure.innerText=info.main.pressure + "hpa";
    visibility.innerText= info.visibility + "m";
}catch{
	alert(`Error 😔:
		could fetch the weather data for that city.Please check the name !`);
}
}

  const WeatherInfo=async(city)=>{
     let apiKey = "53653fdf49a8ba51dee00ea94a8c3ab2&units=metric";

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    let data1=await fetch(url);
    let data2=await data1.json();
    let data=data2.list;
	for(let i=0; i<time.length; i++){
		for(let j=0; j<time.length; j++){
			if(i == j){
				let dateTime=data[i].dt_txt;
				let timeOnly=dateTime.split(" ");
				let hourOnly=timeOnly[1].split(":");
				let suffix=hourOnly[0]>12 ? "PM" :"AM" ;
				let intHour=hourOnly[0] % 12 || 12;
				   time[j].innerText=`${intHour}: ${hourOnly[1]}${suffix}`;
				}
				if((data[i].weather[0]).main == "Clouds"){
		akash[j].innerText=(data[i].weather[0]).description+"🌧️";
	}else if((data[i].weather[0]).main =="Clear"){
		akash[j].innerText=(data[i].weather[0]).description+"🌤️";
	}else if((data[i].weather[0]).main=="Rain"){
		akash[j].innerText=(data[i].weather[0]).description+"⛈️";
	}
	 
	  if(metricMode =="celcius"){
	 hourTemp[j].innerText=data[i].main.temp + "℃";
			}else{
				hourTemp[j].innerText=((((data[i].main.temp) * 9/5) + 32)).toFixed(2) + "℉"
			}
		}
		}
		}
	
  if(city==undefined){
	weatherInfo("Delhi");
	WeatherInfo("Delhi");
  }

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

	change();
	
	if(metricMode =="celcius"){
		temperature.innerText=(((temperature.innerText) * 9/5) + 32 );
        unit.innerText="℉";
		metric.classList.add("translate-x-5");
		metric.classList.remove("translate-x-0");
		metricMode="farenheit";
	}else{
		temperature.innerText= ((((temperature.innerText)-32)*5/9)).toFixed(2);
        unit.innerText="℃";
		metric.classList.add("translate-x-0");
		metric.classList.remove("translate-x-5");
		metricMode="celcius";
	}
});
  
function change(){
	for(let i=0; i<hourTemp.length; i++){
		  if(metricMode =="celcius"){
	 hourTemp[i].innerText=((((hourTemp[i].innerText).slice(0, -1))* 9/5)+ 32 ).toFixed(2) + "℉";
			} else{
				hourTemp[i].innerText=((((hourTemp[i].innerText).slice(0, -2)-32)*5/9)).toFixed(2) + "℃";
			}
		}	
}

const dateInfo=()=>{
let now = new Date();
let year = now.getFullYear();
let month = now.getMonth(); 
let date = now.getDate();
let months=["January","February","March","April","May","June","July","August","September","October","November","December"];
let exactMonth= months[month];
dateData.innerText=`${date} ${exactMonth} ${year}`;
}

dateInfo();

function Mode(){
	if(mode=="light"){
		body.style.backgroundColor="rgb(14, 6, 51)";
		body.style.color="white";
		content.style.backgroundColor="rgb(14,6,51)";
        main.style.backgroundColor="rgb(93, 17, 114)";
		for(let ele of boxes ){
         ele.style.backgroundColor="rgb(93, 17, 114)";
		}
	
		mode="dark";
	}else{
		body.style.backgroundColor="rgb(129, 186, 243)";
		body.style.color="black";
		content.style.backgroundColor="rgb(129, 186, 243)";
        main.style.backgroundColor="rgb(160, 87, 228)";
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




