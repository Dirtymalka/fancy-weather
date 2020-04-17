import cards from './cards';



let statisticsArr = [];

const createStatisticsData = function() {
  if(localStorage.getItem('statisticsArr') !== null && localStorage.getItem('statisticsArr') !== undefined) {
    statisticsArr = JSON.parse(localStorage.getItem('statisticsArr'));
    return;
  }
  cards.forEach(cat => {
    const obj = {};
    obj.category = cat.name;
    cat.linkedCards.forEach(card => {
      const clone = Object.defineProperties({}, Object.getOwnPropertyDescriptors(obj));
      clone.word = card.word;
      clone.translation = card.translation;
      clone.train = 0;
      clone.correct = 0;
      clone.error = 0;
      clone.percent = 0;
      statisticsArr.push(clone);
    });
  });
}


createStatisticsData();

export default statisticsArr;


// const statisticsArrJSON = Object.assign([], statisticsArr);
 localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArr)}`)
