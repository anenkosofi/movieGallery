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
    return (genreIds = 'No Information');
  }
}

function getFullYear(date) {
  if (date) {
    const year = new Date(date).getFullYear();
    return year;
  } else {
    const year = 'No information';
    return year;
  }
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

function checkGenres(genresArray) {
  if (genresArray.length > 2) {
    return (genresArray =
      genresArray
        .slice(0, 2)
        .map(genre => genre.name)
        .join(', ') + ', Other');
  } else if (genresArray.length > 0 && genresArray.length <= 2) {
    return (genresArray = genresArray.map(genre => genre.name).join(', '));
  } else {
    return (genresArray = 'No information');
  }
}

function checkDescription(overview) {
  if (overview) {
    const description = overview;
    return description;
  } else {
    const description = 'No description';
    return description;
  }
}

function checkTitle(title) {
  if (title) {
    const titleName = title;
    return titleName;
  } else {
    const titleName = 'No titleName';
    return titleName;
  }
}

export {
  genresIdConverter,
  getFullYear,
  roundAverageVote,
  checkImageSrc,
  checkGenres,
  checkDescription,
  checkTitle,
};
