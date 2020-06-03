import '../css/style.css';
import swiper from '../modules/slider';
import Keyboard from '../modules/virtual-keyboard';
import * as constants from '../modules/constants';
import { getMovieCards, endSliderHandler } from '../modules/movie-cards';
import searchHandler from '../modules/search';
import { addMicrophoneHandler, recognition, addSpeakHandler } from '../modules/speak-search';

document.addEventListener("DOMContentLoaded", () => {
  localStorage.setItem(constants.FILM_NAME, constants.DEFAULT_FILM_NAME);
  localStorage.setItem(constants.PAGE_NUMBER, constants.DEFAULT_PAGE);
  getMovieCards(constants.DEFAULT_FILM_NAME, constants.DEFAULT_PAGE);

  const keyboard = new Keyboard();
  keyboard.createKeyboardContainer();
  keyboard.init();
  document.querySelector('.keyboard').onclick = keyboard.addClassActive;

  document.querySelector('.search-button').onclick = searchHandler;

  document.querySelector('.micro').onclick = addMicrophoneHandler;
  recognition.onresult = addSpeakHandler;

  constants.CLEAR_BUTTON.onclick = () => {
    constants.INPUT_SEARCH.value = '';
  }

  swiper.init();
  swiper.on('slideChange', endSliderHandler);
});
