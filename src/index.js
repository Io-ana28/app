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
  return `${day}, ${month} ${todaydate}, ${year}, ${hours}:${minutes}`;
}
let now = new Date();
let currentDayTime = document.querySelector("#date");
currentDayTime.innerHTML = formatDate(now);


function getTemp(response) {
    console.log(response.data);
  document.querySelector(".currtemp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".city").innerHTML = response.data.name;
}

function getCity(event) {
  event.preventDefault();
  let apiKey = "3874a3ee9dbe37f50fedf11a9907b865";
  let city = document.querySelector("#city-input").value;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiURL).then(getTemp);
}

let searchButton = document.querySelector("#search-form");
searchButton.addEventListener("submit", getCity);

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
