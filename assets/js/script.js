let searchInputEl = document.getElementById('search-input');
let searchBtn = document.getElementById('search-btn');

let searchHandler = function (event){
    event.preventDefault();
    console.log('button clicked!');
}


searchBtn.addEventListener('click', searchHandler)