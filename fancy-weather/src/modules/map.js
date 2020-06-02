/* global ymaps */
/* eslint no-undef: "error" */

import { KEY_LANGUAGE } from './constants';
import { getWeatherToday, getWeatherOnThreeDays } from './weather';
import { createCoordinates, createTitle } from './creatingComponents';
import getBackgroundImage from './background';
import { langForMap } from './dictionary';
import errorHandler from './errorHandler';
import { addLoader, removeLoader } from './loader';

const createMap = (latitude, longitude) => {
  document.getElementById('map').innerHTML = '';
  let myMAp;
  function init() {
    myMAp = new ymaps.Map("map", {
      center: [latitude, longitude],
      controls: ['geolocationControl', 'typeSelector', 'zoomControl'],
      zoom: 11
    },
      {
        searchControlProvider: 'yandex#search'
      });

    const myGeoObject = new ymaps.GeoObject({
      geometry: {
        type: "Point",
        coordinates: [latitude, longitude]
      }
    });
    myMAp.geoObjects.add(myGeoObject);
  }
  ymaps.ready(init);
}

const getContent = async (position) => {
  const language = localStorage.getItem(KEY_LANGUAGE);

  const mainPath = 'https://geocode-maps.yandex.ru/1.x?';
  const APIKey = 'apikey=9a61be5f-61ac-46cf-ba19-54678ca5600f&';
  const lang = `lang=${langForMap[language]}&`;
  let geocode;
  if (!document.querySelector('.header__search-input').value) {
    geocode = `geocode=${position.longitude},${position.latitude}`;
  } else {
    geocode = `geocode=${document.querySelector('.header__search-input').value}`;
  }
  const url = mainPath + APIKey + lang + geocode;

  try {
    document.querySelector('.header__search-input').classList.remove('error');
    document.querySelector('.header__search-input').setAttribute('placeholder', 'Search City');

    const request = await fetch(url);
    const response = await request.text();
    const str = (new window.DOMParser()).parseFromString(response, "text/xml");

    const searchLatitude = +str.querySelector('pos').textContent.split(' ')[1];
    const searchLongitude = +str.querySelector('pos').textContent.split(' ')[0];
    const country = str.querySelector('CountryName').textContent;
    const city = (str.querySelector('LocalityName') || str.querySelector('AdministrativeAreaName')).textContent;

    getWeatherToday(searchLatitude, searchLongitude);
    getWeatherOnThreeDays(searchLatitude, searchLongitude);
    createMap(searchLatitude, searchLongitude);
    createCoordinates(searchLatitude, searchLongitude);
    getBackgroundImage(city);
    createTitle(`${country}, ${city}`);
  } catch (error) {
    errorHandler();
    removeLoader();
  }
}

const getGeoPosition = () => {
  addLoader();
  const position = {};
  navigator.geolocation.getCurrentPosition(async (pos) => {
    const crd = pos.coords;
    position.latitude = crd.latitude;
    position.longitude = crd.longitude;
    await getContent(position);
  })
}

export { getGeoPosition, getContent, createMap };
