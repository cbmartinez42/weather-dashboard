
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
                console.log(data.main.temp)
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
                const today = new Date()
                const tomorrow = new Date(today)
                tomorrow.setDate(tomorrow.getDate() + 1)
            // console.log(data);
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
            // console.log(temp)
            const value = temp.pop();   // need to hardcode for the 5th 
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

let displayWeather = function (data) {
    const temporaryDiv = $('#temporaryid');
    console.log('displayWeather activated');
    const currentWeatherContainer = $('#currWeatherContainer');
    const city = data.name


    let currentWeatherBody = $('<div>')
        .addClass('card-body')
        .attr('style', 'background-image: url(http://placekitten.com/290/250)')
        .html(`<h5 class="card-title">${city}</h5>`)
        .html(`<h4 class="card-subtitletitle">${city}</h5>`);   
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
    console.log(value)


}

  $('#search-btn').click(searchHandler);
}
init()