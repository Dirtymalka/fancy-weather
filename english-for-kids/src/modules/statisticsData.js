import cards from './cards';



const statisticsArrZero = [];

const createStatisticsData = function() {
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
      statisticsArrZero.push(clone);
    });
  });
}


createStatisticsData();

export default statisticsArrZero;

if(!localStorage.getItem('statisticsArr') || localStorage.getItem('statisticsArr') === 'null') {
  localStorage.setItem('statisticsArr', `${JSON.stringify(statisticsArrZero)}`)
  }
