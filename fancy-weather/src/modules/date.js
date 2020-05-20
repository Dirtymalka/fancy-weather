import { daysOfWeekEn, daysOfWeekRu, daysOfWeekBe, monthsEn, monthsRu, monthsBe } from './constants';


const getDateNow = () => {
  const dateNow = new Date();
  const dataDays = daysOfWeekEn;
  const dataMonths = monthsEn;
  const dayOfWeak = dataDays[dateNow.getDay()];
  const month = dataMonths[dateNow.getMonth()];
  const day = dateNow.getDate();
  document.querySelector('.date').innerHTML = `${dayOfWeak} ${day} ${month} `;
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
