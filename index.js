let changeMode=document.querySelector(".mode-change");
let body=document.querySelector("body");
let container=document.querySelector(".container");
let color1=document.querySelector("#color-1");
let color2=document.querySelector("#color-2");
let color3=document.querySelector("#color-3");
let color4=document.querySelector("#color-4");
let modeBox=document.querySelector(".mode");
let linkBox=document.querySelector(".link");
modeBox.style.visibility="hidden";
linkBox.style.visibility="hidden";
let mode="dark";
     const colors = [
  "Red",
  "Orange",
  "Yellow",
  "Lime",
  "GreenYellow",
  "Aqua",
  "Cyan",
  "DeepSkyBlue",
  "DodgerBlue",
  "BlueViolet",
  "Magenta",
  "Fuchsia",
  "HotPink",
  
  "Orchid","DarkSlateBlue", "SlateBlue", "RebeccaPurple", "Purple", "DarkMagenta",
  "DarkViolet", "DarkOrchid", "DarkRed", "Maroon", "Brown",
    "SteelBlue", 
];
changeMode.addEventListener("click",()=>{
    if(mode=="dark"){
        changeMode.style.transform="translateX(55px)";
        changeMode.innerText="☀️";
        body.style.backgroundColor="rgb(129, 186, 243)";
        body.style.color="black";

        mode="light";
    }else{
        changeMode.style.transform="translateX(0px)";
        changeMode.innerText="🌙";
        body.style.color="white";
        body.style.backgroundColor="rgb(14,6,51)";
        mode="dark";
    }
});

color4.addEventListener("animationend",()=>{
    color4.style.visibility="hidden";
    color3.style.animation="disappear3 0.5s ease";
    color3.addEventListener("animationend",()=>{
        color3.style.visibility="hidden";
        color2.style.animation="disappear2 0.5s ease";
        color2.addEventListener("animationend",()=>{
            color2.style.visibility="hidden";
            color1.style.animation="disappear1 0.5s ease";
            color1.addEventListener("animationend",()=>{
                color1.style.display="none";
                     color2.style.display="none";
                          color3.style.display="none";
                               color4.style.display="none";
               colors.forEach(function(element, index){
                let colorLines=document.createElement("div");
                let random=10 * Math.random();
                let Margin=Math.floor(random);
                colorLines.style.backgroundColor=element;
                colorLines.style.height="200px";
                colorLines.style.width="10px";
                colorLines.style.margin=`${Margin}px`;
                setTimeout(()=>{
                colorLines.classList.add("highlight")
                container.append(colorLines);
                colorLines.addEventListener("animationend",()=>{
                    colorLines.style.display="none";
                         if(index==colors.length-1){
                    let image=document.createElement("img");
                    image.src="https://cdn-icons-png.freepik.com/512/9176/9176621.png";
                    image.style.width="3.5rem";
                    let text=document.createElement("p");
                    text.innerText="WeatherMe☀️";
                    text.style.color="white";
                    text.style.fontSize="2rem";
                    image.classList.add("image");
                    text.classList.add("text");
                    container.append(image);
                    container.append(text);
                    modeBox.style.visibility="visible";
                    linkBox.style.visibility="visible";   
                }
                })
                },100*index);
               
               })
            });
        });
    });

})