import '../css/style.css';
import cards from '../modules/cards';
import MainCards from '../modules/mainPage';
import addBurgerClickHandler from '../modules/burger';
import LinkedCards from '../modules/cardsPage';
import { switchEventListener, addStylesWithSwitchOff, addStylesWithSwitchOn } from '../modules/switch';
import statisticsArrZero from '../modules/statisticsData';
import Statistics from '../modules/statistics';
import { followLinksMenu, removeActiveToLink } from '../modules/links'
import { addCardsGameModeHandler, addButtonStartHandler } from '../modules/gameMode'

window.onload = () => {

  const bodyId = document.body.getAttribute('id');
  let statisticsArr = [];

  if (localStorage.getItem('statisticsArr')) {
    statisticsArr = JSON.parse(localStorage.getItem('statisticsArr'));
  } else {
    statisticsArr = statisticsArrZero.slice();
  }

  if (bodyId === 'main') {
    const mainPage = new MainCards(cards);
    mainPage.createMainField();
    mainPage.addMainCardsContainerClickHandler();

    if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn();
    if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff();
    switchEventListener();
  }

  if (bodyId === 'cards') {
    if (!localStorage.getItem('parentId')) {
      localStorage.setItem('parentId', '1');
    }
    const linkedPage = new LinkedCards(cards[(+localStorage.getItem('parentId') - 1)].linkedCards);
    linkedPage.createLinkedField();
    linkedPage.addCardsContainerClickHandler();
    removeActiveToLink();
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
      if (item.dataset.id === localStorage.getItem('activeLink')) item.classList.add('active');
    });

    if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn();
    if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff();
    switchEventListener();
  }

  if (bodyId === 'statistics') {
    const statistics = new Statistics(statisticsArr);
    statistics.createStatisticsTable();
    statistics.sortTable();
    statistics.resetTable();
    Statistics.repeatDifficultWords();
    Statistics.addWordsContainerClickHandler();
    document.querySelector('.menu-item').classList.remove('active');
    document.querySelector('.statistics-item').classList.add('active');
  }

  followLinksMenu();
  addBurgerClickHandler();


  if (document.querySelector('.button-start')) {
    document.querySelector('.button-start').addEventListener('click', addButtonStartHandler);
    document.querySelector('.cards-container').addEventListener('click', addCardsGameModeHandler);
  }

  document.addEventListener('click', (ev) => {
    if (!ev.target.closest('.navigation') && document.querySelector('.burger-menu').classList.contains('active-burger')) {
      document.querySelector('.burger-menu').classList.toggle('active-burger');
      document.querySelector('.hamburger').classList.toggle('active-burger');
      document.querySelector('.menu').style.transform = 'translate(-100%)';
    }
  });
}
