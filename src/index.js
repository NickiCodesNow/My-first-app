  // Current Date and Time

function currentDate(date) {
  let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
  ];
  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
    if (currentHour < 10) {
      currentHour = `0${currentHour}`;
    }
  let currentMinutes = date.getMinutes();
    if (currentMinutes < 10) {
      currentMinutes = `0${currentMinutes}`;
    }
  let dateToday = `${currentDay}, ${currentHour}:${currentMinutes}`;
  
  return dateToday;
}
  
let changeDate = document.querySelector("#current-date");
  changeDate.innerHTML = currentDate(new Date());

  // Function to format Forecast hours
function formatHours(timestamp) {
  let date = new Date(timestamp);
  let currentHour = date.getHours();
  if (currentHour < 10) {
    currentHour = `0${currentHour}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentHour}:${currentMinutes}`;
}

  // Function to format Daily Forecast 
function formatDays(timestamp) {
  let today = new Date(timestamp);
  let days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day = days[today.getDay()];
  
  return `${day}`;
}

  // Show Temperature
function showTemp(response) {
  celsiusTemperature = response.data.main.temp;

  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(celsiusTemperature);

  // Change Weather Icon
  document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);

  let cityLatitude = response.data.coord.lat;
  let cityLongitude = response.data.coord.lon;

  let apiKey = "23b543af1bc755ab2201c90ef60bdb0f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLatitude}&lon=${cityLongitude}&exclude=current,minutely,hourly,alerts&units=metric&appid=${apiKey}`;
  
  axios.get(apiUrl).then(displayForecastDays);

  let backgroundElement = document.querySelector(".container");
  backgroundElement.style.backgroundImage = `url(images/${response.data.weather[0].icon}.jpg)`;
}

  // Forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-hourly");
    forecastElement.innerHTML = null;
  let forecast = null;

    for (let index = 0; index < 4; index++) {
      forecast = response.data.list[index];
      forecastElement.innerHTML += `
      <div class="col-3">
        <img 
        class="forecast-img"
        src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
        alt=""
        />
        <br />
        <span class="forecast-temp">${Math.round(forecast.main.temp)}°C</span>
        <br />
        <span class="daytime">${formatHours(forecast.dt * 1000)}</span>
      </div>
    `; 
    }
}

function displayForecastDays(response) {
  let forecastDaysElement = document.querySelector("#forecast-daily");
  forecastDaysElement.innerHTML = null;
  let dailyForecast = null;
  
    for (let index = 1; index <= 6; index++) {
      dailyForecast = response.data.daily[index];
      forecastDaysElement.innerHTML += `
      <div class="col-2">
      <img 
      class="forecast-img"
      src="http://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png" 
      alt=""
      />
      <br />
      <span class="forecast-temp">${Math.round(dailyForecast.temp.day)}°C</span>
      <br />
      <span class="daytime">${formatDays(dailyForecast.dt * 1000)}</span>
      </div>
      `; 
    }
}

function search(city) {
  let apiKey = "23b543af1bc755ab2201c90ef60bdb0f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    
    axios.get(apiUrl).then(showTemp);
    
    // Forecast hourly
    apiUrl= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}
  
function whenSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  search(city);
}
  
let enterCity = document.querySelector("#search-bar");
  enterCity.addEventListener("submit", whenSubmit);
  
  // Using Current Location
  
let buttonCurrentLocation = document.querySelector("#current-Location-button");
  buttonCurrentLocation.addEventListener("click", currentTemp);
  
function currentTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}
  
function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "23b543af1bc755ab2201c90ef60bdb0f";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  
  axios.get(apiUrl).then(showTemp);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}
  
  // Celsius vs Fahrenheit
  
function f2C(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#current-temp");

  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");

  tempElement.innerHTML = Math.round(celsiusTemperature);
}
  
let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", f2C);
  
function c2F(event) {
  event.preventDefault();

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let fahrenheitTemperature = (celsiusTemperature *9) / 5 + 32;
  let tempElement = document.querySelector("#current-temp");
  tempElement.innerHTML = Math.round(fahrenheitTemperature);
}
  
let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", c2F);

let celsiusTemperature = null;
 
  // City by Default
  
search("Berlin");