import { API_KEY, BASE_URL } from './keyAndUrl';
import { onEscClose } from './modal';

const trailerBackdrop = document.querySelector('.trailer-wrapper');
const trailerContainer = document.querySelector('.iframe-container');
trailerBackdrop.addEventListener('click', onTrailerBackdropClick);

async function fetchTrailer(id) {
  const response = await fetch(
    `${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
function onPlayButtonClick() {
  const id = document.querySelector('.information').dataset.id;

  fetchTrailer(id)
    .then(({ results }) => {
      if (results.length) {
        const trailer = results.find(result => result.type === 'Trailer');
        const movieKey = trailer.key;
        const trailerSrc = `https://www.youtube.com/embed/${movieKey}`;
        renderTrailer(trailerSrc);
      } else {
        renderTrailerDefault();
      }
    })
    .catch(error => console.log(error));
  trailerBackdrop.classList.remove('is-hidden');
  document.addEventListener('keydown', onTrailerEscClose);
  document.removeEventListener('keydown', onEscClose);
}

function renderTrailer(src) {
  const markup = `<iframe
        width="1280"
        height="700"
        src="${src}"
        title="YouTube Video Player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>`;

  trailerContainer.innerHTML = markup;
}

function renderTrailerDefault() {
  const markup = `<img
        src="https://media.tenor.com/zZ40mt2KOFoAAAAC/crying-mei-lee.gif"
        alt="Panda crying"
      />`;
  trailerContainer.innerHTML = markup;
}

function onTrailerBackdropClick(e) {
  if (e.currentTarget === e.target) {
    trailerBackdrop.classList.add('is-hidden');
    document.addEventListener('keydown', onEscClose);
    trailerContainer.innerHTML = '';
  }
}

function onTrailerEscClose(e) {
  if (e.code === 'Escape') {
    document.removeEventListener('keydown', onTrailerEscClose);
    document.addEventListener('keydown', onEscClose);
    trailerBackdrop.classList.add('is-hidden');
    trailerContainer.innerHTML = '';
  }
}

export { fetchTrailer, onPlayButtonClick, renderTrailer };
