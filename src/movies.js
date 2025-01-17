// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.

const movies = require('./data');

// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(moviesArray) {
  const allDirectors = moviesArray.map((movie) => {
    return movie.director;
  });

  return allDirectors;
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(moviesArray) {
  let count = 0;

  let filteredMovies = moviesArray.filter((movie) => {
    if (
      movie.director === 'Steven Spielberg' &&
      movie.genre.includes('Drama')
    ) {
      count++;
    }
  });

  return count;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(moviesArray) {
  if (moviesArray.length === 0) {
    return 0;
  }

  let score = moviesArray.reduce((acc, movie) => {
    if (movie.score === undefined) {
      return acc;
    } else {
      return acc + movie.score;
    }
  }, 0);

  let scoreAvgRounded = (score / moviesArray.length).toFixed(2);
  let scoreNum = JSON.parse(scoreAvgRounded);
  return scoreNum;
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(moviesArray) {
  let filteredDrama = moviesArray.filter((movie) => {
    return movie.genre.includes('Drama');
  });
  let dramaScore = filteredDrama.reduce((acc, movie) => {
    return acc + movie.score;
  }, 0);

  if (filteredDrama.length === 0) {
    return 0;
  }

  return JSON.parse((dramaScore / filteredDrama.length).toFixed(2));
}
dramaMoviesScore(movies);

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(moviesArray) {
  let moviesClone = JSON.parse(JSON.stringify(moviesArray));

  let sortedMovies = moviesClone.sort((movie1, movie2) => {
    if (movie1.year > movie2.year) {
      return 1;
    } else if (movie2.year > movie1.year) {
      return -1;
    } else {
      return movie1.title.localeCompare(movie2.title);
    }
  });
  return sortedMovies;
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(moviesArray) {
  const moviesClone = JSON.parse(JSON.stringify(moviesArray));

  const sortedMovies = moviesClone.sort((movie1, movie2) => {
    return movie1.title.localeCompare(movie2.title);
  });

  const first20 = sortedMovies.slice(0, 20);

  let titles = [];

  first20.forEach((movie) => {
    titles.push(movie.title);
  });

  return titles;
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(moviesArray) {
  const moviesClone = JSON.parse(JSON.stringify(moviesArray));

  moviesClone.forEach((movie) => {
    const splittedDuration = movie.duration.split(' ');

    let hoursToMin;
    let minStrToNum = 0;

    if (splittedDuration[0] && splittedDuration[0].includes('h')) {
      hoursToMin = parseFloat(splittedDuration[0].slice(0, -1)) * 60;
    }

    if (splittedDuration[1] && splittedDuration[1].includes('min')) {
      minStrToNum = parseFloat(splittedDuration[1].slice(0, -3));
    }

    movie.duration = hoursToMin + minStrToNum;
  });

  return moviesClone;
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(moviesArray) {
  const moviesClone = JSON.parse(JSON.stringify(moviesArray));
  // 1. filter by years
  const yearMemorie = [];
  const scorePerYear = {};

  if (moviesArray.length === 0) {
    return null;
  }

  moviesClone.forEach((movie) => {
    const setYear = movie.year;
    if (!yearMemorie.includes(setYear)) {
      yearMemorie.push(setYear);
      // Añado a variable yearMemorie los años que vamos recorriendo y los filtramos para no repetir movie en un nuevo arr
      // filteredMovies para asi poder extraer el avgScore
      const filteredMovies = moviesClone.filter(
        (movie) => setYear === movie.year
      );
      // avgScore con reduce y sacamos la media de cada año, todo en un mismo If para ahorrar proceso
      const avgScore = (
        filteredMovies.reduce((acc, movie) => acc + movie.score, 0) /
        filteredMovies.length
      ).toFixed(2);

      scorePerYear[setYear] = parseFloat(avgScore);
    }
  });
  const scoresNumbers = Object.values(scorePerYear);
  const maxAvg = Math.max(...scoresNumbers);
  const getYear = Object.keys(scorePerYear).find(
    (key) => scorePerYear[key] === maxAvg
  );

  return `The best year was ${getYear} with an average score of ${maxAvg}`;
}



// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
