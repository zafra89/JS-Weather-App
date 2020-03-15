const searchBar = document.getElementById('search-bar');
const searchBarContainer = document.getElementById('search-bar-container');
const searchBtn = document.getElementById('search-btn');
const cityContainer = document.getElementById('city-container');
const temperatureContainer = document.getElementById('temperature-container');
const weatherContainer = document.getElementById('weather-container');
const backBtn = document.getElementById('back-btn');
const cityInfo = document.createElement('div');
const temperatureInfo = document.createElement('div');
const weatherInfo = document.createElement('div');
const api = {
    base: 'http://api.openweathermap.org/data/2.5/',
    key: '0c0d5435efdaac81506fa1b25201c82e'
}

document.addEventListener('DOMContentLoaded', function() {
    eventListeners();
});

function eventListeners() {
    searchBtn.addEventListener('click', () => {
        searchCityWeather();
    });

    backBtn.addEventListener('click', () => {
        backFunction();
    })
}

function searchCityWeather() {
    if (searchBar.value.length > 0) {
        fetch(`${api.base}weather?q=${searchBar.value}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(function(data) {
            cityInfo.innerHTML = `<p id='city-name'>${data.name}, ${data.sys.country}</p>`;
            cityContainer.appendChild(cityInfo);

            temperatureInfo.innerHTML = `<p id='city-temperature'>${Math.round(data.main.temp)}º</p>`;
            temperatureContainer.appendChild(temperatureInfo);

            weatherInfo.innerHTML = `<p id='city-weather'>${data.weather[0].main}</p>`;
            weatherContainer.appendChild(weatherInfo);
        });
    backBtn.classList.remove('hide');
    searchBarContainer.classList.add('hide');
    }
}

function backFunction() {
    searchBar.value = '';
    cityContainer.removeChild(cityInfo);
    temperatureContainer.removeChild(temperatureInfo);
    weatherContainer.removeChild(weatherInfo);
    backBtn.classList.add('hide');
    searchBarContainer.classList.remove('hide');
}