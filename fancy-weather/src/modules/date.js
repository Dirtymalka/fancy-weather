import { daysOfWeekEn, daysOfWeekRu, daysOfWeekBe, monthsEn, monthsRu, monthsBe, monthIndex, dayIndex } from './constants';
import { createDate } from './creatingComponents';


const getDateNow = () => {
  const dateNow = new Date();
  // const dataDays = daysOfWeekEn;
  // const dataMonths = monthsEn;
  const GetMonthIndex = dateNow.getMonth();
  localStorage.setItem(monthIndex, GetMonthIndex);

  const GetDayIndex = dateNow.getDay();
  localStorage.setItem(dayIndex, GetDayIndex);

  const dayOfWeak = daysOfWeekEn[dateNow.getDay()];
  const month = monthsEn[dateNow.getMonth()];
  const day = dateNow.getDate();
  createDate(dayOfWeak, day, month);
  // document.querySelector('.date').innerHTML = `${dayOfWeak} ${day} ${month} `;
}


const time = () => {
  const date = new Date();
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let seconds = date.getSeconds();
  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;
  document.querySelector('.time').innerHTML = `${hours}:${minutes}:${seconds}`;
}

export { getDateNow, time };
