import { monthIndex, dayIndex, KEY_LANGUAGE } from './constants';
import { createDate } from './creatingComponents';
import { dictionary } from './dictionary';

const changeTimeZone = (zone, lang) => {
  setTimeout(() => {
    localStorage.setItem('clearTime', 'true');
  }, 1000);
  const options = {
    timeZone: zone,
    weekday: 'short',
    day: 'numeric',
    month: 'long',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false
  };
  const addDateNow = () => {
    if (localStorage.getItem('clearTime') === 'false') {
      clearInterval(timer);
    }
    const date = new Date().toLocaleString(lang, options);
    document.querySelector('.weather__data_data-time').innerHTML = date;
  }
  const timer = setInterval(addDateNow, 1000);
}

export { changeTimeZone };
