const API_KEY = 'bfcd7a06a5bb09fb5aafe756d2f60f73';
const BASE_URL = 'https://api.themoviedb.org/3';

const movieList = document.querySelector('.movie-list');
const paginationList = document.querySelector('.pagination-list');
const bodyRect = document.querySelector('body').getBoundingClientRect();
const backwardButton = document.querySelector('.arrow-left');
const forwardButton = document.querySelector('.arrow-right');

fetchMovies()
  .then(({ results }) => {
    let pageNumber = 1;
    renderMovieList(results);
    makePagination(pageNumber);
    makeButtonActive(pageNumber);

    paginationList.addEventListener('click', onButtonClick);
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
      makeButtonActive(pageNumberToClick);
    }
  });
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

function renderMovieList(movies) {
  const markup = movies
    .map(
      ({ poster_path, title, genre_ids, release_date }) =>
        `<li class="movie-list__item">
          <a class="movie-link" href="" data-modal-open>
            <img class="movie-image" src="https://image.tmdb.org/t/p/w500${poster_path}" alt="" width="375" />
            <div class="movie-descr">
              <h2 class="movie-title">${title}</h2>
              <p class="movie-info">${genresIdConverter(
                genre_ids
              )} | ${getFullYear(release_date)}</p>
            </div>
          </a>
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
    if (button.textContent == number) {
      button.classList.add('active');
    }
  });
}

function clearMarkup(container) {
  container.innerHTML = '';
}

function onButtonClick(e) {
  console.dir(e.target);
  if (e.target.nodeName !== 'BUTTON') {
    return;
  }
  if (e.target.textContent) {
    pageNumber = Number(e.target.textContent);
    clearMarkup(movieList);
    fetchMovies(pageNumber)
      .then(({ results }) => {
        renderMovieList(results);
      })
      .catch(error => console.log(error));
    clearMarkup(paginationList);
    makePagination(pageNumber);
    makeButtonActive(pageNumber);
  }
}
