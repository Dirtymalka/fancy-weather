import { WEEK_DAYS } from './constants';

const createWeatherTodayContent = (data) => {
  const container = document.querySelector('.weather__data_weather-info');
  container.innerHTML = '';
  const content = `
  <p>${data.description}</p>
  <p>Feels Like: ${data.feelsTemperature}°</p>
  <p>Wind: ${data.wind} m/s</p>
  <p>Humidity: ${data.humidity}%</p>`;
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


export { createWeatherTodayContent, createWeatherFeatureContent };
