import { API_WEATHER_KEY } from './constants';

const getWeatherOnThreeDays = async () => {
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=Minsk&country=RU&days=4&units=M&lang=be&key=619b6dd131094859b162bb2577321b2a`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}




const getWeatherToday = async () => {
  const url = `https://api.weatherbit.io/v2.0/current?city=минск&units=M&key=619b6dd131094859b162bb2577321b2a`;
  const response = await fetch(url);
  const data = await response.json();
  console.log(data.data[0]);
  const infoData = await getInfoWeatherToday(data.data[0]);
  console.log(infoData);
}

const getInfoWeatherToday = (data) => {
  const info = {
    temperature: data.temp,
    feelsTemperature: data.app_temp,
    wind: Math.round(data.wind_spd),
    humidity: data.rh,
    description: data.weather.description,
  };
  return info;
}


export { getWeatherOnThreeDays, getWeatherToday };
