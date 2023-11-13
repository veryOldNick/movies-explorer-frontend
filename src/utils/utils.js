import { SHORT_MOVIES_DURATION } from "../constants/constants";

// конвертирование минут в часы и минуты
export function timeTransform(duration) {
  const hours = Math.trunc(duration / 60);
  const munutes = duration % 60;
  const resultTime = [];

  if (hours) resultTime.push(`${hours}ч`);
  if (munutes) resultTime.push(`${munutes}м`);

  return resultTime.join(" ");
};

// выбор короткометражек по длительности
export const filterMoviesByDuration = (movies) => {
  return movies.filter((movie) => movie.duration <= SHORT_MOVIES_DURATION);
};

// запрос на поиск фильмов
export const searchMoviesQuery = (movies, searchQuery) => {
  const lowerQuery = searchQuery.toLowerCase(); //делает поиск регистронезависимым

  // Проверяет, содержит ли поисковый запрос (lowerQuery) название фильма на русском или английском языке или описание description
  return movies.filter((movie) => {
    const lowerNameRU = movie.nameRU.toLowerCase();
    const lowerNameEN = movie.nameEN.toLowerCase();
    // const lowerDescription = movie.description.toLowerCase();

    return (
      lowerNameRU.includes(lowerQuery) || lowerNameEN.includes(lowerQuery)
      // lowerDescription.includes(lowerQuery)
    );
  });
};