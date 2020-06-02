/* eslint no-use-before-define: [2, {functions: false}] */
/* eslint no-use-before-define: ["error", { "variables": false }] */

import { MONTH_INDEX, DAY_INDEX, KEY_LANGUAGE } from './constants';
import { createDate } from './creatingComponents';
import { dictionary } from './dictionary';

const addDate = () => {
  const date = new Date();
  const dayWeekIndex = date.getDay();
  const monthIndex = date.getMonth();

  localStorage.setItem(DAY_INDEX, dayWeekIndex);
  localStorage.setItem(MONTH_INDEX, monthIndex);

  const language = localStorage.getItem(KEY_LANGUAGE);
  const day = date.getDate();
  const dayWeek = dictionary[language].days[dayWeekIndex];
  const month = dictionary[language].months[monthIndex];
  createDate(dayWeek, day, month);
}

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

  const addTimeNow = () => {
    if (localStorage.getItem('clearTime') === 'false') {
      clearInterval(timer);
    }

    const date = new Date();
    const dateString = date.toLocaleString(lang, options);
    const dateArr = dateString.split(', ');
    const time = dateArr[2];
    document.querySelector('.time').innerHTML = `${time}`;
  }
  const timer = setInterval(addTimeNow, 1000);
  addDate();
}

export default changeTimeZone;
