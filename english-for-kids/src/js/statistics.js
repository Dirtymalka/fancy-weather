import statisticsArr from './statisticsData';
import cards from './cards';
// import firstStatisticsArr from './statisticsData';

export default class Statistics {
  constructor(statisticsData) {
    this.statisticsData = statisticsData;
    this.statisticsTable = document.querySelector('.statistics');
    this.cardsContainer = document.querySelector('.cards-container');
  }

  createStatisticsTable(data) {
    // document.querySelector('.switch-input').checkBox.checked = true;
    localStorage.removeItem('switch'); // ######################################### LocalStorage #####################################################
    localStorage.setItem('switch', 'on');
    this.statisticsTable.innerHTML = '<caption><span>Statistics</span><button class="reset">Reset</button><button class="repeat-words">Repeat difficult words</button></caption><tr><th rowspan="2" class="title"><span>Category</span><img class="sort" data-name="category" src="./img/sort.svg"></th><th rowspan="2" class="title">Word<img class="sort" data-name="word" src="./img/sort.svg"></th><th rowspan="2" class="title">Translate<img class="sort" data-name="translation" src="./img/sort.svg"></th><th rowspan="2" class="title">Train Mode<img class="sort" data-name="train" src="./img/sort.svg"></th><th colspan="3">Game Mode</th></tr><tr><th class="title">Correct<img class="sort" data-name="correct" src="./img/sort.svg"></th><th class="title">Error<img class="sort" data-name="error" src="./img/sort.svg"></th><th class="title">Percent of Error<img class="sort" data-name="percent" src="./img/sort.svg"></th></tr>';
    const localStats = JSON.parse(localStorage.getItem('statisticsArr'));
    console.log(localStats);
    data.forEach((card, index) => {
      const row = document.createElement('tr');
      let correct = 0;
      let error = 0;
      const arrOfKeys = Object.keys(card);

      for (let i = 0; i < arrOfKeys.length; i += 1) {
        if (arrOfKeys[i] === 'correct') {
          correct = card[arrOfKeys[i]];
        }
        if (arrOfKeys[i] === 'error') {
          error = card[arrOfKeys[i]];
        }
        if (arrOfKeys[i] === 'percent') {
          const tabPercent = document.createElement('td');
          // tabPercent.className = `${arrOfKeys[i]}`;

          tabPercent.innerHTML = Math.floor(error * 100 / (correct + error)) || 0;
          row.append(tabPercent);
          data[index].percent = tabPercent.innerHTML;
          if (localStats) {
            localStats[index].percent = +(tabPercent.innerHTML);
          }
          continue;
        }
        const tab = document.createElement('td');
        tab.innerHTML = card[arrOfKeys[i]];
        row.append(tab);
      }
      this.statisticsTable.append(row);
    });
    localStorage.removeItem('statisticsArr');
    localStorage.setItem('statisticsArr', `${JSON.stringify(localStats)}`)
  }

  sortTable() {
    this.statisticsTable.addEventListener('click', (event) => {
      if (event.target.classList.contains('sort')) {
        if (!this.statisticsTable.classList.contains('ascending')) {
          this.statisticsTable.classList.add('ascending');
          const parameter = event.target.dataset.name;
          this.statisticsData.sort((a, b) => {
            if (b[parameter] === a[parameter]) return 0;
            return b[parameter] > a[parameter] ? -1 : 1;
          });
          document.querySelector('.statistics').innerHTML = '';
          this.createStatisticsTable(this.statisticsData);
          return;
        }
        this.statisticsTable.classList.toggle('descending');
        this.statisticsTable.classList.remove('ascending');
        const parameter = event.target.dataset.name;
        this.statisticsData.sort((a, b) => {
          if (b[parameter] === a[parameter]) return 0;
          return b[parameter] > a[parameter] ? 1 : -1;
        });;
        document.querySelector('.statistics').innerHTML = '';
        this.createStatisticsTable(this.statisticsData);
        this.resetTable();
        Statistics.repeatDifficultWords();
      }
    });
  }

