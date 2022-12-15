import { API_KEY, BASE_URL } from './keyAndUrl';
import { renderMovieList } from './renderMovieList';
import { clearMarkup } from './clearMarkup';

const paginationList = document.querySelector('.pagination-list');
const resultList = document.querySelector('.results-list');
const error = document.querySelector('.error-message');

const form = document.querySelector('.form');
form.addEventListener('submit', onMovieSearch);

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

const input = document.querySelector('.form-input');

input.addEventListener('input', onInputChange);

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
        `<li class="results-item" data-id="${id}">${title}</li>`
    )
    .join('');
  resultList.innerHTML = markup;
}
