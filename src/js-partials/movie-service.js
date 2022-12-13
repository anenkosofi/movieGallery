const API_KEY = 'bfcd7a06a5bb09fb5aafe756d2f60f73';
const BASE_URL = 'https://api.themoviedb.org/3';

const movieList = document.querySelector('.movie-list');
const paginationList = document.querySelector('.pagination-list');

fetchMovies((pageNumber = 1))
  .then(({ results }) => {
    let pageNumber = 1;
    renderMovieList(results);
    makePagination(pageNumber);
    makeButtonActive(pageNumber);

    paginationList.addEventListener('click', onButtonClick);
  })
  .catch(error => console.log(error));

async function fetchMovies(page) {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

function clearMarkup(container) {
  container.innerHTML = '';
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
  878: 'Science Fiction',
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
    .slice(0, 2)
    .join(', '));
}

function getFullYear(date) {
  return (year = new Date(date).getFullYear());
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
  return (markup = array
    .map(
      pageNumber =>
        `<li class="pagination-item">
          <button class="pagination-button" type="button">${pageNumber}</button>
        </li>`
    )
    .join(''));
}

function makePagination(quantity) {
  let buttonArray = [];
  let paginationMarkup = '';
  let numberOfButtons = 0;
  const dots =
    '<li class="pagination-item"><button class="pagination-button" type="button">...</button></li>';

  if (quantity === 1) {
    numberOfButtons = 4;
    for (let i = quantity; i <= numberOfButtons; i += 1) {
      buttonArray.push(i);
    }
    const markup = buttonMarkup(buttonArray);
    paginationMarkup = `${markup} ${dots}`;
  }
  if (quantity > 1 && quantity < 17) {
    numberOfButtons = quantity + 3;
    for (let i = quantity; i <= numberOfButtons; i += 1) {
      buttonArray.push(i);
    }
    const markup = buttonMarkup(buttonArray);
    paginationMarkup = `${dots} ${markup} ${dots}`;
  }
  if (quantity >= 17) {
    for (let i = quantity; i <= 20; i += 1) {
      buttonArray.push(i);
    }
    const markup = buttonMarkup(buttonArray);
    paginationMarkup = `${dots} ${markup}`;
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
