import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { getAllMovies } from '../../utils/MoviesApi';



function Movies() {

  console.log("res", getAllMovies());

  return (
    <main className='movies' aria-label='коллекция'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
