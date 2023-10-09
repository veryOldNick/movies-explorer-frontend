import SearchForm from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className='movies' aria-label='Страница поиска фильмов'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
