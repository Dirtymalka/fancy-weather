export default class Statistics {
  constructor(statisticsData) {
    this.statisticsData = statisticsData;
    this.statisticsTable = document.querySelector('.statistics');
  }

  createStatisticsTable() {
    this.statisticsTable.innerHTML = '<caption>Statistics</caption><tr><th rowspan="2" class="title"><span>Category</span><img class="sort" data-name="category" src="./img/sort.svg"></th><th rowspan="2" class="title">Word<img class="sort" data-name="word" src="./img/sort.svg"></th><th rowspan="2" class="title">Translate<img class="sort" data-name="translation" src="./img/sort.svg"></th><th rowspan="2" class="title">Train Mode<img class="sort" data-name="train" src="./img/sort.svg"></th><th colspan="3">Game Mode</th></tr><tr><th class="title">Correct<img class="sort" data-name="correct" src="./img/sort.svg"></th><th class="title">Error<img class="sort" data-name="error" src="./img/sort.svg"></th><th class="title">Percent<img class="sort" data-name="percent" src="./img/sort.svg"></th></tr>';
    this.statisticsData.forEach((card, index) => {
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
          this.statisticsData[index].percent = tabPercent.innerHTML;
          continue;
        }

        const tab = document.createElement('td');
        // tab.className = `${arrOfKeys[i]}`
        tab.innerHTML = card[arrOfKeys[i]];
        row.append(tab);
      }
      this.statisticsTable.append(row);
    });
    console.log(this.statisticsData);
    // localStorage.removeItem('statisticsArr');
    // localStorage.setItem('statisticsArr', `${JSON.stringify(this.statisticsData)}`);
  }

  sortTable() {
    this.statisticsTable.addEventListener('click', (event) => {
      console.log(event.target.dataset.name)
      if (event.target.classList.contains('sort')) {
        if (!this.statisticsTable.classList.contains('ascending')) {
          this.statisticsTable.classList.add('ascending');
          const parameter = event.target.dataset.name;
          this.statisticsData.sort((a, b) => {
            console.log(b[parameter])
            if (b[parameter] === a[parameter]) return 0;
            return b[parameter] > a[parameter] ? -1 : 1;
          });
          document.querySelector('.statistics').innerHTML = '';
          this.createStatisticsTable();
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
        this.createStatisticsTable();
      }
    })
    // document.querySelectorAll('.sort').forEach((item) => {
    //   item.addEventListener('click', (event) => {
    //     let parameter = event.target.dataset.name;
    //     this.statisticsData.sort((a, b) => b[event.target.dataset.name] > a[event.target.dataset.name] ? -1 : 1);
    //     document.querySelector('.statistics').innerHTML = '';
    //     this.createStatisticsTable(this.statisticsData);
    //   })
    // })
  }
}
