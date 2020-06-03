/* eslint no-unneeded-ternary: "error" */

import { removeLoader } from './loader';
import { CITY } from './constants';

const getBackgroundImage = async (city) => {
  const newCity = city ? city : localStorage.getItem(CITY);
  const main = 'https://api.unsplash.com/photos/random';
  const query = `?query=town,${newCity}`;
  const key = '&client_id=wORjWMSDHGib97wADP11nT19E7SOmo7Yjz8OENQWMKs';
  const url = main + query + key;
  try {
    const request = await fetch(url);
    const result = await request.json();
    const imgUrl = await result.urls.regular;
    const img = new Image;
    img.src = imgUrl;
    img.onload = () => {
      removeLoader();
      document.querySelector('#app-wrapper').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgUrl})`;
    }
  } catch (error) {
    removeLoader();
    document.querySelector('#app-wrapper').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./img/bg3.png)`;
  }
  localStorage.setItem(CITY, `${newCity}`);
}


export default getBackgroundImage;
