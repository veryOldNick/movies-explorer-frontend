import React from 'react';
import { useLocation } from 'react-router-dom';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList({
  searchedMovies,
  notMoviesResult,
  startItems,
  likedMovies,
  setLikedMovies,
  shortMovies,
  checkedShort,
  foundSavedMovies,
  buttonMore,
  handleClickMore,
}) {

  const { pathname } = useLocation();

  function createMovieCardElement(movie, id) {
    return <MoviesCard
      movie={movie}
      likedMovies={likedMovies}
      setLikedMovies={setLikedMovies}
      key={id}
    />
  }

  function createMovieArr(Arr) {
    // console.log('проверка', Arr)
    return Arr.slice(0, startItems).map((movieItem) => createMovieCardElement(movieItem, movieItem.id));

  }

  const movieFoundItems = () => {
    return checkedShort ? createMovieArr(shortMovies) : createMovieArr(searchedMovies);
  }

  const movieSavedItems = () => {
    if (likedMovies[0]) {
      return foundSavedMovies.map((movieItem) => createMovieCardElement(movieItem, movieItem.movieId));
    }
  }

  return (
    <>
      <section className='movie-cards' aria-label='Карточки фильмов'>
          {notMoviesResult &&  <p className='movie-cards__not-found'>Ничего не найдено</p>}
          <ul className='movie-cards__container'>
            {pathname === '/movies' ? movieFoundItems() : movieSavedItems()}
          </ul>
      </section>
        <div className='more-cards' aria-label='Загрузка больше карточек'>
          {buttonMore && <button 
            type='button'
            className='more-cards__button'
            onClick={handleClickMore}> Ещё </button>}
        </div>
    </>
  );
}

export default MoviesCardList;