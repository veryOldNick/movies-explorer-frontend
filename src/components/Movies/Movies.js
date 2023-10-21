import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function Movies() {
  return (
    <main className='movies' aria-label='коллекция'>
      <SearchForm />
      <MoviesCardList />
    </main>
  );
}

export default Movies;
