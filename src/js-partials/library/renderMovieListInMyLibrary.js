const movieList = document.querySelector('.movie-list');

export function renderMovieListInMyLibrary(movies) {
  const markup = movies
    .map(
      ({ id, posterPath, year, title, genres, voteAverage }) =>
        `<li class="movie-list__item" data-id="${id}">
            <img class="movie-image" src="${posterPath}" alt="Movie poster" loading="lazy" />
            <div class="movie-descr">
              <h2 class="movie-title">${title}</h2>
              <p class="movie-info"><span class="genre">${genres}</span>
              <span>| ${year}</span><span class="vote-average">${voteAverage}</span></p>
            </div>
        </li>`
    )
    .join('');
  movieList.innerHTML = markup;
}
