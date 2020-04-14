import '../css/style.css';
import cards from './cards';
import MainCards from './mainPage';
import addBurgerClickHandler from './burger';
import LinkedCards from './cardsPage';
import { switchEventListener, addStylesWithSwitchOff, addStylesWithSwitchOn } from './switch';

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
    localStorage.setItem('parentId', '1'); // ######################################### LocalStorage #####################################################
  }
  const linkedPage = new LinkedCards(cards[+localStorage.getItem('parentId') - 1].linkedCards);
  linkedPage.createLinkedField();
  linkedPage.addCardsContainerClickHandler();
  removeActiveToLink();
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    if (item.dataset.id === localStorage.getItem('activeLink')) item.classList.add('active');
  });

  if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn(); // ######################################### LocalStorage #####################################################
  if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff(); // ######################################### LocalStorage ###################################################
}


const followLinksMenu = function () {
  document.querySelector('.menu').addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-item')) {
      removeActiveToLink();
      event.target.classList.add('active');
      localStorage.removeItem('parentId'); // ######################################### LocalStorage #####################################################
      localStorage.setItem('parentId', `${event.target.dataset.id}`); // ######################################### LocalStorage #####################################################
      localStorage.setItem('activeLink', `${event.target.dataset.id}`); // ######################################### LocalStorage #####################################################
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
        //////////////////////////////////////////////////////////////////////////
        if (document.querySelector('.button-start')) {
          document.querySelector('.button-start').addEventListener('click', addButtonStartHandler);
        }
        /////////////////////////////////////////////////////////////////////////////
        // ######################################### LocalStorage #####################################################
      }
    }
    localStorage.removeItem('startGame');
    //document.querySelector('.cards-container').removeEventListener('click', addCardsGameModeHandler);
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
switchEventListener();


// document.querySelector('.switch').addEventListener('click', () => {
//   const checkBox = document.querySelector('.switch-input');
//   if (checkBox.checked) {
//     checkBox.checked = false;
//     addStylesWithSwitchOff();
//     localStorage.removeItem('switch'); // ######################################### LocalStorage #####################################################
//     localStorage.setItem('switch', 'off'); // ######################################### LocalStorage #####################################################
//   }
//   else {
//     checkBox.checked = true;
//     addStylesWithSwitchOn();
//     localStorage.removeItem('switch'); // ######################################### LocalStorage #####################################################
//     localStorage.setItem('switch', 'on'); // ######################################### LocalStorage #####################################################
//   }
// })

// function addStylesWithSwitchOff() {
//   document.querySelector('.switch-input').checked = false;
//   document.querySelector('.menu').classList.remove('green');
//   document.querySelectorAll('.main-card').forEach(card => {
//     card.classList.remove('green');
//   });
//   document.querySelectorAll('.card').forEach(card => {
//     card.classList.add('card-cover');
//   });
//   document.querySelectorAll('.card-header').forEach(card => {
//     card.classList.add('none');
//   });
//   document.querySelectorAll('.rotate').forEach(card => {
//     card.classList.add('none');
//   });
//   if (document.querySelector('.rating')) document.querySelector('.rating').classList.remove('none');
//   if (document.querySelector('.button-start')) document.querySelector('.button-start').classList.remove('none');
// }

// function addStylesWithSwitchOn() {
//   document.querySelector('.switch-input').checked = true;
//   document.querySelector('.menu').classList.add('green');
//   document.querySelectorAll('.main-card').forEach(card => {
//     card.classList.add('green');
//   });
//   document.querySelectorAll('.card').forEach(card => {
//     card.classList.remove('card-cover');
//   });
//   document.querySelectorAll('.card-header').forEach(card => {
//     card.classList.remove('none');
//   });
//   document.querySelectorAll('.rotate').forEach(card => {
//     card.classList.remove('none');
//   });
//   if (document.querySelector('.rating')) document.querySelector('.rating').classList.add('none');
//   if (document.querySelector('.button-start')) document.querySelector('.button-start').classList.add('none');
// }


// Game Mode ------------------------------------------------------------------------------------------------------------

