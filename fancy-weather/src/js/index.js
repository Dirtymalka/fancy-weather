import '../css/style.css';
import '../css/style.scss';


import * as constants from '../modules/constants';
import { getWeatherOnThreeDays, getWeatherToday } from '../modules/weather';
import { getDateNow, time } from '../modules/date';

import { addMapWithGeolocation, getGeoPosition, searchButtonHandler, createMap } from '../modules/map';

// const render = async () => {
//   const coord = await getGeoPosition();
//   console.log(coord.latitude, coord.longitude)
//   await getWeatherToday(coord.latitude, coord.longitude);
//   createMap(coord.latitude, coord.longitude);
// }
// render();
getGeoPosition();

// createMap();

// console.log(2);



getDateNow();


setInterval(time, 1000);


// ymaps.ready(addMapWithGeolocation);
// getGeoPosition();

constants.SEARCH_BUTTON.onclick = searchButtonHandler;
  // event.preventDefault();
  // // const url = 'https://ipinfo.io/json?token=eb5b90bb77d46a';
  // // const request = await fetch(url);
  // // const res = await request.json();
  // // console.log(res);

  // navigator.geolocation.getCurrentPosition((pos) => {
  //   const crd = pos.coords;

  //   console.log('Ваше текущее метоположение:');
  //   console.log(`Широта: ${crd.latitude}`);
  //   console.log(`Долгота: ${crd.longitude}`);
  //   console.log(`Плюс-минус ${crd.accuracy} метров.`);
  // });
// }
