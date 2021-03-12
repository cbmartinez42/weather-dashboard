function init() {

let searchInputEl = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');
let today = moment().format('dddd, MMM Do, YYYY');
console.log(today);

let searchHandler = function (event){
    event.preventDefault();
    let city = searchInputEl.value.trim();

    if (city) {
        getCurrentWeather(city);
        getFiveDay(city);
      } else {
        alert('Please enter a city');
      }
}

let getCurrentWeather = function (city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial&appid=3cbac659165d03c7a5a56ef38b21d47f';
  
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                console.log(data);
                displayWeather(data); // data, city
                // console.log(response.data.weather[0].icon);
            });
            } else {
            alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Database');
        });
 
  };

let getFiveDay = function (city) {
    let apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&units=imperial&appid=3cbac659165d03c7a5a56ef38b21d47f';

    fetch(apiUrl)
        .then(function (response) {
        if (response.ok) {
            console.log(response);
            response.json().then(function (data) {
                const today = new Date()
                const tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)
            console.log(data);
            const temp = []
            for (const node of data.list){
                const date = node.dt_txt.substring(0,10)
                const formattedDate = tomorrow.toISOString().substring(0,10)
                // console.log(date);
                // console.log(formattedDate);
                if (date == formattedDate) {
                    temp.push(node)
                }  
            }
            console.log(temp)
            const value = temp.pop();   // need to hardcode for the 6th index
            displayFiveDay(value);
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
    const currentWeatherContainer = $('#currWeatherContainer');
    const cityNm = data.name;
    const temp = data.main.temp + '°';
    const icon = data.weather[0].icon;
    const humidity = data.main.humidity + '%';
    const windSpeed = data.wind.speed;

    let currentWeatherBody = $('<div>')
        .addClass('card-body')
        .html(`<h4 class="card-title">${cityNm}</h4><h5>${today}</h5> 
        <h4><img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="Weather Image"></h4>
        <h5 class="card-subtitle mb-2">Temperature: ${temp}</h5>
        <p id='currHumidity'>Humidity: ${humidity}</p>
        <p id='wind'>Wind Speed: ${windSpeed}MPH</p>
        <p id='uvIndex'>UV Index: ${humidity}</p>`);   // <---- need to figure this out
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

let displayFiveDay = function(value) {
    console.log(value);
    const fiveDayContainer = $('.five-day-cards');
    const temp = data.main.temp + '°';
    const humidity = data.main.humidity + '%';

    let fiveDayBody = $('<div>')
        .addClass('card-body')
        .html(`<h5 class="card-title">Temperature: ${temp} <img src="http://placekitten.com/30/30" alt="Weather Image"></h5>
        <h6 class="card-subtitle">${temp}</h6>
        <p>Humidity: ${humidity}</p>`)
    let fiveDayCard = $('<div>')
        .addClass('card');
    let fiveDayCol = $('div')
        addClass('col-2');
    fiveDayCard.append(fiveDayBody);
    fiveDayCol.append(fiveDayCard);
    fiveDayContainer.append(fiveDayCol);
}

  $('#search-btn').click(searchHandler);
}
init()