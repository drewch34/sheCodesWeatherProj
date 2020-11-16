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

let date = new Date();

function formatDate(current) {
  let day = days[current.getDay()];
  let month = months[current.getMonth()];
  let date = current.getDate();

  return `${day}, ${month} ${date}`
};

let currDateEl = document.querySelector("#curr-date");
currDateEl.innerHTML = formatDate(date);




//FUTURE DAYS DISPLAY

function futureFormateDate(current, num) {
  let day = days[(current.getDay() + num) % 7];
  return day;
}

id="day-plus-four"
let dayOneEl = document.querySelector("#day-plus-one");
let dayTwoEl = document.querySelector("#day-plus-two");
let dayThreeEl = document.querySelector("#day-plus-three");
let dayFourEl = document.querySelector("#day-plus-four");
let dayFiveEl = document.querySelector("#day-plus-five");

dayOneEl.innerHTML = futureFormateDate(date, 1);
dayTwoEl.innerHTML = futureFormateDate(date, 2);
dayThreeEl.innerHTML = futureFormateDate(date, 3);
dayFourEl.innerHTML = futureFormateDate(date, 4);
dayFiveEl.innerHTML = futureFormateDate(date, 5);



//WEATHER ALERT JS

// let weather = { //weather{}
//   "paris": {  //weather[key]{}
//     temp: 19.7, // weather[key][temp]
//     humidity: 80
//   },
//   "tokyo": {
//     temp: 17.3,
//     humidity: 50
//   },
//   "lisbon": {
//     temp: 30.2,
//     humidity: 20
//   },
//   "san francisco": {
//     temp: 20.9,
//     humidity: 100
//   },
//   "moscow": {
//     temp: -5,
//     humidity: 20
//   }
// };

// var query = prompt("Please enter a city");
// var city = query.trim().toLowerCase();
// // console.log(city);
// // console.log(weather.paris);

// var forecast = function(weatherData, searchCity) {
//   // console.log(weatherData);
//   // console.log(searchCity);
//   // console.log(weatherData[searchCity]);
//   if (weatherData[searchCity] !== undefined) {
//     alert("It is currently " + weatherData[searchCity]["temp"] + " in " + searchCity + " with a humidity of " + weatherData[searchCity]["humidity"] + ".");
//   } else {
//     alert("Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+" + searchCity);
//   }
// };

// forecast(weather, city);


//SEARCH BAR

let searchCityInput = document.querySelector("#search-city");
let searchForm = document.querySelector("#search-city-form");
let displayCity = document.querySelector("#curr-city");
let displayTemp = document.querySelector("#curr-temp");
let displayCountry = document.querySelector("#curr-state-country");
let currLocBtn = document.querySelector("#current-loc");
let displayFeelsLike = document.querySelector("#curr-feels-like-temp");
let displayEmoji = document.querySelector("#current-emoji");

let key = "f42932205cbcb577e1d9c675e3aae5ef";

searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  if (searchCityInput.value.length > 0) {
    let search = searchCityInput.value;

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${key}`;

    axios.get(url).then(function (response) {
      console.log(response);
      let temp = Math.round(response.data.main.temp);
      let gpsCity = response.data.name;
      let gpsCountry = response.data.sys.country;
      let gpsFeels = Math.round(response.data.main.feels_like);
      // console.log(gpsCity)
      // console.log(temp);
      displayCity.innerHTML = gpsCity;
      displayCountry.innerHTML = gpsCountry;
      displayTemp.innerHTML = temp;
      displayFeelsLike.innerHTML = gpsFeels;
    });
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

  axios.get(url).then(function (response) {
    console.log(response);
    let temp = Math.round(response.data.main.temp); //meow
    let searchCity = response.data.name;
    let searchCountry = response.data.sys.country;
    let searchFeels = Math.round(response.data.main.feels_like);
    let currDescription = response.data.weather[0].description;
    console.log(currDescription);
    let currEmoji = determineEmoji(currDescription);
    // console.log(searchCity)
    // console.log(temp);
    displayCity.innerHTML = searchCity;
    displayCountry.innerHTML = searchCountry;
    displayTemp.innerHTML = temp;
    displayFeelsLike.innerHTML = searchFeels;
    displayEmoji.innerHTML = currEmoji;
  });
}

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




