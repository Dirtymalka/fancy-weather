// const cardsContainer = document.querySelector('.cards-container');
// import statisticsArr from './statisticsData';
export default class LinkedCards {

  constructor(data) {
    this.data = data // cards.linkedCards
    this.cardsContainer = document.querySelector('.cards-container');
  }

  createLinkedField() {
    const ratingField = LinkedCards.createRatingField();
    const buttonStart = LinkedCards.createButtonStart();
    const audio = LinkedCards.createAudio();
    const soundEffect = LinkedCards.createSoundEffects();
    this.cardsContainer.append(ratingField);
    this.data.forEach((card) => {
      const linkedCard = LinkedCards.createLinkedCard(card);
      this.cardsContainer.append(linkedCard);
    });
    this.cardsContainer.append(buttonStart);
    this.cardsContainer.append(audio);
    this.cardsContainer.append(soundEffect);
  }

  static createButtonStart() {
    const buttonContainerElement = document.createElement('div');
    buttonContainerElement.className = 'button-container';
    const buttonElement = document.createElement('button');
    buttonElement.className = 'button-start none';
    buttonElement.innerHTML = 'Start game';
    buttonContainerElement.append(buttonElement);
    return buttonContainerElement;
  }

  static createAudio() {
    const audioElement = document.createElement('audio');
    audioElement.className = 'audio';
    return audioElement;
  }

  static createSoundEffects() {
    const audioElement = document.createElement('audio');
    audioElement.className = 'sound-effect';
    return audioElement;
  }

  static createLinkedCard(cardData) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-container';
    cardElement.innerHTML = `<div class="card"> <div class="front" style="background-image: url(${cardData.image})" data-id="${cardData.id}"> <div class="card-header">${cardData.word}</div> </div> <div class="back" style="background-image: url(${cardData.image})"> <div class="card-header">${cardData.translation}</div> </div ><div class="rotate"></div> </div>`;
    return cardElement;
  }

  static createRatingField() {
    const ratingElement = document.createElement('div');
    ratingElement.classList = 'rating none';
    return ratingElement;
  }

  addCardsContainerClickHandler() {
    this.cardsContainer.addEventListener('click', (event) => {
      document.querySelector('.burger-menu').classList.remove('active-burger');
      document.querySelector('.hamburger').classList.remove('active-burger');
      document.querySelector('.menu').style.transform = 'translate(-100%)';
      if (document.querySelector('.switch-input').checked) {
        if (event.target.classList.contains('rotate')) {
          event.target.closest('.card').classList.add('translate');
          event.target.closest('.card').onmouseleave = function (ev) {
            ev.target.closest('.card').classList.remove('translate');
          }
        }
        if (event.target.classList.contains('front') && !event.target.classList.contains('rotate')) {
          const statisticsArrJSON = JSON.parse(localStorage.getItem('statisticsArr'));
          console.log(statisticsArrJSON);
          statisticsArrJSON.forEach((item) => {
            const card = item;
            if (card.word === event.target.firstElementChild.innerHTML) {
              card.train +=1;
              localStorage.removeItem('statisticsArr');
              localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArrJSON)}`)
            }
          })
          this.data.forEach((elem) => {
            if (elem.id === event.target.dataset.id) {
              document.querySelector('.audio').setAttribute('src', `https://wooordhunt.ru//data/sound/word/us/mp3/${elem.word}.mp3`);
              document.querySelector('.audio').play();
            }
          })
        }
      }

    });
  }

}
