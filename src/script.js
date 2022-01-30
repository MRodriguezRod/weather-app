function padTimeWithZero(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}

function convertCelsiusToFahrenheit(celsius) {
  let fahrenheit = (celsius * 9) / 5 + 32;

  return fahrenheit;
}

function formatWeekdays(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getUTCDay();
  let weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return weekdays[day];
}

function showTemperatureAndCity(response) {
  showCurrentCityWeatherDetails(response);

  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();

  let input = document.querySelector("#search-city-input");
  searchForWeatherIn(input.value);
}

function searchForWeatherIn(city) {
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = city;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(showCurrentCityWeatherDetails);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let latitudeLongitudeUrl = `lat=${latitude}&lon=${longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${latitudeLongitudeUrl}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndCity);
}

function showCurrentCityWeatherDetails(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  feelsLikeTemperatureCelsius = response.data.main.feels_like;

  changeWeatherIcon(response);
  showWeatherDescription(response);
  showCityTemperature(response);
  showFeelsLike(response);
  showHumidity(response);
  showWindSpeed(response);
  showSunriseTime(response);
  showSunsetTime(response);
  showLastUpdateDateTime(response);
  getForecast(response.data.coord);
  changeBackground(response);
}

function changeWeatherIcon(response) {
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function showWeatherDescription(response) {
  let showWeatherDescription = document.querySelector("#weather-description");
  showWeatherDescription.innerHTML = response.data.weather[0].description;
}

function showCityTemperature(response) {
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);
}

function showFeelsLike(response) {
  let feelsLike = document.querySelector("#feels-like");

  feelsLike.innerHTML = `${Math.round(response.data.main.feels_like)} ºC`;
}

function showHumidity(response) {
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = response.data.main.humidity;
}

function showWindSpeed(response) {
  let windSpeed = document.querySelector("#wind-speed");
  windSpeed.innerHTML = Math.round(response.data.wind.speed * 3.6);
}

function showSunriseTime(response) {
  let sunriseFullValue = new Date(
    (response.data.sys.sunrise + response.data.timezone) * 1000
  );
  let sunriseHours = padTimeWithZero(sunriseFullValue.getUTCHours());
  let sunriseMinutes = padTimeWithZero(sunriseFullValue.getUTCMinutes());
  let sunriseTime = document.querySelector("#sunrise");
  sunriseTime.innerHTML = `${sunriseHours}:${sunriseMinutes}`;
}

function showSunsetTime(response) {
  let sunsetFullValue = new Date(
    (response.data.sys.sunset + response.data.timezone) * 1000
  );
  let sunsetHours = padTimeWithZero(sunsetFullValue.getUTCHours());
  let sunsetMinutes = padTimeWithZero(sunsetFullValue.getUTCMinutes());
  let sunsetTime = document.querySelector("#sunset");
  sunsetTime.innerHTML = `${sunsetHours}:${sunsetMinutes}`;
}

function showLastUpdateDateTime(response) {
  let dateFullValue = new Date(response.data.dt * 1000);

  let currentDay = dateFullValue.getDay();

  let weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = weekDays[currentDay];

  let currentHours = padTimeWithZero(dateFullValue.getHours());
  let currentMinutes = padTimeWithZero(dateFullValue.getMinutes());
  let currentDateTime = document.querySelector("#date-time");
  currentDateTime.innerHTML = `${weekDay}, ${currentHours}:${currentMinutes}`;
}

function changeBackground(response) {
  let iconCode = response.data.weather[0].icon;
  background = document.querySelector("#background");

  if (iconCode === "01d") {
    background.src = `images/clearsky-brett-sayles-912364.jpg`;
    background.alt = `Sunny`;
  } else {
    if (iconCode === "01n") {
      background.src = `images/night-clear-pexels-drift-shutterbug-2085998.jpg`;
      background.alt = `Clear sky night`;
    } else {
      if (
        iconCode === "02d" ||
        iconCode === "02n" ||
        iconCode === "03d" ||
        iconCode === "03n" ||
        iconCode === "04d" ||
        iconCode === "04n"
      ) {
        background.src = `images/clouds-miguel-a-padriñan-19670.jpg`;
        background.alt = `Clouds`;
      } else {
        if (
          iconCode === "09d" ||
          iconCode === "09n" ||
          iconCode === "10d" ||
          iconCode === "10n"
        ) {
          background.src = `images/rain-johannes-plenio-2259232.jpg`;
          background.alt = `Rain`;
        } else {
          if (iconCode === "11d" || iconCode === "11n") {
            background.src = `images/storm-gerhard-6312434.jpg`;
            background.alt = `Thunderstorm`;
          } else {
            if (iconCode === "13d" || iconCode === "13n") {
              background.src = `images/snow-choice-6153987.jpg`;
              background.alt = `Snow`;
            } else {
              if (iconCode === "50d" || iconCode === "50n") {
                background.src = `images/mist-eberhard-grossgasteiger-1287075.jpg`;
                background.alt = `Mist`;
              }
            }
          }
        }
      }
    }
  }
}

function getForecast(coordinates) {
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  console.log(apiUrlForecast);
  axios.get(apiUrlForecast).then(displayForecast);
}

function displayForecast(response) {
  let forecastDetails = response.data.daily;

  forecastHigherTemperatureCelsius = [];
  forecastLowerTemperatureCelsius = [];
  forecastDays = [];
  forecastIcons = [];

  forecastDetails.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHigherTemperatureCelsius.push(forecastDay.temp.max);
      forecastLowerTemperatureCelsius.push(forecastDay.temp.min);
      forecastIcons.push(forecastDay.weather[0].icon);
      forecastDays.push(forecastDay.dt);
    }
  });

  showCelsiusForecast();
}

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = convertCelsiusToFahrenheit(celsiusTemperature);

  celsius.classList.remove("active");
  fahrenheit.classList.add("active");

  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = Math.round(fahrenheitTemperature);
  let feelsLikeFahrenheit = convertCelsiusToFahrenheit(
    feelsLikeTemperatureCelsius
  );
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(feelsLikeFahrenheit)} ºF`;

  showFahrenheitForecast();
}

function showFahrenheitForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  forecastDays.forEach(function (forecastDay, index) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-element">
                   <span id="forecast-day"><strong>${formatWeekdays(
                     forecastDay
                   )}</strong></span>  
                 <span id="forecastIcon"><img src="http://openweathermap.org/img/wn/${
                   forecastIcons[index]
                 }@2x.png" alt="{forecastDay.weather[0].description" width="36"</span>
                   <span id="forecast-higher-temperature"> ${Math.round(
                     convertCelsiusToFahrenheit(
                       forecastHigherTemperatureCelsius[index]
                     )
                   )}</span>&nbspºF<span class="separator"> |</span> 
                   <span class="forecast-lower-temperature" id="forecast-lower-temperature">${Math.round(
                     convertCelsiusToFahrenheit(
                       forecastLowerTemperatureCelsius[index]
                     )
                   )}</span><span class="degrees">&nbspºF</span>
                    </div>
                    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

function showCelsiusTemperature(event) {
  event.preventDefault();

  fahrenheit.classList.remove("active");
  celsius.classList.add("active");

  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = Math.round(celsiusTemperature);
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = `${Math.round(feelsLikeTemperatureCelsius)} ºC`;

  showCelsiusForecast();
}

function showCelsiusForecast() {
  let forecastElement = document.querySelector("#forecast");
  let forecastHtml = "";

  forecastDays.forEach(function (forecastDay, index) {
    forecastHtml =
      forecastHtml +
      `<div class="forecast-element">
                   <span id="forecast-day"><strong>${formatWeekdays(
                     forecastDay
                   )}</strong></span>  
                 <span id="forecastIcon"><img src="http://openweathermap.org/img/wn/${
                   forecastIcons[index]
                 }@2x.png" alt="{forecastDay.weather[0].description" width="36"</span>
                   <span id="forecast-higher-temperature"> ${Math.round(
                     forecastHigherTemperatureCelsius[index]
                   )}</span>&nbspºC<span class="separator"> |</span> 
                   <span class="forecast-lower-temperature" id="forecast-lower-temperature">${Math.round(
                     forecastLowerTemperatureCelsius[index]
                   )}</span><span class="degrees">&nbspºC</span>
                    </div>
                    `;
  });

  forecastElement.innerHTML = forecastHtml;
}

let apiKey = `5bf5575e8c026f28007101c82f4f7882`;

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", clickButton);

let celsiusTemperature = null;
let feelsLikeTemperatureCelsius = null;
let forecastHigherTemperatureCelsius = null;
let forecastLowerTemperatureCelsius = null;
let forecastDays = null;
let forecastIcons = null;

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheitTemperature);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsiusTemperature);

searchForWeatherIn("La Habana");
