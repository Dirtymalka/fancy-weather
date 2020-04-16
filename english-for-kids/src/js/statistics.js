import statisticsArr from './statisticsData';

export default class Statistics {
  constructor(statisticsData) {
    this.statisticsData = statisticsData;
    this.statisticsTable = document.querySelector('.statistics');
  }

  createStatisticsTable(data) {
    this.statisticsTable.innerHTML = '<caption><span>Statistics</span><button class="reset">Reset</button><button class="repeat-words">Repeat difficult words</button></caption><tr><th rowspan="2" class="title"><span>Category</span><img class="sort" data-name="category" src="./img/sort.svg"></th><th rowspan="2" class="title">Word<img class="sort" data-name="word" src="./img/sort.svg"></th><th rowspan="2" class="title">Translate<img class="sort" data-name="translation" src="./img/sort.svg"></th><th rowspan="2" class="title">Train Mode<img class="sort" data-name="train" src="./img/sort.svg"></th><th colspan="3">Game Mode</th></tr><tr><th class="title">Correct<img class="sort" data-name="correct" src="./img/sort.svg"></th><th class="title">Error<img class="sort" data-name="error" src="./img/sort.svg"></th><th class="title">Percent of Error<img class="sort" data-name="percent" src="./img/sort.svg"></th></tr>';
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
          continue;
        }
        const tab = document.createElement('td');
        tab.innerHTML = card[arrOfKeys[i]];
        row.append(tab);
      }
      this.statisticsTable.append(row);
    });
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
      }
    });
  }

  resetTable() {
    document.querySelector('.reset').onclick = () => {
      localStorage.removeItem('statisticsArr');
      this.statisticsTable.innerHTML = '';
      this.createStatisticsTable(statisticsArr);
      document.location.href = "/statistics.html";
    }
  }

  static repeatDifficultWords() {
    document.querySelector('.repeat-words').onclick = () => {
      let arrWords = JSON.parse(localStorage.getItem('statisticsArr'));
      console.log(arrWords);
      arrWords.sort((a, b) => b.percent - a.percent);
      arrWords.length = 7;
      console.log(arrWords);
    }
  }
}
