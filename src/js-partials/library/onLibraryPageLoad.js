import { clearMarkup } from '../home/clearMarkup';
import { renderMovieListInMyLibrary } from './renderMovieListInMyLibrary';
import { renderDefaultPicture } from './renderDefaultPicture';

const movieList = document.querySelector('.movie-list');
const pagination = document.querySelector('.pagination');

onLibraryPageLoad();

function onLibraryPageLoad() {
  movieList.classList.add('library');
  clearMarkup(movieList);
  pagination.classList.add('is-hidden');
  document.querySelector('[data-name="watched"]').classList.add('is-active');
  const moviesToWatched = JSON.parse(localStorage.getItem('watched'));
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
    }
    renderDefaultPicture();
  }
}
