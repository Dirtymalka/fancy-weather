import { KEY_LANGUAGE, dayIndex } from './constants';
import { dictionary } from './dictionary';

const createTitle = (country) => {
  const container = document.querySelector('.weather__data_location');
  container.textContent = country;
}

const createWeatherTodayContent = (data) => {
  console.log(data)
  const language = localStorage.getItem(KEY_LANGUAGE) || 'en';
  const containerForInfo = document.querySelector('.weather__data_weather-info');
  const containerForIcon = document.querySelector('.weather__data_weather-icon');
  containerForIcon.innerHTML = '';
  containerForInfo.innerHTML = '';
  const content = `
  <p class="weather-description">${data.description}</p>
  <p><span class="feels-like-text">${dictionary[language].staticInfo.weatherInfo.feelsLike}</span>: <span class="feels-like-temperature">${data.feelsTemperature}</span>°</p>
  <p><span class="wind-text">${dictionary[language].staticInfo.weatherInfo.wind}</span>: ${data.wind} m/s</p>
  <p><span class="humidity-text">${dictionary[language].staticInfo.weatherInfo.humidity}</span>: ${data.humidity}%</p>`;
  document.querySelector('.weather__data_temperature-today').textContent = data.temperature;
  const icon = `<img src="https://www.weatherbit.io/static/img/icons/${data.icon}.png" alt="">`
  containerForIcon.insertAdjacentHTML('beforeend', icon);
  containerForInfo.insertAdjacentHTML('beforeend', content);
}

const createWeatherFeatureContent = (data) => {
  const language = localStorage.getItem(KEY_LANGUAGE) || 'en';
  const container = document.querySelector('.weather_three-days');
  container.innerHTML = '';

  let index = +localStorage.getItem(dayIndex) + 1;
  data.forEach((day) => {
    const dayWeek = dictionary[language].weekDays[index];
    index += 1;
    const content = `
<div class="feature-day">
  <p class="feature-day_day">${dayWeek}</p>
  <p class="feature-temperature">${day.temperature}</p>
  <img src="https://www.weatherbit.io/static/img/icons/${day.icon}.png" alt="" class="feature-day_icon">
</div>`;
  container.insertAdjacentHTML('beforeend', content);
  });
}

const createCoordinates = (latitude, longitude) => {
  const language = localStorage.getItem(KEY_LANGUAGE) || 'en';
  const containerMap = document.querySelector('.coordinates');
  containerMap.innerHTML = '';
  const newLatitude = latitude.toString().split(".")[0];
  const newlongitude = longitude.toString().split(".")[0];
  const minutesOfLatitude = getMinutesFromDegree(latitude);
  const minutesOfLongitude = getMinutesFromDegree(longitude);
  const content = `
  <div class="map-block_latitude coordinates"><span class="lat">${dictionary[language].staticInfo.coordinates.lat}</span>: ${newLatitude}° ${minutesOfLatitude}'</div>
  <div class="map-block_longitude coordinates"><span class="log">${dictionary[language].staticInfo.coordinates.log}</span>: ${newlongitude}° ${minutesOfLongitude}'</div>`;
  containerMap.insertAdjacentHTML('beforeend', content);
}

const getMinutesFromDegree = (number) => {
  const degree = number.toString().split(".")[1].substr(0,3);
  const fractionalDegree = parseFloat(`0.${degree}`);
  const minutes = fractionalDegree * 60;
  return minutes.toString().split(".")[0];
}

const createDate = (dayOfWeak, day, month) => {
  const content = `
  <span class="day-of-week">${dayOfWeak}</span>
  <span class="day">${day}</span>
  <span class="month">${month}</span>`;
  document.querySelector('.date').insertAdjacentHTML('afterbegin', content);
}

export { createWeatherTodayContent, createWeatherFeatureContent, createCoordinates, createTitle, createDate };
