import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

import { searchMoviesQuery, filterMoviesByDuration } from "../../utils/utils";

function Movies(
  {
    allMovies,
    likedMovies,
    setLikedMovies,
    isLoading,
    savedMovieList,
    deleteMovieToList,
  }
) {
  const [isChecked, setIsChecked] = useState(
    localStorage.getItem("isShort") === "true",
  );

  const [moviesSearch, setMoviesSearch] = useState(
    localStorage.getItem("moviesSearch") || "",
  );

  const [filteredMovies, setFilteredMovies] = useState(
    localStorage.getItem("filteredMovies")
      ? JSON.parse(localStorage.getItem("filteredMovies"))
      : [],
  );

  const [isSearchExecuted, setIsSearchExecuted] = useState(false);

  function handleSearchMovies(isChecked) {
    const filteredMovies = searchMoviesQuery(allMovies, moviesSearch);
    let movies = filteredMovies;
    if (isChecked) {
      movies = filterMoviesByDuration(filteredMovies);
    }

    setFilteredMovies(movies);
    localStorage.setItem("isShort", isChecked.toString());
    localStorage.setItem("filteredMovies", JSON.stringify(movies));
    localStorage.setItem("moviesSearch", moviesSearch);

    setIsSearchExecuted(true);
  };

  useEffect(() => {
    localStorage.setItem("isShort", isChecked.toString());
  }, [isChecked]);
  
  // console.log(movies);

  return (
    // <main className='movies' aria-label='коллекция'>
    //   <SearchForm />
    //   <MoviesCardList />
    // </main>
    <main className='movies' aria-label='Страница поиска фильмов'>
    <SearchForm
      moviesSearch={moviesSearch}
      setMoviesSearch={setMoviesSearch}
      handleSearchMovies={handleSearchMovies}
      isChecked={isChecked}
      setIsChecked={setIsChecked}
    />
    {isLoading ? <Preloader /> :
    <MoviesCardList
      movies={filteredMovies}
      likedMovies={likedMovies}
      setLikedMovies={setLikedMovies}
      isSearchExecuted={isSearchExecuted}
      filteredMovies={filteredMovies}
      savedMovieList={savedMovieList}
      deleteMovieToList={deleteMovieToList}
    />}
  </main>
  );
}

export default Movies;
