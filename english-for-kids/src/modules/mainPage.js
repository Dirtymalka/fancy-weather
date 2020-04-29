const PARENT_ID = 'parentId';
const activeLinkLS = 'activeLink';

export default class MainCards {
  constructor(data) {
    this.data = data;
    this.mainContainer = document.querySelector('.main-container');
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
    cardElement.setAttribute('href', './cards.html');
    cardElement.innerHTML = `<img src="${cardData.img}" alt="${cardData.name}">${cardData.name}`;
    return cardElement;
  }

  addMainCardsContainerClickHandler() {
    this.mainContainer.addEventListener('click', (event) => {
      if (event.target.closest('.main-card')) {
        localStorage.setItem(PARENT_ID, `${event.target.closest('.main-card').dataset.id}`);
        localStorage.setItem(activeLinkLS, `${event.target.closest('.main-card').dataset.id}`);
      }
    })
  }
}
