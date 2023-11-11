import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(
  {
    movies,
  }
) {

  function createMovieCardElement(movie, id) {
    console.log(movie, id);
    return <MoviesCard
      movie={movie}
      key={id}
    />
  }

  function createMovieArr(movies) {
    console.log('проверка', movies)
    return movies.slice(0, 16).map((movieItem) => createMovieCardElement(movieItem, movieItem.id));

  }

  console.log(createMovieArr(movies));

  return (
    <>
       <>
      <section className='movie-cards' aria-label='Карточки фильмов'>
          {/* {notMoviesResult &&  <p className='movie-cards__not-found'>Ничего не найдено</p>} */}
          <ul className='movie-cards__container'>
            {createMovieArr(movies)}
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