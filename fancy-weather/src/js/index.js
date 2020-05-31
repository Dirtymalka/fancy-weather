import '../css/style.css';
import '../css/style.scss';


import { KEY_LANGUAGE, DEFAULT_LANGUAGE } from '../modules/constants';
import { getDateNow, time } from '../modules/date';

import { getGeoPosition } from '../modules/map';

import { getBackgroundImage } from '../modules/background';

import { changeTemperatureUnits } from '../modules/changeOfUnits';

import { changeLanguage, chooseActiveLanguage } from '../modules/changingLang';

import { addMicrophoneHandler, recognition, addSpeakHandler } from '../modules/speack-search';

getGeoPosition();

getDateNow();


setInterval(time, 1000);

document.querySelector('.search-form').onsubmit = (ev) => {
  ev.preventDefault();
  getGeoPosition();
};

document.querySelector('.button-voice').onclick = addMicrophoneHandler;
recognition.onresult = addSpeakHandler;

chooseActiveLanguage();

document.querySelector('.buttons-temperature-container').onclick = changeTemperatureUnits;

document.querySelector('.button_bg').onclick = () => getBackgroundImage();

document.querySelector('.buttons-language').onclick = changeLanguage;

if (!localStorage.getItem(KEY_LANGUAGE)) {
  localStorage.setItem(KEY_LANGUAGE, DEFAULT_LANGUAGE);
}
