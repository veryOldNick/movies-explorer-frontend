import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';

function SavedMovies() {
  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm />
      <MoviesCardList />
    </main>
  )
}

export default SavedMovies
