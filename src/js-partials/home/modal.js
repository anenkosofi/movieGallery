import { fetchMovieDetails } from './fetchMovieDetails';
import { renderMovieModal } from './renderMovieModal';
import { onAddMovie } from './onAddMovie';

const movieList = document.querySelector('.movie-list');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-button');

movieList.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  let movieId = 0;
  if (e.target.closest('li')) {
    movieId = e.target.closest('li').dataset.id;
  }

  const information = document.querySelector('.information');
  if (information) {
    information.remove();
  }

  fetchMovieDetails(movieId)
    .then(movie => {
      renderMovieModal(movie);
      const modalButtons = document.querySelector(
        '[data-name="modal-wrapper"]'
      );
      modalButtons.addEventListener('click', onAddMovie);
    })
    .catch(error => console.log(error));

  backdrop.classList.remove('is-hidden');
  document.addEventListener('keydown', onEscClose);
}

function onModalWindowClose() {
  backdrop.classList.add('is-hidden');
}

function onBackdropClick(e) {
  if (e.currentTarget === e.target) {
    onModalWindowClose();
  }
}

function onEscClose(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onEscClose);
    onModalWindowClose();
  }
}
