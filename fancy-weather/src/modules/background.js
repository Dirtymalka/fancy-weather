const getBackgroundImage = async (city) => {
  const main = 'https://api.unsplash.com/photos/random';
  const query = `?query=town,${city}`;
  const key = '&client_id=wORjWMSDHGib97wADP11nT19E7SOmo7Yjz8OENQWMKs';

  const url = main + query + key;

  const request = await fetch(url);
  const result = await request.json();
  const imgUrl = await result.urls.regular;
  document.querySelector('#app-wrapper').style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imgUrl})`;
}


export { getBackgroundImage };
