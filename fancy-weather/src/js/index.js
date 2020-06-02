import '../css/style.scss';
import { KEY_LANGUAGE, DEFAULT_LANGUAGE } from '../modules/constants';
import { getGeoPosition } from '../modules/map';
import getBackgroundImage from '../modules/background';
import { changeTemperatureUnits, chooseActiveUnit } from '../modules/changeOfUnits';
import { changeLanguage, chooseActiveLanguage } from '../modules/changingLang';
import { addMicrophoneHandler, recognition, addSpeakHandler } from '../modules/speak-search';
import { addLoader } from '../modules/loader';
import speakerHandler from '../modules/speaker';
import Keyboard from '../modules/keyBoard';

document.addEventListener("DOMContentLoaded", () => {
  getGeoPosition();

  const keyboard = new Keyboard();
  keyboard.createKeyboardContainer();
  keyboard.init();
  document.querySelector('.keyboard').onclick = keyboard.addClassActive;

  document.querySelector('.search-form').onsubmit = (ev) => {
    ev.preventDefault();
    document.querySelector('.keyboard').onclick = keyboard.addClassActive;
    getGeoPosition();
  };

  document.querySelector('.button-voice').onclick = addMicrophoneHandler;
  recognition.onresult = addSpeakHandler;

  chooseActiveLanguage();
  chooseActiveUnit();

  document.querySelector('.buttons-temperature-container').onclick = changeTemperatureUnits;

  document.querySelector('.button_bg').onclick = () => {
    document.querySelector('.spinner').classList.add('anim');
    setTimeout(() => document.querySelector('.spinner').classList.remove('anim'), 1000);
    addLoader();
    getBackgroundImage();
  }

  document.querySelector('.buttons-language').onclick = changeLanguage;

  if (!localStorage.getItem(KEY_LANGUAGE)) {
    localStorage.setItem(KEY_LANGUAGE, DEFAULT_LANGUAGE);
  }

  document.querySelector('.speaker').onclick = speakerHandler;
});
