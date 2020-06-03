import { KEY_LANGUAGE, WEATHER_CODE, TIME_ZONE, TEMPERATURE_UNIT_NAME, CLEAR_TIME, FALSE } from './constants';
import { createWeatherTodayContent, createWeatherFeatureContent } from './creatingComponents';
import changeTimeZone from './date';
import errorHandler from './errorHandler';

const unitsData = {
  'celsius': 'M',
  'fahrenheit': 'I'
};

const getInfoWeatherOnThreeDays = (data) => {
  const newData = data.slice();
  newData.shift();
  const dataInfo = newData.map(newDataItem => {
    return {
      temperature: Math.round(newDataItem.temp),
      icon: newDataItem.weather.code
    }
  });
  return dataInfo;
}

const getInfoWeatherToday = (data) => {
  localStorage.setItem(WEATHER_CODE, data.weather.code);
  const info = {
    temperature: Math.round(data.temp),
    feelsTemperature: Math.round(data.app_temp),
    wind: Math.round(data.wind_spd),
    humidity: data.rh,
    description: data.weather.description,
    icon: data.weather.code,
    timeZone: data.timezone,
  };
  return info;
}

const getWeatherOnThreeDays = async (latitude, longitude) => {
  const language = localStorage.getItem(KEY_LANGUAGE);
  const units = unitsData[localStorage.getItem(TEMPERATURE_UNIT_NAME)] || unitsData.celsius;
  const main = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const coordinates = `&lat=${latitude}&lon=${longitude}`
  const optionsAndLanguage = `&days=4&units=${units}&lang=${language}`;
  const keyAPI = '&key=1e31c50739494898ba037bd6548aa0ad';
  const url = main + coordinates + optionsAndLanguage + keyAPI;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const infoData = getInfoWeatherOnThreeDays(data.data);
    createWeatherFeatureContent(infoData);
  } catch (e) {
    errorHandler();
  }
}

const getWeatherToday = async (latitude, longitude) => {
  const language = localStorage.getItem(KEY_LANGUAGE);
  const units = unitsData[localStorage.getItem(TEMPERATURE_UNIT_NAME)] || unitsData.celsius;
  const main = 'https://api.weatherbit.io/v2.0/current?';
  const coordinates = `&lat=${latitude}&lon=${longitude}`
  const optionsAndLanguage = `&units=${units}&lang=${language}`;
  const keyAPI = '&key=1e31c50739494898ba037bd6548aa0ad';
  const url = main + coordinates + optionsAndLanguage + keyAPI;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const infoData = await getInfoWeatherToday(data.data[0]);
    createWeatherTodayContent(infoData);
    localStorage.setItem(CLEAR_TIME, FALSE);
    changeTimeZone(infoData.timeZone, language);
    localStorage.setItem(TIME_ZONE, infoData.timeZone);
  } catch (e) {
    errorHandler();
  }
}

export { getWeatherOnThreeDays, getWeatherToday };
