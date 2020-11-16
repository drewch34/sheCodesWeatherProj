//TIME DISPLAY
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

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

function formatDate(current) {
  let date = new Date(current);
  // console.log(date);
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let dateDay = date.getDate();

  return `${day}, ${month} ${dateDay}`
};

let currDateEl = document.querySelector("#curr-date");


// //FUTURE DAYS DISPLAY

function futureFormateDate(current, num) {
  let date = new Date(current);
  let day = days[(date.getDay() + num) % 7];
  return day;
}

let dayOneEl = document.querySelector("#day-plus-one");
let dayTwoEl = document.querySelector("#day-plus-two");
let dayThreeEl = document.querySelector("#day-plus-three");
let dayFourEl = document.querySelector("#day-plus-four");
let dayFiveEl = document.querySelector("#day-plus-five");

//SUNRISE SUNSET FUNCTION

function formatTime(current) {
  let date = new Date(current);
  console.log(date);
  let hour = date.getHours();
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hour < 10) {
    hour = `0${hour}`;
  }
  return `${hour}:${minutes}`;
};

//CHANGE MAIN INFO
let searchCityInput = document.querySelector("#search-city");
let searchForm = document.querySelector("#search-city-form");
let displayCity = document.querySelector("#curr-city");
let displayTemp = document.querySelector("#curr-temp");
let displayCountry = document.querySelector("#curr-state-country");
let currLocBtn = document.querySelector("#current-loc");
let displayFeelsLike = document.querySelector("#curr-feels-like-temp");
let displayEmoji = document.querySelector("#current-emoji");
let displaySunrise = document.querySelector("#curr-sunrise");
let displaySunset = document.querySelector("#curr-sunset");

let key = "f42932205cbcb577e1d9c675e3aae5ef";

function changeDisplay(responseInfo) {
  console.log(responseInfo);
  let temp = Math.round(responseInfo.data.main.temp); //meow
  let searchCity = responseInfo.data.name;
  let searchCountry = responseInfo.data.sys.country;
  let searchFeels = Math.round(responseInfo.data.main.feels_like);
  let currDescription = responseInfo.data.weather[0].description;
  let currTime = ((responseInfo.data.dt) * 1000)
  // console.log(currTime);
  let currEmoji = determineEmoji(currDescription);
  let currSunset = ((responseInfo.data.sys.sunset) * 1000);
  let currSunrise = ((responseInfo.data.sys.sunrise) * 1000);
  // console.log(searchCity)
  // console.log(temp);


  displayCity.innerHTML = searchCity;
  displayCountry.innerHTML = searchCountry;
  displayTemp.innerHTML = temp;
  displayFeelsLike.innerHTML = searchFeels;
  displayEmoji.innerHTML = currEmoji;
  currDateEl.innerHTML = formatDate(currTime);
  displaySunrise.innerHTML = formatTime(currSunrise);
  displaySunset.innerHTML = formatTime(currSunset);

  dayOneEl.innerHTML = futureFormateDate(currTime, 1);
  dayTwoEl.innerHTML = futureFormateDate(currTime, 2);
  dayThreeEl.innerHTML = futureFormateDate(currTime, 3);
  dayFourEl.innerHTML = futureFormateDate(currTime, 4);
  dayFiveEl.innerHTML = futureFormateDate(currTime, 5);
}

//SEARCH BAR

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  if (searchCityInput.value.length > 0) {
    let search = searchCityInput.value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`;

    axios.get(url).then(changeDisplay);
  }

});

//EMOJI FUNC
function determineEmoji(weatherDescription) {
  if (weatherDescription.includes('clear')) {
    return '☀️';
  } if (weatherDescription.includes('rain') || weatherDescription.includes('drizzle') | weatherDescription.includes('mist')) {
    return '🌧';
  } if (weatherDescription.includes('thunderstorm') || weatherDescription.includes('squall')) {
    return '⛈';
  } if (weatherDescription.includes('cloud')) {
    return '⛅'
  } if (weatherDescription.includes('snow')) {
    return '🌨';
  } if (weatherDescription.includes('fog') || weatherDescription.includes('smoke') || weatherDescription.includes('haze')) {
    return '🌫';
  } if (weatherDescription.includes('sand') || weatherDescription.includes('dust')) {
    return '🐫';
  } if (weatherDescription.includes('ash') || weatherDescription.includes('volcano')) {
    return '🌋';
  } if (weatherDescription.includes('tornado')) {
    return '🌪';
  } else {
    return '🌎';
  }
};


//GET CURRENT LOCATION INFO

function getPosition(position) {
  let lat = position.coords.latitude;
  // console.log(lat);
  let lon = position.coords.longitude;
  // console.log(lon);
  let place = `lat=${lat}&lon=${lon}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?${place}&units=metric&appid=${key}`;
  // console.log(url);

  axios.get(url).then(changeDisplay);
};

// currLocBtn.addEventListener("click", function (event) {
navigator.geolocation.getCurrentPosition(getPosition);
// console.log(navigator);
// })


//TEMP UNIT CHANGE

let fUnitBtn = document.querySelector("#f-button");
let cUnitBtn = document.querySelector("#c-button");
let temps = document.getElementsByClassName("temp");

fUnitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  // console.log(temps);

  for (let i = 0; i < temps.length; i++) {
    let value = Number(temps[i].innerHTML);
    let newValue = value + 32;
    temps[i].innerHTML = newValue;
  }
})

//will watch solution because i know that if it's already celcius,
//it'll subtract another 32. not sure how to set a default
cUnitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  for (let i = 0; i < temps.length; i++) {
    let value = Number(temps[i].innerHTML);
    let newValue = value - 32; //NaN
    temps[i].innerHTML = newValue;
  }
})




