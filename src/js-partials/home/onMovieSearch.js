import { API_KEY, BASE_URL } from './keyAndUrl';

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

  console.dir(e.target);
}
fetchMoviesInSearchLine().then(data => console.log(data));
