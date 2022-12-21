import {
  checkImageSrc,
  roundAverageVote,
  getFullYear,
  checkGenres,
  checkDescription,
  checkTitle,
} from './functionsForRenderingMovies';

const modalWindow = document.querySelector('.modal');

function renderMovieModal({
  id,
  genres,
  original_title,
  overview,
  popularity,
  poster_path,
  release_date,
  title,
  vote_average,
  vote_count,
}) {
  const addToWatched = 'add to watched';
  const addToQueue = 'add to queue';
  const removeFromWatched = 'remove from watched';
  const removeFromQueue = 'remove from queue';

  let textContentForWatchedButton = '';
  let textContentForQueueButton = '';
  const data = JSON.parse(localStorage.getItem(id));
  if (data && data.length === 1 && data.includes('watched')) {
    textContentForWatchedButton = removeFromWatched;
    textContentForQueueButton = addToQueue;
  } else if (data && data.length === 1 && data.includes('queue')) {
    textContentForQueueButton = removeFromQueue;
    textContentForWatchedButton = addToWatched;
  } else if (data && data.length === 2) {
    textContentForWatchedButton = removeFromWatched;
    textContentForQueueButton = removeFromQueue;
  } else {
    textContentForWatchedButton = addToWatched;
    textContentForQueueButton = addToQueue;
  }
  const markup = `<div class="information" data-id="${id}" data-year="${getFullYear(
    release_date
  )}"><div class="trailer"><img ${checkImageSrc(
    poster_path
  )} alt="Movie poster" data-name="poster-path" />
    <div class="overlay">
    <div class="circle"><svg width="60" height="60" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
        <path d="M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13zM12 9l12 7-12 7z"></path>
        </svg></div>
    </div>
  </div>
    <div class="movie-details">
      <h3 class="movie-heading" data-name="title">${checkTitle(title)}</h3>
      <ul class="movie-list-info">
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Vote / Votes</p>
          <p class="movie-mark">
            <span class="rating" data-name="vote-average">${roundAverageVote(
              vote_average
            )}</span><span class="delimeter">/</span
            ><span class="quantity" data-name="vote-count">${vote_count}</span>
          </p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Popularity</p>
          <p class="movie-mark" data-name="popularity">${roundAverageVote(
            popularity
          )}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Original Title</p>
          <p class="movie-mark movie-mark--original-title" data-name="original-title">${original_title}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Genre</p>
          <p class="movie-mark" data-name="genres">${checkGenres(genres)}</p>
        </li>
      </ul>
      <p class="about">About</p>
      <p class="about-descr" data-name="overview">${checkDescription(
        overview
      )}</p>
      <div class="modal-wrapper" data-name="modal-wrapper">
      <button class="button modal-button" type="button" data-action="watched">
        ${textContentForWatchedButton}
      </button>
      <button
        class="button modal-button"
        type="button"
        data-action="queue"
      >
        ${textContentForQueueButton}
      </button>
    </div>
  </div>
</div>`;

  modalWindow.firstElementChild.insertAdjacentHTML('afterend', markup);
}

export { renderMovieModal, checkGenres };
