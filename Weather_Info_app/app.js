const apiKey = '1dd29ab5edbc18b52136cc1e4bcf14b4'; 

function getWeather(event) {
    event.preventDefault();
    
    const city = document.getElementById('city').value;
    if (!city) {
        displayMessage('City name is required.');
        return;
    }

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);
            }
            displayWeather(data);
            storeCity(city);
            loadPreviousCities();
        })
        .catch(error => displayMessage(error.message));
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weatherInfo');
    weatherInfo.innerHTML = `
        <h3>Weather in ${data.name}</h3>
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
    `;
}

function displayMessage(message) {
    const messageDiv = document.getElementById('message');
    messageDiv.textContent = message;
}

function storeCity(city) {
    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    if (!cities.includes(city)) {
        cities.push(city);
        localStorage.setItem('cities', JSON.stringify(cities));
    }
}

function loadPreviousCities() {
    const previousCities = document.getElementById('previousCities');
    previousCities.innerHTML = '';

    const cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.forEach(city => {
        const li = document.createElement('li');
        li.textContent = city;
        li.onclick = () => {
            document.getElementById('city').value = city;
            getWeather(new Event('submit'));
        };
        previousCities.appendChild(li);
    });
}

// Event handlers
document.getElementById('city').onchange = () => displayMessage('');
document.getElementById('city').onmouseover = () => displayMessage('Enter the city name to get weather info.');
document.getElementById('city').onmouseout = () => displayMessage('');
