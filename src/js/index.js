import '../css/style.css';
// import '../css/style.scss';
// import {
//   moduleOne
// } from './moduleOne';

// const helloArr = require('./moduleOne.js');

import cards from './cards';
import MainCards from './mainPage';
import addBurgerClickHandler from './burger';
import LinkedCards from './cardsPage';

//const mainPage = new MainCards(cards);
//mainPage.createMainField();
const linkedPage = new LinkedCards(cards[0].linkedCards);
linkedPage.createLinkedField();
linkedPage.addCardsContainerClickHandler();

addBurgerClickHandler();
