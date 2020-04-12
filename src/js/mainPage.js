// const mainContainer = document.querySelector('.main-container')
import LinkedCards from './cardsPage';

export default class MainCards {
  constructor(data) {
    this.data = data;
    this.mainContainer = document.querySelector('.main-container')
  }

  createMainField() {
    this.data.forEach((card) => {
      const mainCard = this.createMainCard(card);
      mainCard.setAttribute('data-id', card.id);
      this.mainContainer.append(mainCard);
    });
  }

  createMainCard(cardData) {
    const cardElement = document.createElement('a');
    cardElement.className = 'main-card green';
    cardElement.innerHTML = `<img src="${cardData.img}" alt="${cardData.name}">${cardData.name}`;
    return cardElement;
  }

  linkGo() {
    this.mainContainer.addEventListener('click', (event) => {
      if (event.target.closest('.main-card')) {
        this.mainContainer.innerHTML = '';
        const linkedPage = new LinkedCards(this.data[event.target.closest('.main-card').dataset.id - 1].linkedCards);
        linkedPage.createLinkedField();
        linkedPage.addCardsContainerClickHandler();
      }
    })
  }
}
