import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function SavedMovies(
  {
    loggedIn,
    isLoading,
    likedMovies,
    setLikedMovies,
    notMoviesResult,
    setNotMoviesResult,
    allMovies,
  }
) {
  return (
    // <main className="saved-movies" aria-label="Сохранённые фильмы">
    //   <SearchForm />
    //   <MoviesCardList />
    // </main>
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        // moviesSearch={moviesSearch}
        // setMoviesSearch={setMoviesSearch}
        // handleSearchMovies={handleSearchMovies}
        // isChecked={isChecked}
        // setIsChecked={setIsChecked}
      />
      {isLoading ? <Preloader /> :
      <MoviesCardList 
        likedMovies={likedMovies}
        setLikedMovies={setLikedMovies}
        movies={allMovies}
        // notMoviesResult={notMoviesResult}
        // foundSavedMovies={foundSavedMovies} 
      />}
    </main>
  )
}

export default SavedMovies