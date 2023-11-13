import { searchMoviesQuery, filterMoviesByDuration } from "../../utils/utils";
import { useCallback, useMemo, useState } from "react";

import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(
  {
    likedMovies,
    isLoading,
    savedMovieList,
    deleteMovieToList,
  }
) {
  const [isChecked, setIsChecked] = useState(false);

  const [moviesSearch, setMoviesSearch] = useState("");

  const [filterString, setFilterString] = useState("");

  const handleSearchMovies = useCallback(async () => {
    setFilterString(moviesSearch);
  }, [moviesSearch]);

  const filteredMovies = useMemo(() => {
    let movies = likedMovies;

    if (moviesSearch) {
      movies = searchMoviesQuery(movies, filterString);
    }

    if (isChecked) {
      movies = filterMoviesByDuration(movies);
    }

    return movies;
  }, [filterString, isChecked, likedMovies, moviesSearch]);  

  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        moviesSearch={moviesSearch}
        setMoviesSearch={setMoviesSearch}
        handleSearchMovies={handleSearchMovies}
        isChecked={isChecked}
        setIsChecked={setIsChecked}
      />
      {isLoading ? <Preloader /> :
      <MoviesCardList 
        likedMovies={likedMovies}
        savedMovieList={savedMovieList}         
        deleteMovieToList={deleteMovieToList}
        filteredMovies={filteredMovies}
        isLoading={isLoading}
      />}
    </main>
  )
};

export default SavedMovies
