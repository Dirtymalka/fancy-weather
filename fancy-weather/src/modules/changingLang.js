/* eslint no-param-reassign: "error" */
/* eslint prefer-destructuring: ["error", {VariableDeclarator: {object: true}}] */

import { MONTH_INDEX, DAY_INDEX, KEY_LANGUAGE, WEATHER_CODE, DEFAULT_LANGUAGE } from './constants';
import { translationDays, dictionary } from './dictionary';

const translateCity = async (city, lang) => {
  const url = `https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20200503T122912Z.00d59eb838b518b4.adec26279b03b0ca53aad2d5c048461dcc45df83&text=${city}&lang=${lang}`;
  const response = await fetch(url);
  const result = await response.json();
  document.querySelector('.weather__data_location').textContent = result.text[0];
}

const translate = (data, lang) => {
  const city = document.querySelector('.weather__data_location').textContent;
  document.querySelector('.day-of-week').textContent = data[lang].days[localStorage.getItem(DAY_INDEX)];
  document.querySelector('.month').textContent = data[lang].months[localStorage.getItem(MONTH_INDEX)];
  document.querySelector('.header__search-button').textContent = data[lang].staticInfo.search;
  document.querySelector('.header__search-input').setAttribute('placeholder', data[lang].staticInfo.placeholder);
  document.querySelector('.lat').textContent = data[lang].staticInfo.coordinates.lat;
  document.querySelector('.log').textContent = data[lang].staticInfo.coordinates.log;
  document.querySelector('.feels-like-text').textContent = data[lang].staticInfo.weatherInfo.feelsLike;
  document.querySelector('.wind-text').textContent = data[lang].staticInfo.weatherInfo.wind;
  document.querySelector('.humidity-text').textContent = data[lang].staticInfo.weatherInfo.humidity;
  document.querySelector('.weather-description').textContent = data[lang].descriptionWeather[localStorage.getItem(WEATHER_CODE)];
  translateCity(city, lang);
  document.querySelectorAll('.feature-day_day').forEach((dayWeek) => {
    const day = dayWeek.textContent.toLowerCase();
    const language = lang.toLowerCase();
    const prevLangDay = translationDays[day][language];
    dayWeek.textContent = prevLangDay;
  });
}

const chooseActiveLanguage = () => {
  const language = localStorage.getItem(KEY_LANGUAGE) || DEFAULT_LANGUAGE;
  document.querySelectorAll('.language-button').forEach((button) => {
    if (button.textContent.toLowerCase() === language) {
      button.classList.add('active');
    }
  })
}

const changeLanguage = (e) => {
  const choseLanguage = e.target.textContent.toLowerCase();
  if (e.target.classList.contains('active')) {
    return;
  }
  document.querySelectorAll('.language-button').forEach((button) => {
    button.classList.remove('active');
  });
  e.target.classList.add('active');
  localStorage.setItem(KEY_LANGUAGE, choseLanguage);
  translate(dictionary, choseLanguage);
}

export { changeLanguage, chooseActiveLanguage };
