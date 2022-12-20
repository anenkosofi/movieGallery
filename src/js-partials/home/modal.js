import { fetchMovieDetails } from './fetchMovieDetails';
import { renderMovieModal } from './renderMovieModal';
import { onAddMovie } from './onAddMovie';
import { onPlayButtonClick } from './fetchTrailer';

const movieList = document.querySelector('.movie-list');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-button');

movieList.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

function onModalWindowOpen(e) {
  if (!e.target.closest('li')) {
    return;
  } else if (e.target.closest('li')) {
    const movieId = e.target.closest('li').dataset.id;
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
        const playButton = document.querySelector('.circle');
        playButton.addEventListener('click', onPlayButtonClick);
      })
      .catch(error => console.log(error));

    document.body.style.overflow = 'hidden';
    backdrop.classList.remove('is-hidden');
    document.addEventListener('keydown', onEscClose);
  }
}

function onModalWindowClose() {
  backdrop.classList.add('is-hidden');
  document.body.style.overflow = 'visible';
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

export { onModalWindowOpen, onModalWindowClose, onBackdropClick, onEscClose };
