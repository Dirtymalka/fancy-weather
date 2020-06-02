/* eslint no-param-reassign: "error" */

import { TEMPERATURE_UNIT_NAME, TEMPERATURE_UNIT_CELSIUS, TEMPERATURE_UNIT_FAHRENHEIT } from './constants';

const changeCelsiusOnFahrenheit = (num) => {
  return Math.round(num * 9 / 5) + 32;
}

const changeCelsiusOnCelsius = (num) => {
  return Math.round(5 / 9 * (num - 32));
}

const changeTemperatureUnits = (e) => {
  const mainTemp = document.querySelector('.weather__data_temperature-today');
  const feelsLikeTemp = document.querySelector('.feels-like-temperature');
  const futureTemp = document.querySelectorAll('.feature-temperature');
  const allTemperatures = [mainTemp, feelsLikeTemp];
  futureTemp.forEach((temp) => allTemperatures.push(temp));

  if (e.target.classList.contains('active')) {
    return;
  }
  if (e.target.classList.contains('temperature-button_fahrenheit')) {
    document.querySelector('.temperature-button_fahrenheit').classList.add('active');
    document.querySelector('.temperature-button_celsius').classList.remove('active');
    allTemperatures.forEach((temp) => {
      temp.textContent = changeCelsiusOnFahrenheit(temp.textContent)
    });
    localStorage.setItem(TEMPERATURE_UNIT_NAME, TEMPERATURE_UNIT_FAHRENHEIT);
  }
  if (e.target.classList.contains('temperature-button_celsius')) {
    document.querySelector('.temperature-button_celsius').classList.add('active');
    document.querySelector('.temperature-button_fahrenheit').classList.remove('active');
    allTemperatures.forEach((temp) => {
      temp.textContent = changeCelsiusOnCelsius(temp.textContent)
    });
    localStorage.setItem(TEMPERATURE_UNIT_NAME, TEMPERATURE_UNIT_CELSIUS);
  }
}

const chooseActiveUnit = () => {
  if (localStorage.getItem(TEMPERATURE_UNIT_NAME) === 'fahrenheit') {
    document.querySelector('.temperature-button_fahrenheit').classList.add('active');
    return;
  }
  document.querySelector('.temperature-button_celsius').classList.add('active');
}


export { changeTemperatureUnits, chooseActiveUnit };
