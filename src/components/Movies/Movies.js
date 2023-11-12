import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(
  {
    movies,
    likedMovies,
    setLikedMovies,
    isLoading,
  }
) {
  
  // console.log(movies);

  return (
    // <main className='movies' aria-label='коллекция'>
    //   <SearchForm />
    //   <MoviesCardList />
    // </main>
    <main className='movies' aria-label='Страница поиска фильмов'>
    <SearchForm
    />
    {isLoading ? <Preloader /> :
    <MoviesCardList
      movies={movies}
      likedMovies={likedMovies}
      setLikedMovies={setLikedMovies}
      
    />}
  </main>
  );
}

export default Movies;
