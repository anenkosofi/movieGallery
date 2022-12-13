import defaultImage from '../images/placeholder.png';
const API_KEY = 'bfcd7a06a5bb09fb5aafe756d2f60f73';
const BASE_URL = 'https://api.themoviedb.org/3';

const movieList = document.querySelector('.movie-list');
const paginationList = document.querySelector('.pagination-list');
const paginationContainer = document.querySelector('.pagination');
const bodyRect = document.querySelector('body').getBoundingClientRect();
const modalWindow = document.querySelector('.information');
const backdrop = document.querySelector('.backdrop');
const closeButton = document.querySelector('.close-button');

movieList.addEventListener('click', onModalWindowOpen);
closeButton.addEventListener('click', onModalWindowClose);
backdrop.addEventListener('click', onBackdropClick);

fetchMovies()
  .then(({ results }) => {
    let pageNumber = 1;
    renderMovieList(results);
    makePagination(pageNumber);
    makeButtonDisabled(pageNumber);
    makeButtonActive(pageNumber);

    paginationList.addEventListener('click', onButtonClick);
    const backwardButton = document.querySelector('.arrow-left');
    const forwardButton = document.querySelector('.arrow-right');
    backwardButton.addEventListener('click', onBackwardButtonClick);
    forwardButton.addEventListener('click', onForwardButtonClick);
  })
  .catch(error => console.log(error));

function onBackwardButtonClick() {
  const buttons = document.querySelectorAll('.pagination-button');
  [...buttons].map(button => {
    if (button.classList.contains('active')) {
      const currentPageNumber = Number(button.textContent);
      const pageNumberToClick = currentPageNumber - 1;
      fetchMovies(pageNumberToClick)
        .then(({ results }) => {
          renderMovieList(results);
        })
        .catch(error => console.log(error));
      clearMarkup(paginationList);
      makePagination(pageNumberToClick);
      makeButtonDisabled(pageNumberToClick);
      makeButtonActive(pageNumberToClick);
    }
  });
}

function onForwardButtonClick() {
  const buttons = document.querySelectorAll('.pagination-button');
  [...buttons].map(button => {
    if (button.classList.contains('active')) {
      const currentPageNumber = Number(button.textContent);
      const pageNumberToClick = currentPageNumber + 1;
      fetchMovies(pageNumberToClick)
        .then(({ results }) => {
          renderMovieList(results);
        })
        .catch(error => console.log(error));
      clearMarkup(paginationList);
      makePagination(pageNumberToClick);
      makeButtonDisabled(pageNumberToClick);
      makeButtonActive(pageNumberToClick);
    }
  });
}

function makeButtonDisabled(pageNumber) {
  const firstChild = paginationContainer.firstElementChild;
  const lastChild = paginationContainer.lastElementChild;
  if (pageNumber === 1) {
    firstChild.disabled = 'true';
    if (lastChild.hasAttribute('disabled')) {
      lastChild.removeAttribute('disabled');
    }
  } else if (pageNumber === 20) {
    lastChild.disabled = 'true';
    if (firstChild.hasAttribute('disabled')) {
      firstChild.removeAttribute('disabled');
    }
  } else {
    if (firstChild.hasAttribute('disabled')) {
      console.log(firstChild.hasAttribute('disabled'));
      firstChild.removeAttribute('disabled');
    }
    if (lastChild.hasAttribute('disabled')) {
      lastChild.removeAttribute('disabled');
    }
  }
}

async function fetchMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

async function fetchMovieDetails(movieId) {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

const genres = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Sci-Fi',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
};

function genresIdConverter(genreIds) {
  return (genreIds = genreIds
    .map(genreId => (genreId = genres[genreId]))
    .slice(0, 3)
    .join(', '));
}

function getFullYear(date) {
  const year = new Date(date).getFullYear();

  return year;
}

function roundAverageVote(vote) {
  const roundedVote = vote.toFixed(1);
  return roundedVote;
}

function checkImageSrc(src) {
  if (src) {
    return `src="https://image.tmdb.org/t/p/w500${src}"`;
  }
  return `src="${defaultImage}"`;
}

function renderMovieList(movies) {
  const markup = movies
    .map(
      ({ id, poster_path, title, genre_ids, release_date, vote_average }) =>
        `<li class="movie-list__item" data-id="${id}">
            <img class="movie-image" ${checkImageSrc(
              poster_path
            )} alt="Movie poster" loading="lazy" />
            <div class="movie-descr">
              <h2 class="movie-title">${title || 'Unknown'}</h2>
              <p class="movie-info">${
                genresIdConverter(genre_ids) || 'Other'
              } | ${
          getFullYear(release_date) || 'Unknown'
        }<span class="vote-average">${roundAverageVote(vote_average)}</span></p>
            </div>
        </li>`
    )
    .join('');
  movieList.innerHTML = markup;
}

