import { clearMarkup } from '../home/clearMarkup';
import { renderMovieListInMyLibrary } from './renderMovieListInMyLibrary';

const movieList = document.querySelector('.movie-list');

onLibraryPageLoad();

function onLibraryPageLoad() {
  clearMarkup(movieList);
  document.querySelector('[data-name="watched"]').classList.add('is-active');
  const moviesToWatched = JSON.parse(localStorage.getItem('watched'));
  if (moviesToWatched) {
    renderMovieListInMyLibrary(moviesToWatched);
  }
}
