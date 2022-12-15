export function addToLocalStorage(key) {
  const id = document.querySelector('.information').dataset.id;
  setItemForButtonTextContent(id, key);

  const genres = document.querySelector('[data-name="genres"]').textContent;
  const originalTitle = document.querySelector(
    '[data-name="original-title"]'
  ).textContent;
  const overview = document.querySelector('[data-name="overview"]').textContent;
  const popularity = document.querySelector(
    '[data-name="popularity"]'
  ).textContent;
  const posterPath = document.querySelector('[data-name="poster-path"]').src;
  const year = document.querySelector('.information').dataset.year;
  const title = document.querySelector('[data-name="title"]').textContent;
  const voteAverage = document.querySelector(
    '[data-name="vote-average"]'
  ).textContent;
  const voteCount = document.querySelector(
    '[data-name="vote-count"]'
  ).textContent;

  const savedData = JSON.parse(localStorage.getItem(key));
  if (!savedData) {
    const movies = [];
    const movie = {
      id,
      genres,
      originalTitle,
      overview,
      popularity,
      posterPath,
      year,
      title,
      voteAverage,
      voteCount,
    };
    movies.push(movie);

    localStorage.setItem(key, JSON.stringify(movies));
  } else {
    const movies = [...savedData];
    if (movies.every(movie => movie.id !== id)) {
      const movie = {
        id,
        genres,
        originalTitle,
        overview,
        popularity,
        posterPath,
        year,
        title,
        voteAverage,
        voteCount,
      };
      movies.push(movie);

      localStorage.setItem(key, JSON.stringify(movies));
    }
  }
}

function setItemForButtonTextContent(id, key) {
  const savedData = JSON.parse(localStorage.getItem(id));
  if (!savedData) {
    const buttons = [];
    buttons.push(key);
    localStorage.setItem(id, JSON.stringify(buttons));
  } else {
    const buttons = [...savedData];
    buttons.push(key);
    localStorage.setItem(id, JSON.stringify(buttons));
  }
}