//if (document.querySelector('.button-start')) {
  document.querySelector('.button-start').addEventListener('click', addButtonStartHandler);
//}

const arrAudio = [];
const arrAudioRandom = [];
const arrPlayedAudio = [];

function createSoundEffects() {
  arrAudioRandom.length = 0;
  cards.forEach(mainCard => {
    if (mainCard.id === localStorage.getItem('parentId')) {
      mainCard.linkedCards.forEach(card => {
        arrAudio.push({ id: card.id, audio: card.audioSrc });
      });
    }
  });
  console.log(arrAudio);
  for (let i = arrAudio.length - 1; i >= 0; i -= 1) {
    const randomAudio = randomInteger(0, i);
    arrAudioRandom.push(arrAudio[randomAudio]);
    arrAudio.splice(randomAudio, 1);
  }
  console.log(arrAudioRandom.length);
}


const playSoundEffect = function () {
  document.querySelector('.audio').setAttribute('src', arrAudioRandom[arrAudioRandom.length - 1].audio);
  document.querySelector('.audio').play();
  arrPlayedAudio.push(arrAudioRandom.pop());
}



function addButtonStartHandler(event) {
  if (!localStorage.getItem('startGame')) {
    document.querySelector('.button-start').classList.add('repeat');
    localStorage.setItem('startGame', 'true'); // ######################################### LocalStorage #####################################################

    createSoundEffects();
    playSoundEffect();

  }
  if (localStorage.getItem('startGame')) document.querySelector('.audio').play();
}

function goToMainPage() {
  document.location.href = '/index.html';
}

const addCardsGameModeHandler = function (ev) {
  if (localStorage.getItem('startGame') === 'true' && localStorage.getItem('switch') === 'off') {
    if (ev.target.classList.contains('front') && !ev.target.classList.contains('inactive')) {
      if (arrPlayedAudio[arrPlayedAudio.length - 1].id === ev.target.dataset.id) {
        document.querySelector('.sound-effect').setAttribute('src', 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/correct.mp3');
        document.querySelector('.sound-effect').play();
        createCorrectStar();
        ev.target.classList.add('inactive');
        if (arrAudioRandom.length === 0) {
          const starsCorrect = document.querySelectorAll('.star-correct');
          const starError = document.querySelectorAll('.star-error');
          if (starError.length === 0) {
            const success = document.createElement('div');
            success.className = 'success-block';
            success.innerHTML = `<img src="/img/success.jpg"></img>`;
            document.body.append(success);
            document.querySelector('.sound-effect').setAttribute('src', 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/success.mp3');
            document.querySelector('.sound-effect').play();
            localStorage.removeItem('startGame');
            document.querySelector('.switch-input').checked = true;
            localStorage.removeItem('switch');
            localStorage.setItem('switch', 'on');
            setTimeout(goToMainPage, 3000);
            return;
          }
          const failure = document.createElement('div');
          failure.className = 'failure-block';
          failure.innerHTML = `<div>${starError.length} errors</div><img src="/img/failure.jpg"></img>`;
          document.body.append(failure);
          document.querySelector('.sound-effect').setAttribute('src', 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/failure.mp3');
          document.querySelector('.sound-effect').play();
          localStorage.removeItem('startGame');
          document.querySelector('.switch-input').checked = true;
          localStorage.removeItem('switch');
          localStorage.setItem('switch', 'on');
          setTimeout(goToMainPage, 3000);
        }

        setTimeout(playSoundEffect, 1000);

        return;
      }
      document.querySelector('.sound-effect').setAttribute('src', 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/error.mp3');
      document.querySelector('.sound-effect').play();
      createErrorStar();
    }
  }
}

document.querySelector('.cards-container').addEventListener('click', addCardsGameModeHandler);

function createCorrectStar() {
  const starCorrect = document.createElement('div');
  starCorrect.className = 'star-correct';
  document.querySelector('.rating').append(starCorrect);
}

function createErrorStar() {
  const starError = document.createElement('div');
  starError.className = 'star-error';
  document.querySelector('.rating').append(starError);
}


function randomInteger(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
