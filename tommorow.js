const weatherInfo=async(city)=>{
     let apiKey = "53653fdf49a8ba51dee00ea94a8c3ab2&units=metric";
     let iteration=0;
     let sum=0;
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    let data1=await fetch(url);
    console.log(data1);
    let data2=await data1.json();
    console.log(data2);
    for(let i=0; i<(data2.list).length; i++){
    let date=(data2.list[i]).dt_txt;
      let todayDate=new Date((data2.list[0]).dt_txt); 
      let today=todayDate.getDate();
    let currentDate=new Date(date);
    let day=currentDate.getDate();
  if(day == today+1){
     iteration++;
     sum += ((data2.list[i]).main).temp;
     console.log(sum);
  }
  if(day == today+2){
    break;
  }
}
console.log(iteration);
console.log(sum);
let temp= (sum /iteration).toFixed(2);
console.log(temp);
}
weatherInfo("Bageshwar");
