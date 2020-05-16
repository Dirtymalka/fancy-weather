import '../css/style.css';
import '../css/style.scss';


import * as constants from '../modules/constants';
import { getWeatherOnThreeDays, getWeatherToday } from '../modules/weather';
import { getDateNow, time } from '../modules/date';

// getWeather();

// getWeatherToday();
getDateNow();

setInterval(time, 1000);
































// import init from '../modules/map';


// const map = ymaps.ready(init);

// ymaps.ready(function () {
//   var map;
//   ymaps.geolocation.get().then(function (res) {
//       var mapContainer = $('#map'),
//           bounds = res.geoObjects.get(0).properties.get('boundedBy'),
//           // Рассчитываем видимую область для текущей положения пользователя.
//           mapState = ymaps.util.bounds.getCenterAndZoom(
//               bounds,
//               [mapContainer.width(), mapContainer.height()]
//           );
//       createMap(mapState);
//   }, function (e) {
//       // Если местоположение невозможно получить, то просто создаем карту.
//       createMap({
//           center: [55.751574, 37.573856],
//           zoom: 2
//       });
//   });

//   function createMap (state) {
//       map = new ymaps.Map('map', state);
//   }
// });
