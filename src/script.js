function formatDate(date) {
  let currentDay = date.getDay();

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

  return `${weekDay}`;
}

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

function showTemperatureCelsius(response) {
  let temperature = Math.round(response.data.main.temp);
  let cityTemperature = document.querySelector("#temperature");
  cityTemperature.innerHTML = `${temperature}`;
}

function showTemperatureAndCity(response) {
  showTemperatureCelsius(response);
  let city = response.data.name;
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${city}`;
}

function searchCity(event) {
  event.preventDefault();
  let input = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#current-city");
  currentCity.innerHTML = `${input.value}`;
  let city = input.value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperatureCelsius);
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

let date = new Date();
let dateTime = document.querySelector("#date-time");
dateTime.innerHTML = `${formatDate(date)}, ${formatTime(date)}`;

let form = document.querySelector("#search");
form.addEventListener("submit", searchCity);

let currentCityButton = document.querySelector("#current-city-button");
currentCityButton.addEventListener("click", clickButton);
