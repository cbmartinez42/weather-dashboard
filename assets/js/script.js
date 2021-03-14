let searchHandler = function (event){
    event.preventDefault();
    let city = searchInputEl.value.trim();
    if (city) {
        
        getLatLon(city);
        // getFiveDay(city);
      } else {
        alert('Please enter a city');
      }
}

// function init() {

let searchInputEl = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
let today = moment().format('dddd, MMM Do, YYYY');
console.log(today);
// let cityValue = searchInputEl.value.trim();
// console.log(cityValue);



let getLatLon = function (city) {
    
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=3cbac659165d03c7a5a56ef38b21d47f';
  
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {

                console.log(data);
                // const city = data.name;
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
    let currentWeatherBody = $('<div>')
        // .attr('id)
        .addClass('card-body current-weather-body')
        .html(`<h4 class="card-title">${city}</h4>`);
    let currWeatherCard = $('<div>')
        .addClass('card');
    let currWeatherCol = $('<div>')
        .addClass('col-10');
    let currWeatherRow = $('<div>')
        .addClass('row');
    currWeatherCard.append(currentWeatherBody);
    currWeatherCol.append(currWeatherCard);
    currWeatherRow.append(currWeatherCol);
    currentWeatherContainer.append(currWeatherRow);
}

function handleOneCall(data){
    const cityNm = data.name;
    const lat = data.coord.lat;
    const lon = data.coord.lon;
    console.log(lat);
    console.log(lon);
    let oneCallUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=hourly,minutely,alerts&appid=3cbac659165d03c7a5a56ef38b21d47f';
    fetch(oneCallUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                const city = cityNm

                console.log(data);
                displayWeather(data); // data, city
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
    <p id='uvIndex'>UV Index: ${uvIndex}</p>`).appendTo('.current-weather-body')
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
    console.log(icon)

    let fiveDayBody = $('<div>')
        .addClass('card-body')
        .html(`<h5 class="card-title">${date}</h5>
        <h6><img src="https://openweathermap.org/img/wn/${icon}.png" alt="Weather Image"></h6>
        <h6 class="card-subtitle">${temp}</h6>
        <p>Humidity: ${humidity}</p>`)
    let fiveDayCard = $('<div>')
        .addClass('card');
    let fiveDayCol = $('<div>')
        .addClass('col-2');
    fiveDayCard.append(fiveDayBody);
    fiveDayCol.append(fiveDayCard);
    fiveDayRow.append(fiveDayCol)
    console.log('line 137')
    }
    // rowContainer.append(fiveDayCol)
}

$('#search-btn').click(searchHandler);
// }
// init()