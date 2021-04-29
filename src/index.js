function formatDate(date) {
  let todaydate = date.getDate();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let year = date.getFullYear();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = days[date.getDay()];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let month = months[date.getMonth()];
  if (minutes < 10) {minutes = `0${minutes}`;}
  if (hours < 10) {hours = `0${hours}`;}
  return `${day}, ${month} ${todaydate}, ${year}, ${hours}:${minutes}`;
}
let now = new Date();
let currentDayTime = document.querySelector("#date");
currentDayTime.innerHTML = formatDate(now);


function getTemp(response) {
  //console.log(response.data); 
  document.querySelector(".city").innerHTML = response.data.name; 
  let emojiElement = document.querySelector(".cityemoji");
  emojiElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  emojiElement.setAttribute("alt", response.data.weather[0].main);
celsiusTemp = response.data.main.temp;
  document.querySelector(".currtemp").innerHTML = Math.round(response.data.main.temp);
  document.querySelector(".description").innerHTML = response.data.weather[0].main;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
}
function search(city){
let apiKey = "3874a3ee9dbe37f50fedf11a9907b865";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(getTemp)}

function getCity(event) {
    event.preventDefault();
    let cityElement = document.querySelector("#city-input");
    search(cityElement.value);
}

function switchFahrenheit(event) {
  event.preventDefault();
  celsiuslink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = Math.round(((celsiusTemp) * 9)/5 + 32); 
   document.querySelector(".currtemp").innerHTML = fahrenheitTemp;
  
}
function switchCelsius(event) {event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiuslink.classList.add("active");
  document.querySelector(".currtemp").innerHTML = Math.round(celsiusTemp);
}

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", switchFahrenheit);

let celsiuslink = document.querySelector("#celsius-link");
celsiuslink.addEventListener("click", switchCelsius);

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", getCity);


function showPosition(position) {
  //console.log(position.coords.latitude);
  //console.log(position.coords.longitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "3874a3ee9dbe37f50fedf11a9907b865";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(getTemp);
}
function CurrDetails(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("button");
locationButton.addEventListener("click", CurrDetails);


search("Prague");