import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList() {
  return (
    <>
      <section className='movies' aria-label='Коллекция фильмов'>
        <p className='movies__notfound'>Ничего не найдено</p>
        <ul className='movies__list'>
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
          <MoviesCard />
        </ul>
      </section>
      <section className='more-cards' aria-label='Больше карточек'>
        <button type='button' className='more-cards__button'>Ещё</button>
      </section>
    </>
  );
}

export default MoviesCardList;