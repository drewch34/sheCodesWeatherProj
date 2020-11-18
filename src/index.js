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

function formatTime(current, offset) {

  let date = new Date(current);
  // console.log(date);
  let hour = date.getHours().toLocaleString();
  let minutes = date.getMinutes().toLocaleString();
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
let displayEmoji = document.querySelector("#current-icon");
let displaySunrise = document.querySelector("#curr-sunrise");
let displaySunset = document.querySelector("#curr-sunset");

function changeDisplay(responseInfo) {
  console.log(responseInfo);
  let temp = Math.round(responseInfo.data.main.temp);
  let searchCity = responseInfo.data.name;
  let searchCountry = responseInfo.data.sys.country;
  let searchFeels = Math.round(responseInfo.data.main.feels_like);
  let currDescription = responseInfo.data.weather[0].icon;
  let currTime = ((responseInfo.data.dt) * 1000)
  // let timeOffset = (responseInfo.data.timezone);
  // console.log(currTime);
  // let currEmoji = determineEmoji(currDescription);
  let currSunset = responseInfo.data.sys.sunset * 1000;
  let currSunrise = responseInfo.data.sys.sunrise * 1000;

  celciusTemp = temp;
  celciusFeelsLike = searchFeels;
  searchCoordLat = responseInfo.data.coord.lat;
  searchCoordLong = responseInfo.data.coord.lon;

  displayCity.innerHTML = searchCity;
  displayCountry.innerHTML = searchCountry;
  displayTemp.innerHTML = celciusTemp;
  displayFeelsLike.innerHTML = celciusFeelsLike;
  displayEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${currDescription}@2x.png`);
  currDateEl.innerHTML = formatDate(currTime);
  displaySunrise.innerHTML = "The sunrise in your time is " + formatTime(currSunrise);
  displaySunset.innerHTML = "The sunset in your time is " + formatTime(currSunset);

  dayOneEl.innerHTML = futureFormateDate(currTime, 1);
  dayTwoEl.innerHTML = futureFormateDate(currTime, 2);
  dayThreeEl.innerHTML = futureFormateDate(currTime, 3);
  dayFourEl.innerHTML = futureFormateDate(currTime, 4);
  dayFiveEl.innerHTML = futureFormateDate(currTime, 5);
}

//CHANGE WEEKLY FORECAST

let displayDayOneHigh = document.querySelector("#day-one-high");
let displayDayOneLow = document.querySelector("#day-one-low");
let displayDayOneEmoji = document.querySelector("#day-one-emoji");

let displayDayTwoHigh = document.querySelector("#day-two-high");
let displayDayTwoLow = document.querySelector("#day-two-low");
let displayDayTwoEmoji = document.querySelector("#day-two-emoji");

let displayDayThreeHigh = document.querySelector("#day-three-high");
let displayDayThreeLow = document.querySelector("#day-three-low");
let displayDayThreeEmoji = document.querySelector("#day-three-emoji");

let displayDayFourHigh = document.querySelector("#day-four-high");
let displayDayFourLow = document.querySelector("#day-four-low");
let displayDayFourEmoji = document.querySelector("#day-four-emoji");

let displayDayFiveHigh = document.querySelector("#day-five-high");
let displayDayFiveLow = document.querySelector("#day-five-low");
let displayDayFiveEmoji = document.querySelector("#day-five-emoji");


function changeWeekly(response) {
  // console.log(response);

  let dayOneResHigh = Math.round(response.data.daily[0].temp.max);
  let dayOneResLow = Math.round(response.data.daily[0].temp.min);
  let dayOneResIcon = response.data.daily[0].weather[0].icon;
  celciusDayOneHigh = dayOneResHigh;
  celciusDayOneLow = dayOneResLow;

  displayDayOneHigh.innerHTML = dayOneResHigh;
  displayDayOneLow.innerHTML = dayOneResLow;
  displayDayOneEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${dayOneResIcon}@2x.png`);


  let dayTwoResHigh = Math.round(response.data.daily[1].temp.max);
  let dayTwoResLow = Math.round(response.data.daily[1].temp.min);
  let dayTwoResIcon = response.data.daily[1].weather[0].icon;
  celciusDayTwoHigh = dayTwoResHigh;
  celciusDayTwoLow = dayTwoResLow;

  displayDayTwoHigh.innerHTML = dayTwoResHigh;
  displayDayTwoLow.innerHTML = dayTwoResLow;
  displayDayTwoEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${dayTwoResIcon}@2x.png`);


  let dayThreeResHigh = Math.round(response.data.daily[2].temp.max);
  let dayThreeResLow = Math.round(response.data.daily[2].temp.min);
  let dayThreeResIcon = response.data.daily[2].weather[0].icon;
  celciusDayThreeHigh = dayThreeResHigh;
  celciusDayThreeLow = dayThreeResLow;

  displayDayThreeHigh.innerHTML = dayThreeResHigh;
  displayDayThreeLow.innerHTML = dayThreeResLow;
  displayDayThreeEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${dayThreeResIcon}@2x.png`);


  let dayFourResHigh = Math.round(response.data.daily[3].temp.max);
  let dayFourResLow = Math.round(response.data.daily[3].temp.min);
  let dayFourResIcon = response.data.daily[3].weather[0].icon;
  celciusDayFourHigh = dayFourResHigh;
  celciusDayFourLow = dayFourResLow;

  displayDayFourHigh.innerHTML = dayFourResHigh;
  displayDayFourLow.innerHTML = dayFourResLow;
  displayDayFourEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${dayFourResIcon}@2x.png`);


  let dayFiveResHigh = Math.round(response.data.daily[4].temp.max);
  let dayFiveResLow = Math.round(response.data.daily[4].temp.min);
  let dayFiveResIcon = response.data.daily[4].weather[0].icon;
  celciusDayFiveHigh = dayFiveResHigh;
  celciusDayFiveLow = dayFiveResLow;

  displayDayFiveHigh.innerHTML = dayFiveResHigh;
  displayDayFiveLow.innerHTML = dayFiveResLow;
  displayDayFiveEmoji.setAttribute("src", `http://openweathermap.org/img/wn/${dayFiveResIcon}@2x.png`);
}


