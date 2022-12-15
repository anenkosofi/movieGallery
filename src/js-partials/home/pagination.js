import { fetchMovies } from './movie-service';
import { renderMovieList } from './renderMovieList';
import { clearMarkup } from './clearMarkup';

const movieList = document.querySelector('.movie-list');
const paginationList = document.querySelector('.pagination-list');
const paginationContainer = document.querySelector('.pagination');
const bodyRect = document.querySelector('body').getBoundingClientRect();

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
      firstChild.removeAttribute('disabled');
    }
    if (lastChild.hasAttribute('disabled')) {
      lastChild.removeAttribute('disabled');
    }
  }
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
    '<li class="pagination-item"><button class="pagination-button" type="button" disabled>...</button></li>';
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
export {
  onBackwardButtonClick,
  onForwardButtonClick,
  makeButtonDisabled,
  buttonMarkup,
  makePagination,
  makeButtonActive,
  onButtonClick,
};
