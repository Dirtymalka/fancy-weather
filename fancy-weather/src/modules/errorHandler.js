const errorHandler = () => {
  document.querySelector('.header__search-input').value = '';
    document.querySelector('.header__search-input').setAttribute('placeholder', 'The request failed. Please repeat.');
    document.querySelector('.header__search-input').classList.add('error');
}

export default errorHandler;
