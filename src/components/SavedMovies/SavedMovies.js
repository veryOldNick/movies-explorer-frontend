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
    movies,
  }
) {
  return (
    // <main className="saved-movies" aria-label="Сохранённые фильмы">
    //   <SearchForm />
    //   <MoviesCardList />
    // </main>
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <SearchForm
        // value={value}
        // isValid={isValid}
        // buttonDisabled={buttonDisabled}
        // handleSubmit={handleSubmit}
        // handleChange={handleChange}
        // handleChecked={handleChecked}
        // checkedShortSaved={checkedShortSaved}

      />
      {isLoading ? <Preloader /> :
      <MoviesCardList 
        likedMovies={likedMovies}
        setLikedMovies={setLikedMovies}
        movies={movies}
        // notMoviesResult={notMoviesResult}
        // foundSavedMovies={foundSavedMovies} 
      />}
    </main>
  )
}

export default SavedMovies