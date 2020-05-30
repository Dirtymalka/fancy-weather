import { WEEK_DAYS } from './constants';

const createTitle = (country) => {
  const container = document.querySelector('.weather__data_location');
  container.textContent = country;
}

const createWeatherTodayContent = (data) => {
  const container = document.querySelector('.weather__data_weather-info');
  container.innerHTML = '';
  const content = `
  <p>${data.description}</p>
  <p><span class="feels-like-text">Feels Like</span>: <span class="feels-like-temperature">${data.feelsTemperature}</span>°</p>
  <p><span class="wind-text">Wind</span>: ${data.wind} m/s</p>
  <p><span class="humidity-text">Humidity</span>: ${data.humidity}%</p>`;
  document.querySelector('.weather__data_temperature-today').textContent = data.temperature;
  container.insertAdjacentHTML('beforeend', content);
}

const createWeatherFeatureContent = (data) => {
  const container = document.querySelector('.weather_three-days');
  container.innerHTML = '';
  const dayToday = document.querySelector('.date').textContent.slice(0, 3);
  const week = Object.keys(WEEK_DAYS);
  let indexDay = week.indexOf(dayToday);

  data.forEach((day) => {
    let index;
    if (indexDay + 1 > 6) {
      index = 0;
    } else {
      index = indexDay + 1;
    }
    const dayWeek = WEEK_DAYS[week[index]];
    indexDay = index;
    const content = `
<div class="feature-day">
  <p class="feature-day_day">${dayWeek}</p>
  <p class="feature-temperature">${day.temperature}</p>
  <img src="./img/t.svg" alt="" class="feature-day_icon">
</div>`;
  container.insertAdjacentHTML('beforeend', content);
  });
}

const createCoordinates = (latitude, longitude) => {
  const containerMap = document.querySelector('.coordinates');
  containerMap.innerHTML = '';
  const newLatitude = latitude.toString().split(".")[0];
  const newlongitude = longitude.toString().split(".")[0];
  const minutesOfLatitude = getMinutesFromDegree(latitude);
  const minutesOfLongitude = getMinutesFromDegree(longitude);
  const content = `
  <div class="map-block_latitude coordinates"><span class="lat">latitude</span>: ${newLatitude}° ${minutesOfLatitude}'</div>
  <div class="map-block_longitude coordinates"><span class="log">longitude</span>: ${newlongitude}° ${minutesOfLongitude}'</div>`;
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
