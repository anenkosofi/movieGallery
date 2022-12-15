import { addToLocalStorage } from './addToLocalStorage';
import { deleteFromLocalStorage } from './deleteFromLocalStorage';

export function onAddMovie(e) {
  const addToWatched = 'add to watched';
  const addToQueue = 'add to queue';
  const removeFromWatched = 'remove from watched';
  const removeFromQueue = 'remove from queue';
  let localStorageKey = '';
  if (e.target.closest('button')) {
    if (
      e.target.closest('button').textContent.trim().toLowerCase() ===
      addToWatched
    ) {
      e.target.closest('button').textContent = removeFromWatched;
      localStorageKey = e.target.closest('button').dataset.action;
      addToLocalStorage(localStorageKey);
    } else if (
      e.target.closest('button').textContent.trim().toLowerCase() === addToQueue
    ) {
      e.target.closest('button').textContent = removeFromQueue;
      localStorageKey = e.target.closest('button').dataset.action;
      addToLocalStorage(localStorageKey);
    } else if (
      e.target.closest('button').textContent.trim().toLowerCase() ===
      removeFromWatched
    ) {
      e.target.closest('button').textContent = addToWatched;
      localStorageKey = e.target.closest('button').dataset.action;
      deleteFromLocalStorage(localStorageKey);
    } else if (
      e.target.closest('button').textContent.trim().toLowerCase() ===
      removeFromQueue
    ) {
      e.target.closest('button').textContent = addToQueue;
      localStorageKey = e.target.closest('button').dataset.action;
      deleteFromLocalStorage(localStorageKey);
    }
  }
}
