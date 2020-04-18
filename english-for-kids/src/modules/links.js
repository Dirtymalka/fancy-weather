import LinkedCards from './cardsPage';
import cards from './cards';
import { addButtonStartHandler } from './gameMode';
import { addStylesWithSwitchOff, addStylesWithSwitchOn } from './switch';

const bodyId = document.body.getAttribute('id');

function removeActiveToLink() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
}

const followLinksMenu = function () {
  document.querySelector('.menu').addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-item')) {
      removeActiveToLink();
      event.target.classList.add('active');
      if (event.target.dataset.id !== '0' && event.target.dataset.id !== '9') {
        localStorage.removeItem('parentId');
        localStorage.setItem('parentId', `${event.target.dataset.id}`);
      }
      localStorage.setItem('activeLink', `${event.target.dataset.id}`);
      if (bodyId === 'cards' && event.target.dataset.id !== '0' && event.target.dataset.id !== '9') {
        event.preventDefault();
        document.querySelector('.cards-container').innerHTML = '';
        const linkedPage = new LinkedCards(cards[+(localStorage.getItem('parentId')) - 1].linkedCards);
        linkedPage.createLinkedField();
        linkedPage.addCardsContainerClickHandler();
        if (localStorage.getItem('switch') === 'on') addStylesWithSwitchOn();
        if (localStorage.getItem('switch') === 'off') addStylesWithSwitchOff();

        if (document.querySelector('.button-start')) {
          document.querySelector('.button-start').addEventListener('click', addButtonStartHandler);
        }
      }
    }
    localStorage.removeItem('startGame');
  })
}

export {followLinksMenu, removeActiveToLink};
