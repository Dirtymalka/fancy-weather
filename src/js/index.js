import '../css/style.css';
import cards from './cards';
import MainCards from './mainPage';
import addBurgerClickHandler from './burger';
import LinkedCards from './cardsPage';

const bodyId = document.body.getAttribute('id');

if (bodyId === 'main') {
  const mainPage = new MainCards(cards);
  mainPage.createMainField();
  mainPage.addMainCardsContainerClickHandler();

  if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn();
  if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff();
}

if (bodyId === 'cards') {
  if (!localStorage.getItem('parentId')) {
    localStorage.setItem('parentId', '1');
  }
  const linkedPage = new LinkedCards(cards[+localStorage.getItem('parentId') - 1].linkedCards);
  linkedPage.createLinkedField();
  linkedPage.addCardsContainerClickHandler();
  removeActiveToLink();
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    if (item.dataset.id === localStorage.getItem('activeLink')) item.classList.add('active');
  });

  if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn();
  if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff();
}


const followLinksMenu = function () {
  document.querySelector('.menu').addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-item')) {
      removeActiveToLink();
      event.target.classList.add('active');
      localStorage.removeItem('parentId');
      localStorage.setItem('parentId', `${event.target.dataset.id}`);
      localStorage.setItem('activeLink', `${event.target.dataset.id}`);
      if (bodyId === 'cards' && event.target.dataset.id !== '0') {
        event.preventDefault();
        document.querySelector('.cards-container').innerHTML = '';
        const linkedPage = new LinkedCards(cards[+(localStorage.getItem('parentId')) - 1].linkedCards);
        linkedPage.createLinkedField();
        linkedPage.addCardsContainerClickHandler();
        document.querySelector('.burger-menu').classList.toggle('active-burger');
        document.querySelector('.hamburger').classList.toggle('active-burger');
        document.querySelector('.menu').style.transform = 'translate(-100%)';
        if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn();
        if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff();
      }
    }
  })
}
followLinksMenu();

function removeActiveToLink() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
}

// localStorage.setItem('switch', 'on');
addBurgerClickHandler();


document.querySelector('.switch').addEventListener('click', () => {
  const checkBox = document.querySelector('.switch-input');
  if (checkBox.checked) {
    checkBox.checked = false;
    addStylesWithSwitchOff();
    localStorage.removeItem('switch');
    localStorage.setItem('switch', 'off');
  }
  else {
    checkBox.checked = true;
    addStylesWithSwitchOn();
    localStorage.removeItem('switch');
    localStorage.setItem('switch', 'on');
  }

})

function addStylesWithSwitchOff() {
  document.querySelector('.switch-input').checked = false;
  document.querySelector('.menu').classList.remove('green');
  document.querySelectorAll('.main-card').forEach(card => {
    card.classList.remove('green');
  });
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('card-cover');
  });
  document.querySelectorAll('.card-header').forEach(card => {
    card.classList.add('none');
  });
  document.querySelectorAll('.rotate').forEach(card => {
    card.classList.add('none');
  });
  if (document.querySelector('.rating')) document.querySelector('.rating').classList.remove('none');
  if (document.querySelector('.button-start')) document.querySelector('.button-start').classList.remove('none');
}

function addStylesWithSwitchOn() {
  document.querySelector('.switch-input').checked = true;
  document.querySelector('.menu').classList.add('green');
  document.querySelectorAll('.main-card').forEach(card => {
    card.classList.add('green');
  });
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('card-cover');
  });
  document.querySelectorAll('.card-header').forEach(card => {
    card.classList.remove('none');
  });
  document.querySelectorAll('.rotate').forEach(card => {
    card.classList.remove('none');
  });
  if (document.querySelector('.rating')) document.querySelector('.rating').classList.add('none');
  if (document.querySelector('.button-start')) document.querySelector('.button-start').classList.add('none');
}

if (document.querySelector('.button-container')) {
  document.querySelector('.button-container').addEventListener('click', addButtonStartHandler(event));
}

function addButtonStartHandler(event) {
  const arrAudio = [];
  cards.forEach(mainCard => {
    if (mainCard.id === localStorage.getItem('parentId')) {
      mainCard.linkedCards.forEach(card => {
        arrAudio.push(card.audioSrc);
      });
    }
  });
  console.log(arrAudio);
}
