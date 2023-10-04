const searchBox = document.querySelector('.search input');
const searchButton = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');

const apiKey = "e40886de5afb093260197f1cf450e84d";

let apiUrl = '';
let city = JSON.parse(localStorage.getItem('city')) || [];

searchButton.addEventListener('click', () => {
  city = searchBox.value;
  localStorage.setItem('city', JSON.stringify(city));

  checkWeather(city);
  searchBox.value = '';
});

searchBox.addEventListener('keyup', (event) => {
  if (event.key === 'Enter'){
    city = searchBox.value;
    localStorage.setItem('city', JSON.stringify(city));

    checkWeather(city);
    searchBox.value = '';
  }
});

checkWeather(city);

async function checkWeather(city){
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  const response = await fetch(apiUrl);
  let data = await response.json(apiUrl);

  if(response.status === 404){
    document.querySelector(".error").style.display = 'block';
    document.querySelector(".weather").style.display = 'none';
  }
  else{
    document.querySelector(".error").style.display = 'none';document.querySelector(".weather").style.display = 'block';
    
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temperature').innerHTML = Math.round(data.main.temp) + '°C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + 'km/h';

    if(data.weather[0].main === 'Clear'){
      weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main === 'Clouds'){
      weatherIcon.src = "images/clouds.png";
    }
    else if(data.weather[0].main === 'Drizzle'){
      weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main === 'Mist'){
      weatherIcon.src = "images/mist.png";
    }
    else if(data.weather[0].main === 'Snow'){
      weatherIcon.src = "images/snow.png";
    }
  }
}