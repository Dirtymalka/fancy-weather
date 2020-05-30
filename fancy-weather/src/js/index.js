import '../css/style.css';
import '../css/style.scss';


import * as constants from '../modules/constants';
import { getWeatherOnThreeDays, getWeatherToday } from '../modules/weather';
import { getDateNow, time } from '../modules/date';

import { addMapWithGeolocation, getGeoPosition, getContent, createMap } from '../modules/map';

import { getBackgroundImage } from '../modules/background';

import { changeTemperatureUnits } from '../modules/changeOfUnits';

import { changeLanguage } from '../modules/changingLang';


getGeoPosition();

// getBackgroundImage('минск');

getDateNow();


setInterval(time, 1000);

document.querySelector('.search-form').onsubmit = (ev) => {
  ev.preventDefault();
  getGeoPosition();
};

document.querySelector('.buttons-temperature-container').onclick = changeTemperatureUnits;

document.querySelector('.button_bg').onclick = () => getBackgroundImage();

document.querySelector('.buttons-language').onclick = changeLanguage;
