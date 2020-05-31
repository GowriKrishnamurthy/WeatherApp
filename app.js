import * as ELEMENTS from 'elements.js';
import { Http } from 'http.js';
import { WeatherData, WeatherProxyHandler } from 'weather-data.js';

const AppID = ''; //unique App id

ELEMENTS.ELEMENT_SEARCH_BUTTON.addEventListener('click', getCityWeather);

function getCityWeather() {
    const cityName = ELEMENTS.ELEMENT_SEARCH_CITY.value.trim();
    if (cityName.length == 0) {
        return alert('Please enter a city name');
    }
    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'block';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'none';
    
    const Url = 'http://api.openweathermap.org/data/2.5/weather?q=' + cityName + '&units=metric&appid=' + AppID;
    Http.fetchData(Url)
        .then(responseData => {
            const weatherData = new WeatherData(cityName, responseData.weather[0].description.toUpperCase());
            const weatherProxy = new Proxy(weatherData, WeatherProxyHandler);
            weatherProxy.temperature = responseData.main.temp;
            DisplayCityWeather(weatherProxy);
        })  
        .catch(() => console.log("Can’t access " + Url + " response. Access denied?"))
}

function DisplayCityWeather(weatherData) {
    console.log(weatherData);
    ELEMENTS.ELEMENT_WEATHER_CITY.textContent = weatherData.cityName;
    ELEMENTS.ELEMENT_WEATHER_DESCRIPTION.textContent = weatherData.description;
    ELEMENTS.ELEMENT_WEATHER_TEMPERATURE.textContent = weatherData.temperature;

    ELEMENTS.ELEMENT_LOADING_TEXT.style.display = 'none';
    ELEMENTS.ELEMENT_WEATHER_BOX.style.display = 'block';
}