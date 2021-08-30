let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let date = now.getDate();
let day = days[now.getDay()];
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}

let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let time = document.querySelector("h2");
time.innerHTML = `${day} ${hour}:${minute}`;

function displayWeather(response) {
  document.querySelector("#city-title").innerHTML = response.data.name;
  document.querySelector(".temp-c").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;

  document.querySelector("#status").innerHTML =
    response.data.weather[0].description;
}

function search(cityname) {
  let apiKey = "03eae50e408a5980bf3d11d9419f315f";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function getcity(event) {
  event.preventDefault();
  let cityname = document.querySelector("#city-input").value;
  search(cityname);
}

let changecity = document.querySelector(".search-bar");
changecity.addEventListener("submit", getcity);

//function convert() {
//  event.preventDefault();
//  let tempElement = document.querySelector(".temp-c");
//  let temperature = tempElement.innerHTML;
//  temperature = Number(temperature);
//  tempElement.innerHTML = "66";
// }

//function converttocelsuis() {
//  event.preventDefault();
//  let tempCElement = document.querySelector(".temp-c");
//  let temperature1 = tempCElement.innerHTML;
//  temperature1 = Number(temperature1);
//  tempCElement.innerHTML = "18";
//}

//let fah = document.querySelector(".unit-f");
//fah.addEventListener("click", convert);

//let celsuis = document.querySelector(".unit-c");
//celsuis.addEventListener("click", converttocelsuis);

function searchLocation(position) {
  let apiKey = `03eae50e408a5980bf3d11d9419f315f`;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

search("Hong Kong");
