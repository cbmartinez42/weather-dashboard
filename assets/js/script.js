
function init() {

// function createHistory() {
//     let histContainer = $('<div>')
//         .addClass('container history');
//     let histRow = $('<div>')
//         .addClass('row');
//     histContainer.append(histRow);
//     let histSidebar = $('<div>')
//         .addClass('sideBar');
//     histRow.append(histSidebar);
//     let histInput = $('<div>')
//         .addClass('input-group mb3 input-group-prepend');
//     histSidebar.append(histInput);
//     let searchInput = $('<input>')
//         $(searchInput).attr({
//             'type': 'text',
//             'id': 'search-input',
//             'placeholder': 'Phoenix',
//             'class': 'form-control search-input',
//             'aria-label': 'Default',
//             'aria-describedby': 'inputGroup-sizing-default'
//         })
//     histInput.append(searchInput);
//     let searchBtn = $('<button>')
//         .html('<i class="fas fa-search-location"></i>')
//         $(searchBtn).attr({
//             'class': 'btn btn-outline-secondary',
//             'type': 'button',
//             'id': 'search-btn'
//         })
//     $('.jumbotron').append(histContainer)
// }



// createHistory();

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
                console.log(response.data.main.temp)
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
    console.log('displayWeather activated');
    let currentWeatherContainer = $('<div>')
        .addClass('container card-container');
    let currWeatherRow = $('<div>')
        .addClass('row');
    currentWeatherContainer.append(currWeatherRow);
    let currWeatherCol = $('<div>')
        .addClass('col-10');
    currWeatherRow.append(currWeatherCol);
    let currWeatherCard = $('<div>')
        .addClass('card');
    currWeatherCol.append(currWeatherCard);
    let currentWeatherBody = $('<div>')
        .addClass('card-body')
        .attr('style', 'background-image: url(http://placekitten.com/290/250)');
    currWeatherCard.append(currentWeatherBody);

}

let displayFiveDay = function() {
    console.log('displayFiveDay activated')
}

  $('#search-btn').click(searchHandler);
}
init()