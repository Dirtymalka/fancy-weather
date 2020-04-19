import cards from './cards';

const arrAudio = [];
const arrAudioRandom = [];
const arrPlayedAudio = [];

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

function createSoundEffects() {
  arrAudioRandom.length = 0;
  cards.forEach(mainCard => {
    if (mainCard.id === localStorage.getItem('parentId')) {
      mainCard.linkedCards.forEach(card => {
        arrAudio.push({ id: card.id, audio: card.audioSrc });
      });
    }
  });
  for (let i = arrAudio.length - 1; i >= 0; i -= 1) {
    const randomAudio = randomInteger(0, i);
    arrAudioRandom.push(arrAudio[randomAudio]);
    arrAudio.splice(randomAudio, 1);
  }
}

const playSoundEffect = function () {
  document.querySelector('.audio').setAttribute('src', arrAudioRandom[arrAudioRandom.length - 1].audio);
  document.querySelector('.audio').play();
  arrPlayedAudio.push(arrAudioRandom.pop());
}

function addButtonStartHandler(event) {
  if (!localStorage.getItem('startGame')) {
    document.querySelector('.button-start').classList.add('repeat');
    localStorage.setItem('startGame', 'true');

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

        const statisticsArrJSON = JSON.parse(localStorage.getItem('statisticsArr'));
        statisticsArrJSON.forEach((card) => {
          if (card.word === event.target.firstElementChild.innerHTML) {
            card.correct += 1;
            localStorage.removeItem('statisticsArr');
            localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArrJSON)}`)
          }
        })

        document.querySelector('.sound-effect').setAttribute('src', 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/correct.mp3');
        document.querySelector('.sound-effect').play();
        createCorrectStar();
        ev.target.classList.add('inactive');
        if (arrAudioRandom.length === 0) {
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

      const statisticsArrJSON = JSON.parse(localStorage.getItem('statisticsArr'));
      statisticsArrJSON.forEach((card) => {
        if (card.word === event.target.firstElementChild.innerHTML) {
          card.error += 1;
          localStorage.removeItem('statisticsArr');
          localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArrJSON)}`)
        }
      })

      document.querySelector('.sound-effect').setAttribute('src', 'https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/rslang/english-for.kids.data/audio/error.mp3');
      document.querySelector('.sound-effect').play();
      createErrorStar();
    }
  }
}


export { addCardsGameModeHandler, addButtonStartHandler };
