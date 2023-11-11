import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(
  {
    movies,
    likedMovies,
    setLikedMovies,
  }
) {

  // console.log(createMovieArr(movies));

  return (
    <>
       <>
      <section className='movie-cards' aria-label='Карточки фильмов'>
          {/* {notMoviesResult &&  <p className='movie-cards__not-found'>Ничего не найдено</p>} */}
          <ul className='movie-cards__container'>
            {/* {createMovieArr(movies)} */}
            {movies.slice(0, 16).map((movie) => (
            <MoviesCard
              movie={movie}
              key={movie.id}           
              likedMovies={likedMovies}
              setLikedMovies={setLikedMovies}
            />
          ))}
          </ul>
      </section>
        {/* <div className='more-cards' aria-label='Загрузка больше карточек'>
          {buttonMore && <button 
            type='button'
            className='more-cards__button'
            onClick={handleClickMore}> Ещё </button>}
        </div> */}
    </>
    </>
  );
}

export default MoviesCardList;