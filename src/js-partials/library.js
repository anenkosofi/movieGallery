const movieList = document.querySelector('.movie-list');
const headerButtons = document.querySelector('[data-name="header-wrapper"]');

headerButtons.addEventListener('click', onDisplayMovie);

function onDisplayMovie(e) {
  const watchedButton = 'watched';
  const queueButton = 'queue';
  if (e.target.closest('button').dataset.name === watchedButton) {
    const localStorageKey = 'add-to-watched';
    clearMarkup(movieList);
    const moviesToWatched = JSON.parse(localStorage.getItem(localStorageKey));
    renderMovieListInMyLibrary(moviesToWatched);
  } else if (e.target.closest('button').dataset.name === queueButton) {
    const localStorageKey = 'add-to-queue';
    clearMarkup(movieList);
    const moviesToWatched = JSON.parse(localStorage.getItem(localStorageKey));
    renderMovieListInMyLibrary(moviesToWatched);
  }
}

// onLibraryPageLoad();

// function onLibraryPageLoad() {
//   clearMarkup(movieList);
//   const moviesToWatched = JSON.parse(localStorage.getItem('add-to-watched'));
//   renderMovieListInMyLibrary(moviesToWatched);
// }

function clearMarkup(container) {
  container.innerHTML = '';
}

function renderMovieListInMyLibrary(movies) {
  const markup = movies
    .map(
      ({ id, posterPath, title, genres, voteAverage }) =>
        `<li class="movie-list__item" data-id="${id}">
            <img class="movie-image" src="${posterPath}" alt="Movie poster" loading="lazy" />
            <div class="movie-descr">
              <h2 class="movie-title">${title}</h2>
              <p class="movie-info">${genres} | <span class="vote-average">${voteAverage}</span></p>
            </div>
        </li>`
    )
    .join('');
  movieList.innerHTML = markup;
}
