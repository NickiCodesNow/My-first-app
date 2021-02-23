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
  
  //When entering a city
  
  function search(city) {
    let apiKey = "23b543af1bc755ab2201c90ef60bdb0f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
    axios.get(apiUrl).then(showTemp);
  }
  
  function whenSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#enter-city").value;
    search(city);
  }
  
  let enterCity = document.querySelector("#search-bar");
  enterCity.addEventListener("submit", whenSubmit);
  
  // When using Current Location
  
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
  }
  
  function showTemp(response) {
    console.log(response)
    document.querySelector("#current-city").innerHTML = response.data.name;
    document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp);

    // Change Weather Icon
    document.querySelector("#weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    document.querySelector("#weather-icon").setAttribute("alt", response.data.weather[0].description);
  }
  // Celsius vs Fahrenheit
  
  function c2C(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#current-temp");
    tempElement.innerHTML = 18;
  }
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", c2C);
  
  function c2F(event) {
    event.preventDefault();
    let tempElement = document.querySelector("#current-temp");
    tempElement.innerHTML = 64;
  }
  
  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", c2F);
  
  // City by Default
  
  search("Berlin");