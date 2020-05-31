import { SEARCH_INPUT, MAP_CONTAINER, KEY_LANGUAGE } from './constants';
import { getWeatherToday, getWeatherOnThreeDays } from './weather';
import { createCoordinates, createTitle } from './creatingComponents';
import { getBackgroundImage } from './background';
import { langForMap } from './dictionary';


const getGeoPosition = () => {
  const position = {};
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const crd = await pos.coords;
    // console.log(pos);
    position.latitude = crd.latitude;
    position.longitude = crd.longitude;
    await getContent(position);
    // getWeatherToday(crd.latitude, crd.longitude);
    // getWeatherOnThreeDays(crd.latitude, crd.longitude);
    // createMap(position.latitude, position.longitude);
    // createCoordinates(position.latitude, position.longitude);
  })
  return position;
}


const getContent = async (position) => {
  const language = localStorage.getItem(KEY_LANGUAGE);

  const mainPath = 'https://geocode-maps.yandex.ru/1.x?';
  const APIKey = 'apikey=9a61be5f-61ac-46cf-ba19-54678ca5600f&';
  const lang = `lang=${langForMap[language]}&`;
  let geocode;
  // const position = await getGeoPosition();
  if (!SEARCH_INPUT.value) {
    // console.log(position)
    geocode = `geocode=${position.longitude},${position.latitude}`;
  } else {
    geocode = `geocode=${SEARCH_INPUT.value}`;
  }
  const url = mainPath + APIKey + lang + geocode;
  // console.log(url);

  const request = await fetch(url);
  const response = await request.text();
  // console.log(response)
  const str = await (new window.DOMParser()).parseFromString(response, "text/xml");
  console.log(str)

  // const searchLatitude = response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[1];
  // const searchLongitude = response.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')[0];
  // const country = response.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[0].name;
  // const city = response.response.GeoObjectCollection.featureMember[0].GeoObject.metaDataProperty.GeocoderMetaData.Address.Components.find((item) => item.kind === 'province').name;


  const searchLatitude = +str.querySelector('pos').textContent.split(' ')[1];
  const searchLongitude = +str.querySelector('pos').textContent.split(' ')[0];
  const country = str.querySelector('CountryName').textContent;
  const city = (str.querySelector('LocalityName') || str.querySelector('AdministrativeAreaName')).textContent;

  console.log(searchLatitude);
  getBackgroundImage(city);
  createTitle(`${country}, ${city}`);
  getWeatherToday(searchLatitude, searchLongitude);
  getWeatherOnThreeDays(searchLatitude, searchLongitude);
  createMap(searchLatitude, searchLongitude);
  createCoordinates(searchLatitude, searchLongitude);
}


const createMap = (latitude, longitude) => {
  MAP_CONTAINER.innerHTML = '';
  let myMAp;
  ymaps.ready(init);

  function init() {
    myMAp = new ymaps.Map("map", {
      center: [latitude, longitude],
      controls: ['geolocationControl', 'typeSelector', 'zoomControl'],
      zoom: 12
    },
      {
        searchControlProvider: 'yandex#search'
      });

      const myGeoObject = new ymaps.GeoObject({
        geometry: {
            type: "Point", // тип геометрии - точка
            coordinates: [latitude, longitude] // координаты точки
        }
    });
    myMAp.geoObjects.add(myGeoObject);
  }

}

export { getGeoPosition, getContent, createMap };
