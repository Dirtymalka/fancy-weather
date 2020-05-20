import { SEARCH_INPUT, MAP_CONTAINER } from './constants';
import { getWeatherToday, getWeatherOnThreeDays } from './weather';
// const addMap = () => {
//     const map = new ymaps.Map("map", {
//         center: [55.76, 37.64],
//         zoom: 10
//     });
// }


const getGeoPosition = () => {
    const position = {};
    navigator.geolocation.getCurrentPosition(async (pos) => {
        const crd = await pos.coords;
        position.latitude = crd.latitude;
        position.longitude = crd.longitude;
        getWeatherToday(crd.latitude, crd.longitude);
        getWeatherOnThreeDays(crd.latitude, crd.longitude);
        createMap(position.latitude, position.longitude);
    })
    return position;
}


const addMapWithGeolocation = () => {
    let myMap;
    ymaps.geolocation.get()
        .then((res) => {
            const mapContainer = $('#map');
            const bounds = res.geoObjects.get(0).properties.get('boundedBy');
            console.log(bounds);
            // coordinate = bounds[0].slice();
            // console.log(coordinate);
            const mapState = ymaps.util.bounds.getCenterAndZoom(
                bounds,
                [mapContainer.width(), mapContainer.height()]
            );
            createMap(mapState);
        }, (e) => {
            createMap({
                center: [55.751574, 37.573856],
                zoom: 2
            });
        });

    function createMap(state) {
        myMap = new ymaps.Map('map', state);
    }
}


const searchButtonHandler = async (ev) => {
    ev.preventDefault();
    const mainPath = 'https://geocode-maps.yandex.ru/1.x';
    const APIKey = '?apikey=9a61be5f-61ac-46cf-ba19-54678ca5600f&';
    const geocode = `geocode=${SEARCH_INPUT.value}`;
    const url = mainPath + APIKey + geocode;

    const request = await fetch(url);
    const response = await request.text();
    const str = await (new window.DOMParser()).parseFromString(response, "text/xml");

    const searchLatitude = +str.querySelector('pos').textContent.split(' ')[1];
    const searchLongitude = +str.querySelector('pos').textContent.split(' ')[0];

    console.log(searchLatitude);
    getWeatherToday(searchLatitude, searchLongitude);
    getWeatherOnThreeDays(searchLatitude, searchLongitude);
    createMap(searchLatitude, searchLongitude);
}


const createMap = (latitude, longitude) => {
    MAP_CONTAINER.innerHTML = '';
    let myMAp;
    ymaps.ready(init);
    document.querySelector('.ymaps-2-1-76-inner-panes').style.cssText = 'background: url(../../img/Rectangle.png) 0 0 no-repeat; border-radius: 10px;';

    function init() {
        myMAp = new ymaps.Map("map", {
            center: [latitude, longitude],
            zoom: 12
        },
            {
                searchControlProvider: 'yandex#search'
            });
    }
}

export { addMapWithGeolocation, getGeoPosition, searchButtonHandler, createMap };
