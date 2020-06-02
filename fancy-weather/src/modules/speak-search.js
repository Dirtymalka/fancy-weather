/* global webkitSpeechRecognition */
/* eslint no-undef: "error" */

import { getGeoPosition } from './map';

const SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const addMicrophoneHandler = () => {
  recognition.start();
  document.querySelector('.button-voice').classList.add('active');
  setTimeout(() => {
    recognition.stop();
    document.querySelector('.button-voice').classList.remove('active');
  }, 3000);
}

const addSpeakHandler = (e) => {
  document.querySelector('.header__search-input').value = e.results[0][0].transcript;
  getGeoPosition();
  document.querySelector('.button-voice').classList.remove('active');
}

export { addMicrophoneHandler, recognition, addSpeakHandler };
