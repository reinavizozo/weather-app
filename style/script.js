function formatWeekday(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  return days[day];
}

function displayForecast(response) {
  let weekdayForecast = response.data.daily;
  let forecast = document.querySelector("#forecast");

  let forecastDisplay = `<h3>7-Day Forecast</h3>

    <hr /> <div class="row ">`;

  weekdayForecast.forEach(function (forecastDay, index) {
    if (index < 7) {
      forecastDisplay =
        forecastDisplay +
        ` <div class="col">
            <div class="weekday">${formatWeekday(forecastDay.dt)}</div>
            <small class="temperature"><span class="max-temp">${Math.round(
              forecastDay.temp.max
            )}°</span> <span class="min-temp">${Math.round(
          forecastDay.temp.min
        )}°</span></small>
            <img src="http://openweathermap.org/img/wn/${
              forecastDay.weather[0].icon
            }@2x.png" alt="" id="icon" />
          </div>`;
    }
  });
  forecastDisplay = forecastDisplay + `</div>`;
  forecast.innerHTML = forecastDisplay;
}

function dailyForecast(coordinates) {
  let apiKey = "6c3d161e9392f3416aea7d2565d7f5e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(temperature) {
  let currentTemperature = document.querySelector("#current-temperature");
  let city = document.querySelector(".city");
  let description = document.querySelector(".description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind");
  let icon = document.querySelector("#weather-icon");
  celsiusTemp = temperature.data.main.temp;
  currentTemperature.innerHTML = Math.round(celsiusTemp);
  city.innerHTML = temperature.data.name;
  description.innerHTML = temperature.data.weather[0].description;
  humidity.innerHTML = temperature.data.main.humidity;
  windSpeed.innerHTML = Math.round(temperature.data.wind.speed / 1.609);
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${temperature.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", temperature.data.weather[0].description);

  dailyForecast(temperature.data.coord);
}

function search(city) {
  let apiKey = "6c3d161e9392f3416aea7d2565d7f5e0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
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
  let putAmPm = "";
  if (hour > 11) {
    putAmPm += "PM";
  } else {
    putAmPm += "AM";
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (hour > 12) {
    hour -= 12;
  } else if (hour === 0) {
    hour = 12;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let todayIs = document.querySelector(".day-date-time");
  todayIs.innerHTML = `${day} <br / > ${month} ${today}, ${year} <br /> ${hour}:${minutes}${putAmPm}`;
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
  let weatherApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
  axios.get(weatherApi).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("button");
button.addEventListener("click", getCurrentPosition);

search("New York");
