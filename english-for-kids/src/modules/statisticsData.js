import cards from './cards';


const statisticsArrLS = 'statisticsArr';
const statisticsArrZero = [];

const createStatisticsData = () => {
  cards.forEach(mainCard => {
    mainCard.linkedCards.forEach(linkedCard => {
      const newCard = {
        category: mainCard.name,
        word: linkedCard.word,
        translation: linkedCard.translation,
        train: 0,
        correct: 0,
        error: 0,
        percent: 0,
      }
      statisticsArrZero.push(newCard);
    });
  });
}


createStatisticsData();

export default statisticsArrZero;

if (!localStorage.getItem(statisticsArrLS)) {
  localStorage.setItem(statisticsArrLS, JSON.stringify(statisticsArrZero));
}
