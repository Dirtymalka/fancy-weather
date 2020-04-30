const addBurgerClickHandler = () => {
  document.querySelector('.burger-menu').addEventListener('click', () => {
    document.querySelector('.burger-menu').classList.toggle('active-burger');
    document.querySelector('.hamburger').classList.toggle('active-burger');
    if (document.querySelector('.burger-menu').classList.contains('active-burger')) {
      document.querySelector('.menu').style.transform = 'translate(0)';
    } else document.querySelector('.menu').style.transform = 'translate(-100%)';
  });
}

export default addBurgerClickHandler;
