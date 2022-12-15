export function deleteFromLocalStorage(key) {
  const id = document.querySelector('.information').dataset.id;
  removeItemForButtonTextContent(id, key);
  const savedData = JSON.parse(localStorage.getItem(key));
  const movies = [...savedData];
  const index = movies.findIndex(movie => movie.id === id);
  movies.splice(index, 1);
  localStorage.setItem(key, JSON.stringify(movies));
}

function removeItemForButtonTextContent(id, key) {
  const savedData = JSON.parse(localStorage.getItem(id));
  const buttons = [...savedData];
  const index = buttons.indexOf(key);
  buttons.splice(index, 1);

  if (!buttons.length) {
    localStorage.removeItem(id);
  } else {
    localStorage.setItem(id, JSON.stringify(buttons));
  }
}
