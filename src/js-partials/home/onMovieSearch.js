import { API_KEY, BASE_URL } from './keyAndUrl';
import { renderMovieList } from './renderMovieList';
import { clearMarkup } from './clearMarkup';
import { checkImageSrc, getFullYear } from './functionsForRenderingMovies';
import { fetchMovieDetails } from './fetchMovieDetails';
import { checkGenres } from './renderMovieModal';

const movieList = document.querySelector('.movie-list');
const paginationList = document.querySelector('.pagination-list');
const resultList = document.querySelector('.results-list');
const error = document.querySelector('.error-message');

const form = document.querySelector('.form');
form.addEventListener('submit', onMovieSearch);

const input = document.querySelector('.form-input');
input.addEventListener('input', onInputChange);

resultList.addEventListener('click', onResultClick);

async function fetchMoviesInSearchLine(query) {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

function onMovieSearch(e) {
  e.preventDefault();

  const searchQuery = e.currentTarget.elements.searchQuery.value
    .trim()
    .toLowerCase();
  fetchMoviesInSearchLine(searchQuery)
    .then(({ results }) => {
      resultList.classList.add('is-hidden');
      form.classList.remove('input-change');
      renderMovieList(results);
    })
    .catch(error => console.log(error));

  const backwardButton = document.querySelector('.arrow-left');
  const forwardButton = document.querySelector('.arrow-right');
  backwardButton.classList.add('is-hidden');
  forwardButton.classList.add('is-hidden');
  clearMarkup(paginationList);
  form.reset();
}

function onInputChange(e) {
  const searchQuery = e.target.value.trim().toLowerCase();

  if (!searchQuery) {
    form.classList.remove('input-change');
    resultList.classList.add('is-hidden');
  } else {
    fetchMoviesInSearchLine(searchQuery)
      .then(({ results, total_results }) => {
        if (!total_results) {
          error.classList.add('is-shown');
          form.classList.remove('input-change');
          resultList.classList.add('is-hidden');
        } else {
          error.classList.remove('is-shown');
          form.classList.add('input-change');
          resultList.classList.remove('is-hidden');
          renderSearchQueryList(results);
        }
      })
      .catch(error => console.log(error));
  }

  const backwardButton = document.querySelector('.arrow-left');
  const forwardButton = document.querySelector('.arrow-right');
  backwardButton.classList.add('is-hidden');
  forwardButton.classList.add('is-hidden');
  clearMarkup(paginationList);
}

function renderSearchQueryList(results) {
  const markup = results
    .map(
      ({ id, title }) =>
        `<li class="results-item" data-id="${id}">
          <span class="title">${title}</span>
          <span class="delimeter">|</span>
          <span class="year">2022</span>
          <span class="vote">7.8</span>
        </li>`
    )
    .join('');
  resultList.innerHTML = markup;
}

function onResultClick(e) {
  if (!e.target.closest('li')) {
    return;
  } else if (e.target.closest('li')) {
    const movieId = e.target.closest('li').dataset.id;

    fetchMovieDetails(movieId)
      .then(movie => fetchMovieFromResults(movie))
      .catch(error => console.log(error));
    form.classList.remove('input-change');
    resultList.classList.add('is-hidden');
    form.reset();
  }
}

function fetchMovieFromResults({
  id,
  poster_path,
  title,
  genres,
  release_date,
}) {
  const markup = `<li class="movie-list__item" data-id="${id}">
            <img class="movie-image" ${checkImageSrc(
              poster_path
            )} alt="Movie poster" loading="lazy" />
            <div class="movie-descr">
              <h2 class="movie-title">${title || 'Unknown'}</h2>
              <p class="movie-info"><span class="genre">${
                checkGenres(genres) || 'No information'
              } |</span><span>${
    getFullYear(release_date) || 'No information'
  }</span></p>
            </div>
        </li>`;
  movieList.innerHTML = markup;
}
