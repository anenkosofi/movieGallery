import { clearMarkup } from '../home/clearMarkup';
import { renderMovieListInMyLibrary } from './renderMovieListInMyLibrary';

const movieList = document.querySelector('.movie-list');
const headerButtons = document.querySelector('[data-name="header-wrapper"]');

headerButtons.addEventListener('click', onDisplayMovie);

export function onDisplayMovie(e) {
  const watchedButton = 'watched';
  const queueButton = 'queue';
  if (e.target.closest('button').dataset.name === watchedButton) {
    document.querySelector('[data-name="watched"]').classList.add('is-active');
    document.querySelector('[data-name="queue"]').classList.remove('is-active');
    const localStorageKey = 'watched';
    clearMarkup(movieList);
    const moviesToWatched = JSON.parse(localStorage.getItem(localStorageKey));
    if (moviesToWatched) {
      renderMovieListInMyLibrary(moviesToWatched);
    }
  } else if (e.target.closest('button').dataset.name === queueButton) {
    document.querySelector('[data-name="queue"]').classList.add('is-active');
    document
      .querySelector('[data-name="watched"]')
      .classList.remove('is-active');
    const localStorageKey = 'queue';
    clearMarkup(movieList);
    const moviesToWatched = JSON.parse(localStorage.getItem(localStorageKey));
    if (moviesToWatched) {
      renderMovieListInMyLibrary(moviesToWatched);
    }
  }
}
