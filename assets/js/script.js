let searchInputEl = document.getElementById('search-input');
let today = moment().format('dddd, MMM Do, YYYY');
let histUl = document.getElementById('hist-items');
let histDiv = document.getElementById('hist-div')
let cities = document.getElementsByClassName('cityList');

let searchHandler = function (event){
    event.preventDefault();
    let city = searchInputEl.value.trim();
    if (city) {
        getLatLon(city);
      } else {
        alert('Please enter a city');
      }
}

let getLatLon = function (city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=3cbac659165d03c7a5a56ef38b21d47f';
    $('.removeMe').remove();
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                createCurrWeatherDiv(data);
                handleOneCall(data); // data, city
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Database');
        });
   };

function createCurrWeatherDiv(data) {
    const currentWeatherContainer = $('#currWeatherContainer');
    const city = data.name;
    saveLocalStorage(city);
    let currentWeatherBody = $('<div>')
        .addClass('card-body current-weather-body')
        .html(`<h4 class="card-title">${city}</h4>`);
    let currWeatherCard = $('<div>')
        .addClass('card curr-card mb-2');
    let currWeatherCol = $('<div>')
        .addClass('col-10');
    let currWeatherRow = $('<div>')
        .addClass('row removeMe');
    currWeatherCard.append(currentWeatherBody);
    currWeatherCol.append(currWeatherCard);
    currWeatherRow.append(currWeatherCol);
    currentWeatherContainer.append(currWeatherRow);
}

//  build the search history from localstorage
function buildSearchHistory(){
    $('.removeMeHist').remove();
    let savedCities = [];
    savedCities = JSON.parse(localStorage.getItem('searchCities')) || [];
    for (let i = 0; i < savedCities.length; i++) {
        let histCity = savedCities[i].city; 
    let histButton = document.createElement('button');
    histButton.setAttribute('class', 'cityList btn btn-secondary btn-sm removeMeHist');
    histButton.setAttribute('id', histCity)
    histButton.textContent = histCity;    
    histDiv.append(histButton)
    }
}

// save items to localstorage
function saveLocalStorage (city) {
    let savedCities = localStorage.getItem('searchCities');
    let citiesArray = [];
    if (!!savedCities) {
        citiesArray = JSON.parse(savedCities);
    }
    citiesArray.unshift({city: city});
    localStorage.setItem('searchCities', JSON.stringify(citiesArray));
    buildSearchHistory();
}

function handleOneCall(data){
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    let oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly,minutely,alerts&appid=3cbac659165d03c7a5a56ef38b21d47f';
    fetch(oneCallUrl)
        .then(function (response) {
            if (response.ok) {
            response.json().then(function (data) {
                displayWeather(data); 
                displayFiveDay(data);
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Database');
        });
   };
   
// humidity wind speed uv index
let displayWeather = function (data) {
    const temp = data.current.temp + '°';
    const icon = data.current.weather[0].icon;
    const humidity = data.current.humidity + '%';
    const windSpeed = data.current.wind_speed;
    const uvIndex = data.current.uvi;

    $(`<h5>${today}</h5> 
    <h4><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Image"></h4>
    <h5 class="card-subtitle mb-2">Temperature: ${temp}</h5>
    <p id='currHumidity'>Humidity: ${humidity}</p>
    <p id='wind'>Wind Speed: ${windSpeed}MPH</p>
    <p class='justify-content-center' id='uv-index'>UV Index: ${uvIndex}</p>`).appendTo('.current-weather-body')
    // const uvIndexEl = document.getElementById('uv-index')
    if (uvIndex < 3) {
        $('#uv-index').addClass('bg-success')
    } else if (uvIndex > 5) {
        $('#uv-index').addClass('bg-danger')
    } else {
        $('#uv-index').addClass('bg-warning')
    }
}

// need date, icon, temp, humidity
function displayFiveDay (data) {
    const fiveDayRow = $('.five-day-cards');
  
    for (let i = 1; i < 6; i++) {
    let unixDate = data.daily[i].dt
    let date = moment.unix(unixDate).format('M/D/YY');
    let temp = data.daily[i].temp.max + '°';
    let humidity = data.daily[i].humidity + '%';
    let icon = data.daily[i].weather[0].icon

    let fiveDayBody = $('<div>')
        .addClass('card-body')
        .html(`<h5 class="card-title">${date}</h5>
        <h6><img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Image"></h6>
        <h6 class="card-subtitle">${temp}</h6>
        <p>Humidity: ${humidity}</p>`);
    let fiveDayCard = $('<div>')
        .addClass('card mb-5 five-card');
    let fiveDayCol = $('<div>')
        .addClass('col-2 removeMe');
    fiveDayCard.append(fiveDayBody);
    fiveDayCol.append(fiveDayCard);
    fiveDayRow.append(fiveDayCol)
    }
}

function init(){
    buildSearchHistory();
}

function usePastCity(event) {
    let pastCity = event.target;
    if (event.target.matches(".cityList")) {
        city = pastCity.textContent.trim();
        getLatLon(city);
    }
}

function clearHistory() {
    localStorage.clear();
    window.location.reload();
}

// event listeners for searches
$('#clear-history').click(clearHistory);
$(document).on("click", usePastCity);
$('#search-btn').click(searchHandler);
init ();