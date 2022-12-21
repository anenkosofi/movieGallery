import { fetchMovies } from './movie-service';
import { renderMovieList } from './renderMovieList';
import {
  onBackwardButtonClick,
  onForwardButtonClick,
  makeButtonDisabled,
  makePagination,
  makeButtonActive,
  onButtonClick,
} from './pagination';

const paginationList = document.querySelector('.pagination-list');

onHomePageLoad();

function onHomePageLoad() {
  document.body.style.overflow = 'hidden';

  let pageNumber = 1;

  fetchMovies()
    .then(({ results, total_pages }) => {
      renderMovieList(results);
      makePagination(pageNumber, total_pages);
      makeButtonDisabled(pageNumber, total_pages);
      makeButtonActive(pageNumber);
    })
    .catch(error => console.log(error));

  paginationList.addEventListener('click', onButtonClick);
  const backwardButton = document.querySelector('.arrow-left');
  const forwardButton = document.querySelector('.arrow-right');
  backwardButton.classList.remove('is-hidden');
  forwardButton.classList.remove('is-hidden');
  backwardButton.addEventListener('click', onBackwardButtonClick);
  forwardButton.addEventListener('click', onForwardButtonClick);

  window.onload = e => {
    setTimeout(() => {
      document.querySelector('.loader-wrapper').classList.add('turn-off');
    }, 250);
  };
  document.body.style.overflow = 'visible';
}
