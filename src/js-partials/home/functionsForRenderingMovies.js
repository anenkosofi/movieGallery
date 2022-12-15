import { genres } from './genres';
import defaultImage from '../../images/placeholder.png';

function genresIdConverter(genreIds) {
  if (genreIds.length > 2) {
    return (genreIds =
      genreIds
        .map(genreId => (genreId = genres[genreId]))
        .slice(0, 2)
        .join(', ') + ', Other');
  } else if (genreIds.length > 0 && genreIds.length <= 2) {
    return (genreIds = genreIds
      .map(genreId => (genreId = genres[genreId]))
      .join(', '));
  } else {
    return (genreIds = ' ');
  }
}

function getFullYear(date) {
  const year = new Date(date).getFullYear();

  return year;
}

function roundAverageVote(vote) {
  const roundedVote = vote.toFixed(1);
  return roundedVote;
}

function checkImageSrc(src) {
  if (src) {
    return `src="https://image.tmdb.org/t/p/w500${src}"`;
  }
  return `src="${defaultImage}"`;
}

export { genresIdConverter, getFullYear, roundAverageVote, checkImageSrc };
