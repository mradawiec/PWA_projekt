const input = document.querySelector('input');
const button = document.querySelector('button');
const date = document.querySelector('p');
const city_name = document.querySelector('.city_name')
const errorMessage = document.querySelector('.error');
const img = document.querySelector('img');
const temperature = document.querySelector('.temperature');
const temperature_description = document.querySelector('.temperature_description');
const feels_like = document.querySelector('.feels_like');
const pressure = document.querySelector('.pressure');
const humidity = document.querySelector('.humidity');
const wind_speed = document.querySelector('.wind_speed');
const clouds = document.querySelector('.clouds');

const apiLink = "https://api.openweathermap.org/data/2.5/weather?q=";
const apiKey = '&appid=97554d47bf0076771c676b208501829c';
const apiUnits = '&units=metric';
const apiLang = '&lang=pl';

function getWeather() {
    const apiCity = input.value;
    const URL = apiLink + apiCity + apiKey + apiUnits + apiLang;

    axios.get(URL).then(response => {
        console.log(response.data);
        city_name.textContent = `${response.data.name}, ${response.data.sys.country}`;
        clouds.textContent = `${response.data.clouds.all} %`;
        wind_speed.textContent = `${response.data.wind.speed} m/s`;
        temperature_description.textContent = `${response.data.weather[0].description}`;
        humidity.textContent = `${response.data.clouds.all}%`;
        feels_like.textContent = `${Math.round(response.data.main.feels_like)} C`;
        pressure.textContent = `${response.data.main.pressure} hPa`;
        img.src = `http://openweathermap.org/img/wn/${response.data.weather[0].icon}.png`;
        errorMessage.textContent = '';

    }).catch(error => {
        console.log(error);
        if (error.response.data.cod !== '200') {
            errorMessage.textContent = `${error.response.data.message}`
        }
        [clouds, wind_speed, humidity, pressure, city_name, temperature, temperature_description, feels_like].forEach(el => {
            el.textContent = '';
        })
        img.src = '';
    }).finally(() => {
        input.value = '';
    })
}

function getWeatherByEnter(e) {
    if (e.key == 'Enter') {
        getWeather();
    }
}

input.addEventListener('keyup', getWeatherByEnter);
button.addEventListener('click', getWeather);