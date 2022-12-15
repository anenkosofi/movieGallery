import { API_KEY, BASE_URL } from './keyAndUrl';

export async function fetchMovies(page = 1) {
  const response = await fetch(
    `${BASE_URL}/trending/movie/day?api_key=${API_KEY}&page=${page}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}
