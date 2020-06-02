/* eslint no-param-reassign: 'error' */
/* eslint class-methods-use-this: ['error', { 'exceptMethods': ['changeToUpperCase', 'changeToLowerCase', 'tapOnShiftSpecial', 'addClassActive'] }] */

import { keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys, keyLayoutRussianUnShift, keyLayoutRussianShift, keyLayoutRussianKeys } from './keyBoardData';
import { KEY_LANGUAGE, DEFAULT_LANGUAGE, RUSSIAN_LANGUAGE } from './constants';
import { getGeoPosition } from './map';

export default class Keyboard {
  constructor() {
    this.language = localStorage.getItem(KEY_LANGUAGE) || DEFAULT_LANGUAGE;
    this.containerBoard = document.querySelector('.keyboard-container') || '';
    this.inputSearch = document.querySelector('.header__search-input');
    this.cursor = 0;
    this.text = 0;
  }

  createKeyboardContainer() {
    const container = document.createElement('div');
    container.className = 'keyboard-container';
    document.querySelector('.search-form').append(container);
    this.containerBoard = document.querySelector('.keyboard-container');
  }

  createKeys(keyLayoutUnShift, keyLayoutShift, keyLayoutKeys) {
    if (keyLayoutUnShift === keyLayoutEnglishUnShift) {
      this.containerBoard.classList.add('english');
    }
    if (keyLayoutUnShift === keyLayoutRussianUnShift) {
      this.containerBoard.classList.add('russian');
    }
    for (let i = 0; i < keyLayoutUnShift.length; i += 1) {
      const div = document.createElement('div');
      div.className = 'key tap-shift';
      this.containerBoard.append(div);
      const sup = document.createElement('sup');
      sup.innerHTML = keyLayoutShift[i];
      div.append(sup);
      const span = document.createElement('span');
      span.innerHTML = keyLayoutUnShift[i];
      div.append(span);
    }

    keyLayoutKeys.forEach((key) => {
      const div = document.createElement('div');
      div.className = 'key';
      const divClassList = (f, a) => {
        div.classList.add(f);
        div.classList.add(a);
      };
      if (key === 'backspace') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Shift') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'space') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Left') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Right') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Enter') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'Del') {
        divClassList(key.toLowerCase(), 'special');
      }
      if (key === 'en\\ru') {
        divClassList('lang-change', 'special');
      }
      div.innerHTML = key;
      this.containerBoard.append(div);
    });

    document.querySelector('.right').textContent = '';
    document.querySelector('.left').textContent = '';
  }

  init() {
    if (this.language === DEFAULT_LANGUAGE) {
      this.createKeys(keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys);
    } else if (localStorage.getItem(DEFAULT_LANGUAGE) === RUSSIAN_LANGUAGE) {
      this.createKeys(keyLayoutRussianUnShift, keyLayoutRussianShift, keyLayoutRussianKeys);
    } else {
      this.createKeys(keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys);
    }

    this.inputSearch.onblur = () => this.inputSearch.focus();

    this.containerBoard.addEventListener('mousedown', (event) => {
      const activeButton = event.target.closest('div');

      if (activeButton.classList.contains('space')) {
        this.clickOnSpace();
      }
      if (activeButton.classList.contains('enter')) {
        this.clickOnEnter();
      }
      if (activeButton.classList.contains('backspace')) {
        this.clickOnBackspace();
      }
      if (activeButton.classList.contains('shift')) {
        event.target.classList.toggle('active');
        const keys = this.containerBoard.querySelectorAll('div');
        if (event.target.classList.contains('active')) {
          this.changeToUpperCase(keys);
        } else {
          this.changeToLowerCase(keys);
        }
        const tapShiftKeys = this.containerBoard.querySelectorAll('.tap-shift');
        this.tapOnShiftSpecial(tapShiftKeys);
      }
      if (activeButton.classList.contains('del')) {
        this.clickOnDel();
      }
      if (activeButton.classList.contains('right')) {
        this.clickOnRightArrow();
      }
      if (activeButton.classList.contains('left')) {
        this.clickOnLeftArrow();
      }
      if (activeButton.classList.contains('lang-change')) {
        this.languageChange();
      }
      if (activeButton.classList.contains('special')) {
        return;
      }
      if (!activeButton.classList.contains('key')) {
        return;
      }
      if (!activeButton) {
        return;
      }
      activeButton.classList.remove('active');
      activeButton.classList.add('active');

      this.cursorPosition();
      this.text.splice(this.inputSearch.selectionEnd, 0, (activeButton.querySelector('span') ? activeButton.querySelector('span').textContent : activeButton.textContent));
      this.inputSearch.value = this.text.join('');
      this.inputSearch.selectionEnd = this.cursor + 1;

      this.containerBoard.onmouseup = () => activeButton.classList.remove('active');
    });
  }

  languageChange() {
    if (this.containerBoard.classList.contains('russian')) {
      this.containerBoard.classList.remove('russian');
      this.containerBoard.innerHTML = '';
      this.createKeys(keyLayoutEnglishUnShift, keyLayoutEnglishShift, keyLayoutEnglishKeys);
      localStorage.setItem(DEFAULT_LANGUAGE, DEFAULT_LANGUAGE);
    } else if (this.containerBoard.classList.contains('english')) {
      this.containerBoard.classList.remove('english');
      this.containerBoard.innerHTML = '';
      this.createKeys(keyLayoutRussianUnShift, keyLayoutRussianShift, keyLayoutRussianKeys);
      localStorage.setItem(DEFAULT_LANGUAGE, RUSSIAN_LANGUAGE);
    }
  }

  cursorPosition() {
    this.inputSearch.selectionEnd = this.inputSearch.selectionStart;
    this.cursor = this.inputSearch.selectionEnd;
    this.text = this.inputSearch.value.split('');
  }

  inputSearchToString() {
    this.inputSearch.value = this.text.join('');
  };

  clickOnBackspace() {
    if (this.inputSearch.selectionStart === 0) {
      return;
    }
    this.cursorPosition();
    this.text.splice(this.inputSearch.selectionEnd - 1, 1);
    this.inputSearchToString();
    this.inputSearch.selectionEnd = this.cursor - 1;
  }

  clickOnEnter() {
    getGeoPosition();
    this.addClassActive()
  }

  clickOnDel() {
    if (this.inputSearch.selectionStart === this.inputSearch.value.length) {
      return;
    }
    this.cursorPosition();
    this.text.splice(this.inputSearch.selectionEnd, 1);
    this.inputSearchToString();
    this.inputSearch.selectionEnd = this.cursor;
  }

  clickOnRightArrow() {
    if (this.inputSearch.selectionEnd === this.inputSearch.value.length) {
      return;
    }
    this.cursorPosition();
    this.inputSearch.selectionStart = this.cursor + 1;
  }

  clickOnLeftArrow() {
    if (this.inputSearch.selectionStart === 0) {
      return;
    }
    this.cursorPosition();
    this.inputSearch.selectionEnd = this.cursor - 1;
  }

  clickOnSpace() {
    this.cursorPosition();
    this.text.splice(this.inputSearch.selectionEnd, 0, ' ');
    this.inputSearchToString();
    this.inputSearch.selectionEnd = this.cursor + 1;
  }

  changeToUpperCase(keys) {
    keys.forEach((letter) => {
      if (!letter.classList.contains('tap-shift') && !letter.classList.contains('special')) {
        letter.textContent = letter.textContent.toUpperCase();
      }
    });
  };

  changeToLowerCase(keys) {
    keys.forEach((letter) => {
      if (!letter.classList.contains('tap-shift') && !letter.classList.contains('special')) {
        letter.textContent = letter.textContent.toLowerCase();
      }
    });
  };

  tapOnShiftSpecial(keys) {
    keys.forEach((key) => {
      const supKeyContent = key.querySelector('sup').textContent;
      const spanKeyContent = key.querySelector('span').textContent;
      key.querySelector('sup').textContent = spanKeyContent;
      key.querySelector('span').textContent = supKeyContent;
    });
  };

  addClassActive() {
    document.querySelector('.keyboard-container').classList.toggle('active');
  }
}