//SEARCH BAR
let key = "f42932205cbcb577e1d9c675e3aae5ef";
let searchCoordLat = null;
let searchCoordLong = null;

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (searchCityInput.value.length > 0) {
    let search = searchCityInput.value;
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`;
    axios.get(url).then(changeDisplay);

    let searchCoords = `lat=${searchCoordLat}&lon=${searchCoordLong}`
    let weekURL = `https://api.openweathermap.org/data/2.5/onecall?${searchCoords}&exclude=hourly,minutely&units=metric&appid=${key}`;
    axios.get(weekURL).then(changeWeekly);
  }

});


//GET CURRENT LOCATION INFO
function getPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let place = `lat=${lat}&lon=${lon}`;
  let url = `https://api.openweathermap.org/data/2.5/weather?${place}&units=metric&appid=${key}`;

  axios.get(url).then(changeDisplay);

  let weekURL = `https://api.openweathermap.org/data/2.5/onecall?${place}&exclude=hourly,minutely&units=metric&appid=${key}`;
    axios.get(weekURL).then(changeWeekly);
};

navigator.geolocation.getCurrentPosition(getPosition);

//TIME UNIT CHANGE
var twentyFourHour = null;


//TEMP UNIT CHANGE

var celciusTemp = null;
var celciusFeelsLike = null;
var celciusDayOneHigh = null;
var celciusDayTwoHigh = null;
var celciusDayThreeHigh = null;
var celciusDayFourHigh = null;
var celciusDayFiveHigh = null;
var celciusDayOneLow = null;
var celciusDayTwoLow = null;
var celciusDayThreeLow = null;
var celciusDayFourLow = null;
var celciusDayFiveLow = null;

let fUnitBtn = document.querySelector("#f-button");
let cUnitBtn = document.querySelector("#c-button");
let temps = document.getElementsByClassName("temp");

fUnitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  // console.log(temps);
  displayTemp.innerHTML = Math.round((celciusTemp * 9/5) + 32);
  displayFeelsLike.innerHTML = Math.round((celciusFeelsLike* 9/5) + 32);
  displayDayOneHigh.innerHTML = Math.round((celciusDayOneHigh * 9/5) + 32);
  displayDayOneLow.innerHTML = Math.round((celciusDayOneLow * 9/5) + 32);
  displayDayTwoHigh.innerHTML = Math.round((celciusDayTwoHigh * 9/5) + 32);
  displayDayTwoLow.innerHTML = Math.round((celciusDayTwoLow * 9/5) + 32);
  displayDayThreeHigh.innerHTML = Math.round((celciusDayThreeHigh * 9/5) + 32);
  displayDayThreeLow.innerHTML = Math.round((celciusDayThreeLow * 9/5) + 32);
  displayDayFourHigh.innerHTML = Math.round((celciusDayFourHigh * 9/5) + 32);
  displayDayFourLow.innerHTML = Math.round((celciusDayFourLow * 9/5) + 32);
  displayDayFiveHigh.innerHTML = Math.round((celciusDayFiveHigh * 9/5) + 32);
  displayDayFiveLow.innerHTML = Math.round((celciusDayFiveLow * 9/5) + 32);
});


//will watch solution because i know that if it's already celcius,
//it'll subtract another 32. not sure how to set a default
cUnitBtn.addEventListener("click", function(event) {
  event.preventDefault();
  displayTemp.innerHTML = celciusTemp;
  displayFeelsLike.innerHTML = celciusFeelsLike;
  displayDayOneHigh.innerHTML = celciusDayOneHigh;
  displayDayOneLow.innerHTML = celciusDayOneLow;
  displayDayTwoHigh.innerHTML = celciusDayTwoHigh;
  displayDayTwoLow.innerHTML = celciusDayTwoLow;
  displayDayThreeHigh.innerHTML = celciusDayThreeHigh;
  displayDayThreeLow.innerHTML = celciusDayThreeLow;
  displayDayFourHigh.innerHTML = celciusDayFourHigh;
  displayDayFourLow.innerHTML = celciusDayFourLow;
  displayDayFiveHigh.innerHTML = celciusDayFiveHigh;
  displayDayFiveLow.innerHTML = celciusDayFiveLow;
});




