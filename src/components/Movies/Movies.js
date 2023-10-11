import SearchForm from '../Movies/SearchForm/SearchForm';
import MoviesCardList from '../Movies/MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className='movies' aria-label='Страница поиска фильмов'>
      <SearchForm />
      {/* <MoviesCardList /> */}
    </main>
  );
}

export default Movies;
