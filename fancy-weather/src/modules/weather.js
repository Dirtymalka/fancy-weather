import { API_WEATHER_KEY } from './constants';
import { createWeatherTodayContent, createWeatherFeatureContent } from './creatingComponents';

const getWeatherOnThreeDays = async (latitude, longitude) => {
  console.log(latitude, longitude);
  // const url = `https://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&days=4&units=M&lang=ru&key=619b6dd131094859b162bb2577321b2a`;
  const main = 'https://api.weatherbit.io/v2.0/forecast/daily?';
  const coordinates = `&lat=${latitude}&lon=${longitude}`
  const optionsAndLanguage = '&days=4&units=M&lang=en';
  const keyAPI = '&key=59faf9d6712e43829d6b1b0619e0c4d2';
  const url = main + coordinates + optionsAndLanguage + keyAPI;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data.data);
  const infoData = getInfoWeatherOnThreeDays(data.data);
  createWeatherFeatureContent(infoData);
}

const getInfoWeatherOnThreeDays = (data) => {
  const newData = data.slice();
  newData.shift();
  const dataInfo = [];
  newData.forEach(day => {
    const dayInfo = {
      temperature: Math.round(day.temp)
    };
    dataInfo.push(dayInfo);
  });
  return dataInfo;
}


const getWeatherToday = async (latitude, longitude) => {
  console.log(latitude, longitude);
  // const url = `https://api.weatherbit.io/v2.0/current?&lat=${latitude}&lon=${longitude}&units=M&lang=en&key=619b6dd131094859b162bb2577321b2a`;
  const main = 'https://api.weatherbit.io/v2.0/current?';
  const coordinates = `&lat=${latitude}&lon=${longitude}`
  const optionsAndLanguage = '&units=M&lang=en';
  const keyAPI = '&key=59faf9d6712e43829d6b1b0619e0c4d2';
  const url = main + coordinates + optionsAndLanguage + keyAPI;
  const response = await fetch(url);
  const data = await response.json();
  // console.log(data);
  const infoData = await getInfoWeatherToday(data.data[0]);
  createWeatherTodayContent(infoData);

}

const getInfoWeatherToday = (data) => {
  const info = {
    temperature: Math.round(data.temp),
    feelsTemperature: Math.round(data.app_temp),
    wind: Math.round(data.wind_spd),
    humidity: data.rh,
    description: data.weather.description,
  };
  return info;
}


export { getWeatherOnThreeDays, getWeatherToday };
