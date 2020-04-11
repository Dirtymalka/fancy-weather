const mainContainer = document.querySelector('.main-container')

export default class MainCards {
  constructor(data) {
    this.data = data;
  }

  createMainField() {
    this.data.forEach((card) => {
      const mainCard = this.createMainCard(card);
      mainContainer.append(mainCard);
    });
  }

  createMainCard(cardData) {
    const cardElement = document.createElement('a');
    cardElement.className = 'main-card green';
    cardElement.innerHTML = `<img src="${cardData.img}" alt="${cardData.name}">${cardData.name}`;
    return cardElement;
  }
}
