import { TEMPERATURE_UNIT_NAME, KEY_LANGUAGE } from './constants';

const speakerHandler = () => {
  const synth = window.speechSynthesis;
  const description = document.querySelector('.weather-description').textContent;
  const temperature = document.querySelector('.weather__data_temperature-today').textContent;
  const feeling = document.querySelector('.feels-like-text').textContent;
  const feelingTemperature = document.querySelector('.feels-like-temperature').textContent;
  const wind = document.querySelector('.wind-text').textContent;
  const windSpeed = document.querySelector('.wind-speed').textContent;
  const humidity = document.querySelector('.humidity-text').textContent;
  const humidityDescription = document.querySelector('.humidity-description').textContent;

  const unit = localStorage.getItem(TEMPERATURE_UNIT_NAME);

  const phraseEn = `Today ${description}, temperature ${temperature} degrees ${unit}, ${feeling} as ${feelingTemperature}. ${wind} - ${windSpeed} meters per second. ${humidity} is ${humidityDescription} percent`;

  const phraseRu = `Сегодня ${description}, температура ${temperature} градусов ${unit}, ${feeling} как ${feelingTemperature}. ${wind} - ${windSpeed} метров в секунду. ${humidity} ${humidityDescription} процентов`;

  const phraseBe = `Сёння ${description}, тэмпература ${temperature} градусаў ${unit}, ${feeling} як ${feelingTemperature}. ${wind} - ${windSpeed} метраў у секунду. ${humidity} ${humidityDescription} адсоткаў`;

  const phrasesMap = {
    'en': phraseEn,
    'ru': phraseRu,
    'be': phraseBe
  }

  const language = localStorage.getItem(KEY_LANGUAGE);

  const utterThis = new SpeechSynthesisUtterance(phrasesMap[language]);
  utterThis.lang = language;
  synth.speak(utterThis);
}


export default speakerHandler;
