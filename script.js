const apiKey = '587f428ee99bf5975d2c281b0f41b4b5'; 
const cityInput = document.getElementById('city-input');
const fetchButton = document.getElementById('fetch-button');
const cityName = document.getElementById('city-name');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const errorMessage = document.getElementById('error-message');
const slide = document.querySelector('.slide');

let currentSlideIndex = 0;


function displayWeatherData(data) {
    if (data.error) {
        errorMessage.textContent = `Error: ${data.error.info}`;
        slide.classList.remove('active'); 
        return;
    }

    errorMessage.textContent = '';
    cityName.textContent = data.location.name + ', ' + data.location.country;
    weatherIcon.src = data.current.weather_icons[0];
    temperature.textContent = `Temperature: ${data.current.temperature}°C`;
    description.textContent = `Description: ${data.current.weather_descriptions[0]}`;
    humidity.textContent = `Humidity: ${data.current.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.current.wind_speed} km/h`;

     slide.classList.add('active');
}



async function fetchWeatherData(city) {
    const url = `https://api.weatherstack.com/current?access_key=${apiKey}&query=${city}&units=m`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayWeatherData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        errorMessage.textContent = 'Failed to fetch weather data. Please try again later.';
         slide.classList.remove('active');
    }
}


fetchButton.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeatherData(city);
    } else {
        errorMessage.textContent = 'Please enter a city name.';
         slide.classList.remove('active');
    }
});

cityInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        fetchButton.click();
    }
});

fetchWeatherData('Manhattan');
