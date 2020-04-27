import LinkedCards from './cardsPage';
import cards from './cards';
import { addButtonStartHandler, startGameLS } from './gameMode';
import { addStylesWithSwitchOff, addStylesWithSwitchOn, positionSwitch } from './switch';

const bodyId = document.body.getAttribute('id');
const parentIdLS = 'parentId';
const activeLinkLS = 'activeLink';

function removeActiveToLink() {
  const menuItems = document.querySelectorAll('.menu-item');
  menuItems.forEach(item => {
    item.classList.remove('active');
  });
}

const followLinksMenu = () => {
  document.querySelector('.menu').addEventListener('click', (event) => {
    if (event.target.classList.contains('menu-item')) {
      removeActiveToLink();
      event.target.classList.add('active');
      if (event.target.dataset.id !== '0' && event.target.dataset.id !== '9') {
        localStorage.setItem(parentIdLS, `${event.target.dataset.id}`);
      }
      localStorage.setItem(activeLinkLS, `${event.target.dataset.id}`);
      if (bodyId === 'cards' && event.target.dataset.id !== '0' && event.target.dataset.id !== '9') {
        event.preventDefault();
        document.querySelector('.burger-menu').classList.toggle('active-burger');
        document.querySelector('.hamburger').classList.toggle('active-burger');
        document.querySelector('.menu').style.transform = 'translate(-100%)';
        document.querySelector('.cards-container').innerHTML = '';
        const linkedPage = new LinkedCards(cards[+(localStorage.getItem(parentIdLS)) - 1].linkedCards);
        linkedPage.createLinkedField();
        linkedPage.addCardsContainerClickHandler();
        if (localStorage.getItem(positionSwitch) === 'on') {
          addStylesWithSwitchOn();
        }
        if (localStorage.getItem(positionSwitch) === 'off') {
          addStylesWithSwitchOff();
        }

        if (document.querySelector('.button-start')) {
          document.querySelector('.button-start').addEventListener('click', addButtonStartHandler);
        }
      }
    }
    localStorage.removeItem(startGameLS);
  })
}

export { followLinksMenu, removeActiveToLink };
