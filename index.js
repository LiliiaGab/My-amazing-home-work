
///1 display the name of the city on the result page and the current temperature of the city.
 function formatDate(timestamp) {
        let date = new Date(timestamp);
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let Day = days[date.getDay()];
let currentDate = date.getDate();
let Month = months[date.getMonth()];
let Year = date.getFullYear();

let hours=date.getHours();
if (hours < 10) { hours=`0${hours}`; } 
let mins=date.getMinutes(); 
if (mins < 10) { mins=`0${mins}`; } 

    return `Last updated: ${Day}, ${currentDate} ${Month} ${Year}, ${formatHours(timestamp)}`;
    }

function formatHours(timestamp){
    let date = new Date(timestamp);
    let hours=date.getHours();
if (hours < 10) { hours=`0${hours}`; 
} 
let mins=date.getMinutes(); 
if (mins < 10) { mins=`0${mins}`; 
} 
return `${hours}:${mins}`;
}

function showWeather (response) {
console.log(response);
let city = document.querySelector("#current-city");
city.innerHTML = response.data.name;
let cityTemperature = document.querySelector("#temperature");
celsiusTemperature = response.data.main.temp;
cityTemperature.innerHTML = Math.round (celsiusTemperature);
let description = document.querySelector("#description");
description.innerHTML = response.data.weather[0].main;
let humidity = document.querySelector("#humidity");
humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
let wind = document.querySelector("#wind");
wind.innerHTML = `Wind: ${response.data.wind.speed} m/c`;
let feels_like = document.querySelector("#feels-like");
feels_like.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
let dateElement = document.querySelector("#dateCity");
dateElement.innerHTML = formatDate(response.data.dt * 1000);
let iconElement = document.querySelector("#icon");
iconElement.setAttribute("src", 
`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}

function showForecast(response) {
    
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
       forecastElement.innerHTML += `
    <div class="col-2">
            <img 
            src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png" alt=""/>
              <span class="future-temperature">
            ${Math.round(forecast.main.temp_max)}°C
            </span>
            <br />  
            ${formatHours(forecast.dt*1000)}
          </div>
    `;    
    }
}

function search(city) {
    let apiKey = "ac2523706a3a3cb29b4282c1c91e736e";
   let units = "metric";
   let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
   let apiUrl=`${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showWeather);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(showForecast);
}

function showTemperature(event) {
    event.preventDefault();
    let city = document.querySelector("#search-text-input");
    search(city.value);
}

search("Auckland");

let form = document.querySelector("#seacrh-form");
form.addEventListener("submit", showTemperature);


function displayForecast(response){
console.log(response.data);
}


function showPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude; 
    let apiKey = "ac2523706a3a3cb29b4282c1c91e736e";
    let units = "metric";
    let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
    let apiUrl=`${apiEndPoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    window.axios.get(apiUrl).then(showWeather);
}
 
function getCurrentPosition(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current");
button.addEventListener("click", getCurrentPosition);

function convertTofahrenheit(event) {
    event.preventDefault();
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertTocelsius(event) {
    event.preventDefault();
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertTofahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertTocelsius);






