let currentTime = new Date ();
let p2 = document.querySelector("p2");
let p3 = document.querySelector("p3");
console.log(currentTime);

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

let currentDay = days[currentTime.getDay()];
let currentDate = currentTime.getDate();
let currentMonth = months[currentTime.getMonth()];
let currentYear = currentTime.getFullYear();
let currentLocaltime = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();

p2.innerHTML=`${currentDay}, ${currentDate} ${currentMonth} ${currentYear}`;
p3.innerHTML=`Local Time: ${currentLocaltime}:${currentMinutes}`;


function convertTofahrenheit(event) {
    event.preventDefault();
    let temperatureLocal = document.querySelector("#temperature");
temperatureLocal.innerHTML = 63;
}

function convertTocelsius(event) {
    event.preventDefault();
    let temperatureLocal = document.querySelector("#temperature");
    temperatureLocal.innerHTML = 17;
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertTofahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertTocelsius);

///1 display the name of the city on the result page and the current temperature of the city.

function showWeather (response) {
console.log(response);
let city = document.querySelector("#current-city");
city.innerHTML = response.data.name;
let cityTemperature = document.querySelector("#temperature");
cityTemperature.innerHTML = Math.round (response.data.main.temp);
let description = document.querySelector("#description");
description.innerHTML = response.data.weather[0].main;
let humidity = document.querySelector("#humidity");
humidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
let wind = document.querySelector("#wind");
wind.innerHTML = `Wind: ${response.data.wind.speed} m/c`;
let feels_like = document.querySelector("#feels-like");
feels_like.innerHTML = `Feels like: ${Math.round(response.data.main.feels_like)}°C`;
let dateElement = document.querySelector("#date");
dateElement = "Friday, 4 December 2020";
}

function showTemperature(event) {
    event.preventDefault();
    let apiKey = "ac2523706a3a3cb29b4282c1c91e736e";
let units = "metric";
let city = document.querySelector("#search-text-input").value;
let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
let apiUrl=`${apiEndPoint}?q=${city}&appid=${apiKey}&units=${units}`;
window.axios.get(apiUrl).then(showWeather);
}

let form = document.querySelector("#seacrh-form");
form.addEventListener("submit", showTemperature);


//2 Add a Current Location button. 

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



























