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
        .then(({ results, total_pages }) => {
          renderMovieList(results);
          const { height: cardHeight } = document
            .querySelector('.movie-list')
            .firstElementChild.getBoundingClientRect();
          window.scrollBy({
            top: -cardHeight * 7,
            behavior: 'smooth',
          });
          clearMarkup(paginationList);
          makePagination(pageNumberToClick, total_pages);
          makeButtonDisabled(pageNumberToClick, total_pages);
          makeButtonActive(pageNumberToClick);
        })
        .catch(error => console.log(error));
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
        .then(({ results, total_pages }) => {
          renderMovieList(results);
          const { height: cardHeight } = document
            .querySelector('.movie-list')
            .firstElementChild.getBoundingClientRect();
          window.scrollBy({
            top: -cardHeight * 7,
            behavior: 'smooth',
          });
          clearMarkup(paginationList);
          makePagination(pageNumberToClick, total_pages);
          makeButtonDisabled(pageNumberToClick, total_pages);
          makeButtonActive(pageNumberToClick);
        })
        .catch(error => console.log(error));
    }
  });
}

function makeButtonDisabled(pageNumber, lastPageNumber) {
  const firstChild = paginationContainer.firstElementChild;
  const lastChild = paginationContainer.lastElementChild;
  if (pageNumber === 1) {
    firstChild.disabled = 'true';
    if (lastChild.hasAttribute('disabled')) {
      lastChild.removeAttribute('disabled');
    }
  } else if (pageNumber === lastPageNumber) {
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

function makePagination(currentPageNumber, lastPageNumber) {
  let buttonArray = [];
  let paginationMarkup = '';
  let numberOfButtons = 0;

  const dots =
    '<li class="pagination-item"><button class="pagination-button" type="button" disabled>...</button></li>';
  const firstButton =
    '<li class="pagination-item"><button class="pagination-button" type="button">1</button></li>';

  const lastButton = `<li class="pagination-item"><button class="pagination-button" type="button">${lastPageNumber}</button></li>`;

  if (lastPageNumber <= 6) {
    if (bodyRect.width < 768) {
      if (lastPageNumber === 6) {
        if (currentPageNumber >= 1 && currentPageNumber <= 3) {
          numberOfButtons = 5;
          for (let i = 1; i <= numberOfButtons; i += 1) {
            buttonArray.push(i);
          }
        } else if (currentPageNumber >= 4 && currentPageNumber <= 6) {
          numberOfButtons = 5;
          for (let i = 2; i <= numberOfButtons; i += 1) {
            buttonArray.push(i);
          }
        }
        const markup = buttonMarkup(buttonArray);
        paginationMarkup = `${markup}`;
      } else if (lastPageNumber <= 5) {
        for (let i = 1; i <= lastPageNumber; i += 1) {
          buttonArray.push(i);
        }
        const markup = buttonMarkup(buttonArray);
        paginationMarkup = `${markup}`;
      }
    } else {
      for (let i = 1; i <= lastPageNumber; i += 1) {
        buttonArray.push(i);
      }
      const markup = buttonMarkup(buttonArray);
      paginationMarkup = `${markup}`;
    }
  } else if (lastPageNumber > 6) {
    if (currentPageNumber >= 1 && currentPageNumber <= 4) {
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
    } else if (
      currentPageNumber >= 5 &&
      currentPageNumber <= lastPageNumber - 4
    ) {
      numberOfButtons = currentPageNumber + 2;
      const startButton = currentPageNumber - 2;
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
    } else if (currentPageNumber > lastPageNumber - 4) {
      for (let i = lastPageNumber - 4; i <= lastPageNumber; i += 1) {
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
  }
  paginationList.innerHTML = paginationMarkup;
}

function makeButtonActive(number) {
  const buttons = document.querySelectorAll('.pagination-button');
  [...buttons].find(button => {
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
      .then(({ results, total_pages }) => {
        renderMovieList(results);
        const { height: cardHeight } = document
          .querySelector('.movie-list')
          .firstElementChild.getBoundingClientRect();
        window.scrollBy({
          top: -cardHeight * 7,
          behavior: 'smooth',
        });
        clearMarkup(paginationList);
        makePagination(pageNumber, total_pages);
        makeButtonDisabled(pageNumber);
        makeButtonActive(pageNumber);
      })
      .catch(error => console.log(error));
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
