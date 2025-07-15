
const weather=async(location2)=>{
const url = `https://api.tomorrow.io/v4/weather/forecast?location=${location2}&apikey=6T00gxnqZquL23Zh5xnZgn9BxwSd7i1P`;
 let data1=await fetch(url);
 console.log(data1);
 let data2=await data1.json();
 console.log(data2);

}

const coord=async(city)=>{
const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=53653fdf49a8ba51dee00ea94a8c3ab2&units=metric`;
 let data1=await fetch(url);
 console.log(data1);
 let data2=await data1.json();
 console.log(data2);
 console.log(data2.coord);
 console.log((data2.coord).lat);
 let latitude=(data2.coord).lat;
 console.log((data2.coord).lon);
 let longitude=(data2.coord).lon;
 let coordinates=`${latitude,longitude}`;
 weather(coordinates);
}

coord("Bageshwar");