function buttonMarkup(array) {
  const markup = array
    .map(
      pageNumber =>
        `<li class="pagination-item">
          <button class="pagination-button" type="button">${pageNumber}</button>
        </li>`
    )
    .join('');

  return markup;
}

function makePagination(quantity) {
  let buttonArray = [];
  let paginationMarkup = '';
  let numberOfButtons = 0;
  const dots =
    '<li class="pagination-item"><button class="pagination-button" type="button">...</button></li>';
  const firstButton =
    '<li class="pagination-item"><button class="pagination-button" type="button">1</button></li>';

  const lastButton =
    '<li class="pagination-item"><button class="pagination-button" type="button">20</button></li>';

  if (quantity >= 1 && quantity <= 3) {
    numberOfButtons = 5;
    for (let i = 1; i <= numberOfButtons; i += 1) {
      buttonArray.push(i);
    }
    if (bodyRect.width < 768) {
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${markup}`;
    } else {
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${markup} ${dots} ${lastButton}`;
    }
  } else if (quantity > 3 && quantity < 18) {
    numberOfButtons = quantity + 2;
    const startButton = quantity - 2;
    for (let i = startButton; i <= numberOfButtons; i += 1) {
      buttonArray.push(i);
    }
    if (bodyRect.width < 768) {
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${markup}`;
    } else {
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${firstButton} ${dots} ${markup} ${dots} ${lastButton}`;
    }
  } else if (quantity >= 18) {
    for (let i = 16; i <= 20; i += 1) {
      buttonArray.push(i);
    }
    if (bodyRect.width < 768) {
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${markup}`;
    } else {
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${firstButton} ${dots} ${markup}`;
    }
  }

  paginationList.innerHTML = paginationMarkup;
}

function makeButtonActive(number) {
  const buttons = document.querySelectorAll('.pagination-button');
  [...buttons].map(button => {
    if (button.classList.contains('active')) {
      button.classList.remove('active');
    }
    if (Number(button.textContent) === number) {
      button.classList.add('active');
    }
  });
}

function clearMarkup(container) {
  container.innerHTML = '';
}

function onButtonClick(e) {
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.textContent) {
    const pageNumber = Number(e.target.textContent);
    clearMarkup(movieList);
    fetchMovies(pageNumber)
      .then(({ results }) => {
        renderMovieList(results);
      })
      .catch(error => console.log(error));
    clearMarkup(paginationList);
    makePagination(pageNumber);
    makeButtonDisabled(pageNumber);
    makeButtonActive(pageNumber);
  }
}

function onModalWindowOpen(e) {
  let movieId = 0;
  if (e.target.closest('li')) {
    movieId = e.target.closest('li').dataset.id;
  }

  clearMarkup(modalWindow);
  fetchMovieDetails(movieId)
    .then(movie => renderMovieModal(movie))
    .catch(error => console.log(error));

  backdrop.classList.remove('is-hidden');

  document.addEventListener('keydown', onEscClose);
}

function renderMovieModal({
  genres,
  original_title,
  overview,
  popularity,
  poster_path,
  title,
  vote_average,
  vote_count,
}) {
  const markup = `<img ${checkImageSrc(poster_path)} alt="Movie poster"  />
    <div class="movie-details">
      <h3 class="movie-heading">${title}</h3>
      <ul class="movie-list-info">
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Vote / Votes</p>
          <p class="movie-mark">
            <span class="rating">${roundAverageVote(
              vote_average
            )}</span><span class="delimeter">/</span
            ><span class="quantity">${vote_count}</span>
          </p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Popularity</p>
          <p class="movie-mark">${roundAverageVote(popularity)}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Original Title</p>
          <p class="movie-mark movie-mark--original-title">${original_title}</p>
        </li>
        <li class="movie-list-info__item">
          <p class="movie-testimonial">Genre</p>
          <p class="movie-mark">${genres
            .map(genre => genre.name)
            .join(', ')}</p>
        </li>
      </ul>
      <p class="about">About</p>
      <p class="about-descr">${overview}</p>
      <div class="button-wrapper button-wrapper--modal">
        <button class="button modal-button" type="button">
          Add to watched
        </button>
        <button
          class="button queue modal-button modal-button-queue"
          type="button"
        >
          Add to queue
        </button>
      </div>
    </div>`;

  modalWindow.innerHTML = markup;
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
