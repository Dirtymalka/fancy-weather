import cards from './cards';


const STATISTICS_DATA = 'statistics_data';
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

if (!localStorage.getItem(STATISTICS_DATA)) {
  localStorage.setItem(STATISTICS_DATA, JSON.stringify(statisticsArrZero));
}
