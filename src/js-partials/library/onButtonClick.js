import { clearMarkup } from '../home/clearMarkup';
import { renderMovieListInMyLibrary } from './renderMovieListInMyLibrary';
import { renderDefaultPicture } from './renderDefaultPicture';

const movieList = document.querySelector('.movie-list');
const headerButtons = document.querySelector('[data-name="header-wrapper"]');
const pagination = document.querySelector('.pagination');

headerButtons.addEventListener('click', onDisplayMovie);

export function onDisplayMovie(e) {
  const watchedButton = 'watched';
  const queueButton = 'queue';
  if (e.target.closest('button').dataset.name === watchedButton) {
    document.querySelector('[data-name="watched"]').classList.add('is-active');
    document.querySelector('[data-name="queue"]').classList.remove('is-active');
    const localStorageKey = 'watched';
    clearMarkup(movieList);
    pagination.classList.add('is-hidden');
    const moviesToWatched = JSON.parse(localStorage.getItem(localStorageKey));
    if (moviesToWatched && moviesToWatched.length) {
      const defaultPicture = document.querySelector('.default-container');
      if (defaultPicture) {
        defaultPicture.remove();
        renderMovieListInMyLibrary(moviesToWatched);
      } else {
        renderMovieListInMyLibrary(moviesToWatched);
      }
    } else {
      const defaultPicture = document.querySelector('.default-container');
      if (defaultPicture) {
        return;
      } else {
        renderDefaultPicture();
      }
    }
  } else if (e.target.closest('button').dataset.name === queueButton) {
    document.querySelector('[data-name="queue"]').classList.add('is-active');
    document
      .querySelector('[data-name="watched"]')
      .classList.remove('is-active');
    const localStorageKey = 'queue';
    clearMarkup(movieList);
    pagination.classList.add('is-hidden');
    const moviesQueue = JSON.parse(localStorage.getItem(localStorageKey));
    if (moviesQueue && moviesQueue.length) {
      const defaultPicture = document.querySelector('.default-container');
      if (defaultPicture) {
        defaultPicture.remove();
        renderMovieListInMyLibrary(moviesQueue);
      } else {
        renderMovieListInMyLibrary(moviesQueue);
      }
    } else {
      const defaultPicture = document.querySelector('.default-container');
      if (defaultPicture) {
        return;
      }
      renderDefaultPicture();
    }
  }
}
