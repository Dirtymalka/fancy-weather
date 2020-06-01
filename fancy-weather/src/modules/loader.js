const addLoader = () => {
  const loaderLayout = `
  <section class="loader">
  <section class="loader__item loader__circle loader__circle-1"></section>
  <section class="loader__item loader__circle loader__circle-2"></section>
  <section class="loader__item loader__circle loader__circle-3"></section>
  <section class="loader__item loader__pulse"></section>
</section>`;
document.querySelector('.app-wrapper').insertAdjacentHTML('afterbegin', loaderLayout);
}

const removeLoader = () => {
  document.querySelector('.loader').outerHTML = '';
}

export { addLoader, removeLoader };
