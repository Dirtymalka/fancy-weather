// const mainContainer = document.querySelector('.main-container')
import LinkedCards from './cardsPage';

export default class MainCards {
  constructor(data) {
    this.data = data;
    this.mainContainer = document.querySelector('.main-container');
  }

  createMainField() {
    this.data.forEach((card) => {
      const mainCard = MainCards.createMainCard(card);
      mainCard.setAttribute('data-id', card.id);
      this.mainContainer.append(mainCard);
    });
  }

  static createMainCard(cardData) {
    const cardElement = document.createElement('a');
    cardElement.className = 'main-card green';
    cardElement.setAttribute('href', './cards.html');
    cardElement.innerHTML = `<img src="${cardData.img}" alt="${cardData.name}">${cardData.name}`;
    return cardElement;
  }

  addMainCardsContainerClickHandler() {
    this.mainContainer.addEventListener('click', (event) => {
      if (event.target.closest('.main-card')) {
        console.log(event.target.dataset.id);
        localStorage.removeItem('parentId');
        localStorage.setItem('parentId', `${event.target.closest('.main-card').dataset.id}`);
        localStorage.setItem('activeLink', `${event.target.closest('.main-card').dataset.id}`);
      }
    })
  }

  // linkGo() {
  //   this.mainContainer.addEventListener('click', (event) => {
  //     if (event.target.closest('.main-card')) {
  //       this.mainContainer.innerHTML = '';
  //       const linkedPage = new LinkedCards(this.data[event.target.closest('.main-card').dataset.id - 1].linkedCards);
  //       linkedPage.createLinkedField();
  //       linkedPage.addCardsContainerClickHandler();
  //     }
  //   })
  // }


}
