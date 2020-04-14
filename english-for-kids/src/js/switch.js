const switchEventListener = function () {
  document.querySelector('.switch').addEventListener('click', () => {
    const checkBox = document.querySelector('.switch-input');
    if (checkBox.checked) {
      checkBox.checked = false;
      addStylesWithSwitchOff();
      localStorage.removeItem('switch'); // ######################################### LocalStorage #####################################################
      localStorage.setItem('switch', 'off'); // ######################################### LocalStorage #####################################################
    }
    else {
      if (localStorage.getItem('startGame')) {
        console.log('rety')
        localStorage.removeItem('startGame');
        document.querySelectorAll('.front').forEach(front => {
          front.classList.remove('inactive');
        })
        document.querySelector('.rating').innerHTML = '';
        document.querySelector('.button-start').classList.remove('repeat');
      }
      checkBox.checked = true;
      addStylesWithSwitchOn();
      localStorage.removeItem('switch'); // ######################################### LocalStorage #####################################################
      localStorage.setItem('switch', 'on'); // ######################################### LocalStorage #####################################################
    }
  })
}

const addStylesWithSwitchOff = function () {
  document.querySelector('.switch-input').checked = false;
  document.querySelector('.menu').classList.remove('green');
  document.querySelectorAll('.main-card').forEach(card => {
    card.classList.remove('green');
  });
  document.querySelectorAll('.card').forEach(card => {
    card.classList.add('card-cover');
  });
  document.querySelectorAll('.card-header').forEach(card => {
    card.classList.add('none');
  });
  document.querySelectorAll('.rotate').forEach(card => {
    card.classList.add('none');
  });
  if (document.querySelector('.rating')) document.querySelector('.rating').classList.remove('none');
  if (document.querySelector('.button-start')) document.querySelector('.button-start').classList.remove('none');
}

const addStylesWithSwitchOn = function () {
  document.querySelector('.switch-input').checked = true;
  document.querySelector('.menu').classList.add('green');
  document.querySelectorAll('.main-card').forEach(card => {
    card.classList.add('green');
  });
  document.querySelectorAll('.card').forEach(card => {
    card.classList.remove('card-cover');
  });
  document.querySelectorAll('.card-header').forEach(card => {
    card.classList.remove('none');
  });
  document.querySelectorAll('.rotate').forEach(card => {
    card.classList.remove('none');
  });
  if (document.querySelector('.rating')) document.querySelector('.rating').classList.add('none');
  if (document.querySelector('.button-start')) document.querySelector('.button-start').classList.add('none');
}

export {switchEventListener, addStylesWithSwitchOff, addStylesWithSwitchOn};
