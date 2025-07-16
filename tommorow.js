const weatherInfo=async(city)=>{
     let apiKey = "53653fdf49a8ba51dee00ea94a8c3ab2&units=metric";

  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    let data1=await fetch(url);
    console.log(data1);
    let data2=await data1.json();
    console.log(data2);
    for(let i=0; i<(data2.list).length; i++){
    let date=(data2.list[i]).dt_txt;
    let currentDate=new Date(date);
    let day=currentDate.getDate();
    if(day==17){
    console.log(day);
    }
  }
}

