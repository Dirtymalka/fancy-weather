// const cardsContainer = document.querySelector('.cards-container');

export default class LinkedCards {

  constructor(data) {
    this.data = data // cards.linkedCards
    this.cardsContainer = document.querySelector('.cards-container');
  }

  createLinkedField() {
    const ratingField = this.createRatingField();
    const audio = this.createAudio();
    const soundEffect = this.createSoundEffects();
    this.cardsContainer.append(ratingField);
    this.data.forEach((card) => {
      const linkedCard = this.createLinkedCard(card);
      this.cardsContainer.append(linkedCard);
    });
    this.cardsContainer.append(audio);
    this.cardsContainer.append(soundEffect);
  }

  createAudio() {
    const audioElement = document.createElement('audio');
    audioElement.className = 'audio';
    return audioElement;
  }

  createSoundEffects() {
    const audioElement = document.createElement('audio');
    audioElement.className = 'sound-effect';
    return audioElement;
  }

  createLinkedCard(cardData) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-container';
    cardElement.innerHTML = `<div class="card"> <div class="front" style="background-image: url(${cardData.image})" data-id="${cardData.id}"> <div class="card-header">${cardData.word}</div> </div> <div class="back" style="background-image: url(${cardData.image})"> <div class="card-header">${cardData.translation}</div> </div ><div class="rotate"></div> </div>`;
    //cardElement.setAttribute('data-id', `${cardData.id}`);
    return cardElement;
  }

  createRatingField() {
    const ratingElement = document.createElement('div');
    ratingElement.classList = 'rating none';
    return ratingElement;
  }

  addCardsContainerClickHandler() {
    this.cardsContainer.addEventListener('click', (event) => {
      if (event.target.classList.contains('rotate')) {
        event.target.closest('.card').classList.add('translate');
        event.target.closest('.card').onmouseleave = function (ev) {
          ev.target.closest('.card').classList.remove('translate');
        }
      }

      if (event.target.classList.contains('front') && !event.target.classList.contains('rotate')) {
        this.data.forEach((elem) => {
          if (elem.id == event.target.dataset.id) {
            document.querySelector('.audio').setAttribute('src', `https://wooordhunt.ru//data/sound/word/us/mp3/${elem.word}.mp3`);
            document.querySelector('.audio').play();
          }
        })
      }
    });
  }

}
