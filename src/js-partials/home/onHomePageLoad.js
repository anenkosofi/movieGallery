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
  let pageNumber = 1;

  fetchMovies()
    .then(({ results }) => renderMovieList(results))
    .catch(error => console.log(error));

  makePagination(pageNumber);
  makeButtonDisabled(pageNumber);
  makeButtonActive(pageNumber);

  paginationList.addEventListener('click', onButtonClick);
  const backwardButton = document.querySelector('.arrow-left');
  const forwardButton = document.querySelector('.arrow-right');
  backwardButton.classList.remove('is-hidden');
  forwardButton.classList.remove('is-hidden');
  backwardButton.addEventListener('click', onBackwardButtonClick);
  forwardButton.addEventListener('click', onForwardButtonClick);
}
