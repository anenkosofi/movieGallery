import {
  checkImageSrc,
  roundAverageVote,
  getFullYear,
} from './functionsForRenderingMovies';

const modalWindow = document.querySelector('.modal');

export function renderMovieModal({
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
  console.log(genres);
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
  )}"><img ${checkImageSrc(
    poster_path
  )} alt="Movie poster" data-name="poster-path" />
    <div class="movie-details">
      <h3 class="movie-heading" data-name="title">${title}</h3>
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
      <p class="about-descr" data-name="overview">${overview}</p>
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

function checkGenres(genresArray) {
  if (genresArray.length > 2) {
    return (genres =
      genresArray
        .slice(0, 2)
        .map(genre => genre['name'])
        .join(', ') + ', Other');
  } else if (genresArray.length > 0 && genresArray.length <= 2) {
    return (genres = genresArray.map(genre => genre.name).join(', '));
  } else {
    return (genres = ' ');
  }
}
