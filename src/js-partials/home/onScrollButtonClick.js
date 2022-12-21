const scrollButton = document.querySelector('.scroll-button');
const target = document.querySelector('header');

const options = {
  root: null,
  rootMargin: '100px',
  threshold: 0,
};

const onButtonAppear = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      scrollButton.classList.remove('is-hidden');
    } else if (entry.isIntersecting) {
      scrollButton.classList.add('is-hidden');
    }
  });
};
const observer = new IntersectionObserver(onButtonAppear, options);
observer.observe(target);

scrollButton.addEventListener('click', onScrollButtonClick);

function onScrollButtonClick() {
  const rect = document.querySelector('body').getBoundingClientRect();
  window.scrollBy({
    top: rect.top,
    behavior: 'smooth',
  });
  setTimeout(() => {
    scrollButton.classList.add('is-hidden');
  }, 250);
}
