import React, { useState } from 'react';
import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';


function Movies() {
  return (
    <main className='movies' aria-label='коллекция'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
