import {
  checkImageSrc,
  genresIdConverter,
  getFullYear,
  checkTitle,
} from './functionsForRenderingMovies';

const movieList = document.querySelector('.movie-list');

export function renderMovieList(movies) {
  const markup = movies
    .map(
      ({ id, poster_path, title, genre_ids, release_date }) =>
        `<li class="movie-list__item" data-id="${id}">
            <img class="movie-image" ${checkImageSrc(
              poster_path
            )} alt="Movie poster" loading="lazy" />
            <div class="movie-descr">
              <h2 class="movie-title">${checkTitle(title)}</h2>
              <p class="movie-info"><span class="genre">${genresIdConverter(
                genre_ids
              )} |</span><span>${getFullYear(release_date)}</span></p>
            </div>
        </li>`
    )
    .join('');
  movieList.innerHTML = markup;
}
