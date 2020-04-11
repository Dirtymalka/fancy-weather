import '../css/style.css';
// import '../css/style.scss';
// import {
//   moduleOne
// } from './moduleOne';

// const helloArr = require('./moduleOne.js');

import cards from './cards';
import MainCards from './mainPage';
import addBurgerClickHandler from './burger';

const mainPage = new MainCards(cards);
mainPage.iterateData();
addBurgerClickHandler();
