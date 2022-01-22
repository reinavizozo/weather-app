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
  let seconds = date.getSeconds();

  let todayIs = document.querySelector(".day-date-time");
  todayIs.innerHTML = `${day} <br / > ${month} ${today}, ${year} <br /> ${hour}:${minutes}:${seconds}`;
}

formattedDate(current);

function currentWeather(tempature) {
  let currentTemp = Math.round(tempature.data.main.temp);
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentTemp}°`;
}

function searchCity(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar");
  let updateCity = document.querySelector(".city");
  let apiKey = "6c3d161e9392f3416aea7d2565d7f5e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&appid=${apiKey}&units=metric`;
  updateCity.innerHTML = city.value;
  axios.get(apiUrl).then(currentWeather);
}

let myCity = document.querySelector("form");
myCity.addEventListener("submit", searchCity);

function showWeather(temperature) {
  let currentTemp = Math.round(temperature.data.main.temp);
  let currentCity = temperature.data.name;
  let h1 = document.querySelector("h1");
  let h2 = document.querySelector("header h2");
  h2.innerHTML = `Today in ${currentCity} it's`;
  h1.innerHTML = `${currentTemp}°`;
}

function showPosition(location) {
  let lat = location.coords.latitude;
  let lon = location.coords.longitude;
  let apiKey = "6c3d161e9392f3416aea7d2565d7f5e0";
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(weatherApi).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

let fahrenheit = document.querySelector("#fahrenheit-link");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-link");
celsius.addEventListener("click", convertToCelsius);