  resetTable() {
    document.querySelector('.reset').onclick = () => {
      console.log(statisticsArr);
      //localStorage.removeItem('statisticsArr');
      console.log(this.statisticsData);
      // localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArr)}`);
      //this.statisticsTable.innerHTML = '';
      //this.createStatisticsTable(statisticsArr);
      //document.location.href = "/statistics.html";
    }
  }

  static repeatDifficultWords() {
    document.querySelector('.repeat-words').onclick = () => {
      const cardsContainer = document.querySelector('.cards-container');
      const difficultWords = Statistics.sortDifficultWords();
      const audio = Statistics.createAudio();
      document.querySelector('.statistics').innerHTML = '';
      difficultWords.forEach((card) => {
        const CardWord = Statistics.createWordsCard(card);
        cardsContainer.append(CardWord);
      });
      cardsContainer.append(audio);
    }
  }

  static sortDifficultWords() {
    let arrWords = JSON.parse(localStorage.getItem('statisticsArr'));
    let sortWords = [];
    arrWords.sort((a, b) => b.percent - a.percent).map((item) => item.percent > 0 ? sortWords.push(item) : null);
    if (sortWords.length > 8) {
      sortWords.length = 8;
    }
    return sortWords;
  }

  createWordsField() {
    const difficultWords = Statistics.sortDifficultWords();
    const audio = Statistics.createAudio();
    difficultWords.forEach((card) => {
      const CardWord = Statistics.createWordsCard(card);
      this.cardsContainer.append(CardWord);
    });
    this.cardsContainer.append(audio);
  }

  static createAudio() {
    const audioElement = document.createElement('audio');
    audioElement.className = 'audio';
    return audioElement;
  }

  static createWordsCard(cardData) {
    const cardElement = document.createElement('div');
    cardElement.className = 'card-container';
    cardElement.innerHTML = `<div class="card"> <div class="front" style="background-image: url(img/${cardData.word}.jpg)" data-id="${cardData.id}"> <div class="card-header">${cardData.word}</div> </div> <div class="back" style="background-image: url(img/${cardData.word}.jpg)"> <div class="card-header">${cardData.translation}</div> </div ><div class="rotate"></div> </div>`;
    return cardElement;
  }

  static addWordsContainerClickHandler() {
    const cardsContainer = document.querySelector('.cards-container');
    const difficultWords = Statistics.sortDifficultWords();
    cardsContainer.addEventListener('click', (event) => {
      document.querySelector('.burger-menu').classList.remove('active-burger');
      document.querySelector('.hamburger').classList.remove('active-burger');
      document.querySelector('.menu').style.transform = 'translate(-100%)';
      if (event.target.classList.contains('rotate')) {
        event.target.closest('.card').classList.add('translate');
        event.target.closest('.card').onmouseleave = function (ev) {
          ev.target.closest('.card').classList.remove('translate');
        }
      }
      if (event.target.classList.contains('front') && !event.target.classList.contains('rotate')) {
        const statisticsArrJSON = JSON.parse(localStorage.getItem('statisticsArr'));
        statisticsArrJSON.forEach((item) => {
          const card = item;
          if (card.word === event.target.firstElementChild.innerHTML) {
            card.train += 1;
            localStorage.removeItem('statisticsArr');
            localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArrJSON)}`)
          }
        })
        difficultWords.forEach((elem) => {
          console.log('d')
          if (elem.word === event.target.querySelector('.card-header').innerHTML) {
            console.log('d')
            document.querySelector('.audio').setAttribute('src', `https://wooordhunt.ru//data/sound/word/us/mp3/${event.target.querySelector('.card-header').innerHTML}.mp3`);
            document.querySelector('.audio').play();
          }
        })
      }
    });
  }
}
