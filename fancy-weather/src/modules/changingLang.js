import { daysOfWeekEn, daysOfWeekRu, daysOfWeekBe, monthsEn, monthsRu, monthsBe, monthIndex, dayIndex } from './constants';

import { engDictionary, rusDictionary, belDictionary } from './dictionary';


const changeLanguage = (e) => {
  console.log(e.target);
  if (e.target.classList.contains('active')) {
    return;
  }

  document.querySelectorAll('.language-button').forEach((button) => {
    button.classList.remove('active');
  });

  e.target.classList.add('active');

  if (e.target.classList.contains('language-button_ru')) {
    translate(monthsRu, daysOfWeekRu, rusDictionary);
  }

  if (e.target.classList.contains('language-button_en')) {
    translate(monthsEn, daysOfWeekEn, engDictionary);
  }

  if (e.target.classList.contains('language-button_be')) {
    translate(monthsBe, daysOfWeekBe, belDictionary);
  }
}



const translate = (month, day, data) => {
  document.querySelector('.day-of-week').textContent = day[localStorage.getItem(dayIndex)];
  document.querySelector('.month').textContent = month[localStorage.getItem(monthIndex)];
  document.querySelector('.header__search-button').textContent = data.search;
  document.querySelector('.header__search-input').setAttribute('placeholder', data.placeholder);
  document.querySelector('.lat').textContent = data.coordinates.lat;
  document.querySelector('.log').textContent = data.coordinates.log;
  document.querySelector('.feels-like-text').textContent = data.weatherInfo.feelsLike;
  document.querySelector('.wind-text').textContent = data.weatherInfo.wind;
  document.querySelector('.humidity-text').textContent = data.weatherInfo.humidity;
}




export { changeLanguage };
