function padTimeWithZero(value) {
  if (value < 10) {
    return "0" + value;
  } else {
    return value;
  }
}

function formatTime(date) {
  let currentHour = padTimeWithZero(date.getHours());
  let currentMinute = padTimeWithZero(date.getMinutes());

  return `${currentHour}:${currentMinute}`;
}

function showCityTemperature(response) {
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = Math.round(response.data.main.temp);
}

function showFeelsLike(response) {
  let feelsLike = document.querySelector("#feels-like");
  feelsLike.innerHTML = Math.round(response.data.main.feels_like);
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

  console.log(response);

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

function showWeatherDescription(response) {
  let showWeatherDescription = document.querySelector("#weather-description");
  showWeatherDescription.innerHTML = response.data.weather[0].description;
}

function changeWeatherIcon(response) {
  let icon = document.querySelector("#weather-icon");
  icon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  icon.setAttribute("alt", response.data.weather[0].description);
}

function showCurrentCityWeatherDetails(response) {
  changeWeatherIcon(response);
  showWeatherDescription(response);
  showCityTemperature(response);
  showFeelsLike(response);
  showHumidity(response);
  showWindSpeed(response);
  showSunriseTime(response);
  showSunsetTime(response);
  showLastUpdateDateTime(response);
}

function showTemperatureAndCity(response) {
  showCurrentCityWeatherDetails(response);
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = response.data.name;
  console.log(response.data.name);
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

function getCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let latitudeLongitudeUrl = `lat=${latitude}&lon=${longitude}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?${latitudeLongitudeUrl}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureAndCity);
}

function clickButton(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentLocation);
}

let apiKey = `5bf5575e8c026f28007101c82f4f7882`;

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", clickButton);

searchForWeatherIn("La Habana");
