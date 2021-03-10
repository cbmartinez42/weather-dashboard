function init() {

let searchInputEl = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');



let searchHandler = function (event){
    event.preventDefault();
    console.log('button clicked!');
    let city = searchInputEl.value.trim();

    if (city) {
        getCurrentWeather(city);
        getFiveDay(city);
        searchInputEl.textContent = '';
        // nameInputEl.value = '';
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
                displayWeather(data, city);
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
            console.log(data);
            displayFiveDay(data, city);
            });
        } else {
            alert('Error: ' + response.statusText);
        }
        })
        .catch(function (error) {
            alert('Unable to connect to Weather Database');
        });
};

let displayWeather = function () {
    console.log('displayWeather activated')
}

let displayFiveDay = function() {
    console.log('displayFiveDay activated')
}

  searchBtn.addEventListener('click', searchHandler)
}
init()