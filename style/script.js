/*function todaysDate(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[date.getDay()];
  return `${day} <br /> ${hour}:${minutes}`;
}*/

function displayWeather(temperature) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector(".city");
  let description = document.querySelector(".description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  //let date = document.querySelector("#date");
  let icon = document.querySelector("#weather-icon");
  celsiusTemp = temperature.data.main.temp;
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = temperature.data.name;
  description.innerHTML = temperature.data.weather[0].description;
  humidity.innerHTML = temperature.data.main.humidity;
  windSpeed.innerHTML = Math.round(temperature.data.wind.speed);
  //date.innerHTML = todaysDate(temperature.data.dt * 1000);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${temperature.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", temperature.data.weather[0].description);
}

function search(city) {
  let apiKey = "6c3d161e9392f3416aea7d2565d7f5e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

let current = new Date();

function formattedDate(date) {
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];

  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let today = date.getDate();
  let year = date.getFullYear();
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let todayIs = document.querySelector(".day-date-time");
  todayIs.innerHTML = `${day} <br / > ${month} ${today}, ${year} <br /> ${hour}:${minutes}`;
}

formattedDate(current);

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input");
  search(city.value);
}

let myCity = document.querySelector("#search-form");
myCity.addEventListener("submit", searchCity);

function showPosition(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "6c3d161e9392f3416aea7d2565d7f5e0";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApi).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

function convertToFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
}

function convertToCelsius(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);

search("New York");
