import { API_KEY, BASE_URL } from './keyAndUrl';

// /movie/{movie_id}/videos

export async function fetchTrailer() {
  const response = await fetch(
    `${BASE_URL}/movie/555604/videos?api_key=${API_KEY}`
  );
  if (!response.ok) {
    throw new Error(response.status);
  }
  return await response.json();
}

fetchTrailer()
  .then(({ results }) => {
    const trailer = results.find(result => result.type === 'Trailer');
    const movieKey = trailer.key;
    console.log(movieKey);
  })
  .catch(error => console.log(error));

// https://www.youtube.com/watch?v=
