import statisticsArrZero from './statisticsData';
const positionSwitch = 'switch';

const statisticsArrLS = 'statisticsArr';
export default class Statistics {
  constructor(statisticsData) {
    this.statisticsData = statisticsData;
    this.statisticsTable = document.querySelector('.statistics');
    this.cardsContainer = document.querySelector('.cards-container');
  }

  createStatisticsTable(data) {
    let dataCreate;
    if (data) {
      dataCreate = data;
    }
    dataCreate = this.statisticsData;
    localStorage.setItem(positionSwitch, 'on');
    this.statisticsTable.innerHTML = '<caption><span>Statistics</span><button class="reset">Reset</button><button class="repeat-words">Repeat difficult words</button></caption><tr><th rowspan="2" class="title"><span>Category</span><img class="sort" data-name="category" src="./img/sort.svg"></th><th rowspan="2" class="title">Word<img class="sort" data-name="word" src="./img/sort.svg"></th><th rowspan="2" class="title">Translate<img class="sort" data-name="translation" src="./img/sort.svg"></th><th rowspan="2" class="title">Train Mode<img class="sort" data-name="train" src="./img/sort.svg"></th><th colspan="3">Game Mode</th></tr><tr><th class="title">Correct<img class="sort" data-name="correct" src="./img/sort.svg"></th><th class="title">Error<img class="sort" data-name="error" src="./img/sort.svg"></th><th class="title">Percent of Error<img class="sort" data-name="percent" src="./img/sort.svg"></th></tr>';
    const localStats = JSON.parse(localStorage.getItem(statisticsArrLS));
    dataCreate.forEach((card, index) => {
      const row = document.createElement('tr');
      let correct = 0;
      let error = 0;
      const arrOfKeys = Object.keys(card);


      arrOfKeys.forEach((key) => {
        if (key === 'correct') {
          correct = card[key];
        }
        if (key === 'error') {
          error = card[key];
        }
        if (key === 'percent') {
          const tabPercent = document.createElement('td');
          tabPercent.innerHTML = Math.floor(error * 100 / (correct + error)) || '0';
          row.append(tabPercent);
          if (localStats) {
            localStats[index].percent = +(tabPercent.innerHTML);
          }
          return;
        }
        const tab = document.createElement('td');
        tab.innerHTML = card[key];
        row.append(tab);
      });
      this.statisticsTable.append(row);

    });
    this.statisticsData = localStats;
    localStorage.setItem(statisticsArrLS, JSON.stringify(localStats));
    this.resetTable();
  }

  sortTable() {
    this.statisticsTable.addEventListener('click', (event) => {
      const sortingTable = this.statisticsData.slice();
      if (event.target.classList.contains('sort')) {
        const parameter = event.target.dataset.name;
        if (!this.statisticsTable.classList.contains('ascending')) {
          this.statisticsTable.classList.toggle('ascending');
          this.statisticsTable.classList.remove('descending');
          sortingTable.sort((a, b) => {
            if (b[parameter] === a[parameter]) {
              return 0;
            }
            if (parameter === 'percent') {
              return +(b[parameter]) > +(a[parameter]) ? -1 : 1;
            }
            return b[parameter] > a[parameter] ? -1 : 1;
          });
        } else {
          this.statisticsTable.classList.toggle('descending');
          this.statisticsTable.classList.remove('ascending');
          sortingTable.sort((a, b) => {
            if (b[parameter] === a[parameter]) {
              return 0;
            }
            if (parameter === 'percent') {
              return +(b[parameter]) > +(a[parameter]) ? 1 : -1;
            }
            return b[parameter] > a[parameter] ? 1 : -1;
          });

        }
        this.statisticsData = sortingTable;
        localStorage.setItem(statisticsArrLS, JSON.stringify(sortingTable));
        document.querySelector('.statistics').innerHTML = '';
        this.createStatisticsTable(sortingTable);
        this.resetTable();
        Statistics.repeatDifficultWords();
      }
    });
  }

  resetTable() {
    document.querySelector('.reset').onclick = () => {
      this.statisticsTable.innerHTML = '';
      this.statisticsData = statisticsArrZero;
      localStorage.setItem(statisticsArrLS, JSON.stringify(statisticsArrZero));
      this.createStatisticsTable(statisticsArrZero);
    }
  }

  static repeatDifficultWords() {
    document.querySelector('.repeat-words').addEventListener('click', () => {
      const cardsContainer = document.querySelector('.cards-container');
      const difficultWords = Statistics.sortDifficultWords();
      const audio = Statistics.createAudio();
      document.querySelector('.statistics').innerHTML = '';
      difficultWords.forEach((card) => {
        const CardWord = Statistics.createWordsCard(card);
        cardsContainer.append(CardWord);
      });
      cardsContainer.append(audio);
    });
  }

  static sortDifficultWords() {
    const arrWords = JSON.parse(localStorage.getItem(statisticsArrLS));
    const sortWords = [];
    arrWords.sort((a, b) => b.percent - a.percent).map((item) => item.percent > 0 ? sortWords.push(item) : 0);
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
      if (event.target.classList.contains('rotate')) {
        event.target.closest('.card').classList.add('translate');
        event.target.closest('.card').onmouseleave = (ev) => {
          ev.target.closest('.card').classList.remove('translate');
        }
      }
      if (event.target.classList.contains('front') && !event.target.classList.contains('rotate')) {
        const statisticsArrJSON = JSON.parse(localStorage.getItem(statisticsArrLS));
        statisticsArrJSON.forEach((item) => {
          const card = item;
          if (card.word === event.target.firstElementChild.innerHTML) {
            card.train += 1;
            localStorage.setItem(statisticsArrLS, JSON.stringify(statisticsArrJSON));
          }
        })
        difficultWords.forEach((elem) => {
          if (elem.word === event.target.querySelector('.card-header').innerHTML) {
            document.querySelector('.audio').setAttribute('src', `https://wooordhunt.ru//data/sound/word/us/mp3/${event.target.querySelector('.card-header').innerText}.mp3`);
            document.querySelector('.audio').play();
          }
        })
      }
    });
  }
}
