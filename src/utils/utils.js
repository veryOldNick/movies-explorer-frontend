// import { useState, useEffect } from 'react';
import { SHORT_MOVIES_DURATION } from "../constants/constants";

// export const useResize = () => {
// 	const [width, setWidth] = useState(window.innerWidth);

// 	useEffect(() => {
// 		const handleResize = (event) => {
// 			setWidth(event.target.innerWidth);
// 		};
// 		window.addEventListener('resize', handleResize);
// 		return () => {
// 			window.removeEventListener('resize', handleResize);
// 		};
// 	}, []);

// 	return width;
// };

// конвертирование минут в часы и минуты
export const convertDuration = (duration) => {
  const hours = Math.trunc(duration / 60);
  const munutes = duration % 60;
  const resultTime = [];

  if (hours) resultTime.push(`${hours}ч`);
  if (munutes) resultTime.push(`${munutes}м`);

  return resultTime.join(" ");
};

//чекбокс - фильтрация короткометражек по длительности
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