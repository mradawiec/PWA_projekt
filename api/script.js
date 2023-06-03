const input = document.querySelector('input');
const button = document.querySelector('button');
const date = document.querySelector('p');
const min = document.querySelector('.min');
const sunriseTime = document.querySelector('.sunrise');
const sunsetTime = document.querySelector('.sunset')
const city_name = document.querySelector('.city_name');
const errorMessage = document.querySelector('.app_top .error');
const img = document.querySelector('.zdj');
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
        const sunriseTimestamp = response.data.sys.sunrise;
        const sunriseDate = new Date(sunriseTimestamp * 1000);
        const sunriseFormatted = sunriseDate.toLocaleTimeString('pl-PL');
        sunriseTime.textContent = 'Wschód: ' + sunriseFormatted;
        const sunsetTimestamp = response.data.sys.sunset;
        const sunsetDate = new Date(sunsetTimestamp * 1000);
        const sunsetFormatted = sunsetDate.toLocaleTimeString('pl-PL');
        sunsetTime.textContent = 'Zachód: ' + sunsetFormatted;
        city_name.textContent = `${response.data.name}, ${response.data.sys.country}`;
        min.textContent = `${Math.round(response.data.main.temp_min)} °C / ${Math.round(response.data.main.temp_max)} °C`;
        clouds.textContent = `Zachmurzenie: ${response.data.clouds.all} %`;
        wind_speed.textContent = `Wiatr: ${response.data.wind.speed} m/s`;
        temperature_description.textContent = `Teraz: ${response.data.weather[0].description}`;
        humidity.textContent = `Wilgotność: ${response.data.clouds.all} %`;
        feels_like.textContent = `${Math.round(response.data.main.feels_like)} °C`;
        pressure.textContent = `Ciśnienie: ${response.data.main.pressure} hPa`;
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