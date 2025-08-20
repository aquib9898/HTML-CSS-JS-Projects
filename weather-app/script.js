const APIkey="eeb6713fd970f1fb1e44c987ba6396c3";
const APIurl="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

   button=document.querySelector('#searchbutton');
   searchBox=document.querySelector('#searchbox');
   image=document.querySelector('#image1');
   const border=document.querySelector('#borderdiv');
   const savebox=document.querySelector('#saved');
   const listbox = document.querySelector('#listbox');
    const saver = document.querySelector('#memory');
    const list = document.querySelector('#list');
    const toastbox=document.querySelector('#toastbox');



async function checkweather(city) {try{
    const response = await fetch(`${APIurl}${city}&appid=${APIkey}`);
    var data= await response.json();
    console.log(data);
    document.querySelector('#temp').innerHTML=data.main.temp + "°C";
    document.querySelector('#name').innerHTML=data.name;
    document.querySelector('#humidity').innerHTML=data.main.humidity + "%";
    document.querySelector('#windSpeed').innerHTML=data.wind.speed + "km/h";

    if(data.weather[0].main=="Clear"){image.src="./images/clear.png"}
    else if(data.weather[0].main=="Clouds"){image.src="./images/clouds.png"}
    else if(data.weather[0].main=="Rain"){image.src="./images/rain.png"}
    else if(data.weather[0].main=="Drizzle"){image.src="./images/drizzle.png"}
    else if(data.weather[0].main=="Mist"){image.src="./images/mist.png"}


    border.style.display="block";}catch (error){ 
    toastbox.innerHTML = '<img src="./images/cross.png" class="icon"> Enter a valid city'; 
    toastbox.classList.remove("animate");
    void toastbox.offsetWidth; 
    toastbox.classList.add("animate");
    setTimeout(() => {toastbox.classList.remove("animate");}, 5000);
    }
    
}




button.addEventListener("click",()=>{checkweather(searchBox.value);})
savebox.addEventListener("click",()=>{listbox.classList.toggle('select');})
saver.addEventListener("click",()=>{if(searchBox.value===""){alert("enter valid city to save")}else{
    li=document.createElement('li');
    li.innerText=searchBox.value;
    span=document.createElement('span');
    span.innerHTML="X";
    li.appendChild(span)
    
    list.appendChild(li);

}
})

list.addEventListener("click",(e)=>{
if(e.target.tagName==="SPAN"){e.target.parentElement.remove();}else if(e.target.tagName==="LI"){searchBox.value=e.target.firstChild.textContent;}
})


