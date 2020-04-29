function saveData(key, data) {
  const dataItem = isDataString(data) ? data : JSON.stringify(data);
  localStorage.setItem(key, dataItem);
}

function getData(key) {
  return JSON.parse(localStorage.getItem(key));
}

function isDataString(data) {
    return typeof data === 'string';
}

export { saveData, getData };
