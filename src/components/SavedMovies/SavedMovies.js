import { useState, useEffect } from 'react';

import Search from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import { SHORT_DURATION } from '../../constants/constants'

function SavedMovies({
  likedMovies,
  setLikedMovies,
  notMoviesResult,
  setNotMoviesResult,
}) {

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [foundSavedMovies, setFoundSavedMovies] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [checkedShortSaved, setCheckedShortSaved] = useState(false);

  useEffect(() => {
    foundSavedMovies.length === 0 ?
    setNotMoviesResult(true) :
    setNotMoviesResult(false);
  }, [foundSavedMovies, checkedShortSaved])

  useEffect(() => {
    if (foundSavedMovies[0]) {
      displaySavedMovies(checkedShortSaved);
    } else {
      setFoundSavedMovies(likedMovies);
    }
  }, [likedMovies])


  function handleChange(evt) {
    setValue(evt.target.value);
    if (evt.target.value === '') {
      setIsValid(false);
      setButtonDisabled(true);
      if (checkedShortSaved) {
        setFoundSavedMovies(likedMovies.filter(movie => movie.duration < SHORT_DURATION));
      } else {
        setFoundSavedMovies(likedMovies);
      }
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  }

  function filterMovies(moviesArr, text, isshort) {
    return moviesArr.filter(movie => movie.nameRU.toLowerCase().includes(text.toLowerCase()) &&
      (isshort ? movie.duration < SHORT_DURATION : true));
  }

  function displaySavedMovies(short) {
    if (short) {
      setFoundSavedMovies(filterMovies(likedMovies, value, true));
    } else {
      setFoundSavedMovies(filterMovies(likedMovies, value, false));
    }
  }

  function handleChecked() {
    setCheckedShortSaved(!checkedShortSaved);
    displaySavedMovies(!checkedShortSaved);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    displaySavedMovies(checkedShortSaved);
  }

  return (
    <main className="saved-movies" aria-label="Сохранённые фильмы">
      <Search
        value={value}
        isValid={isValid}
        buttonDisabled={buttonDisabled}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleChecked={handleChecked}
        checkedShortSaved={checkedShortSaved}

      />
      <MoviesCardList 
        likedMovies={likedMovies}
        setLikedMovies={setLikedMovies}
        notMoviesResult={notMoviesResult}
        foundSavedMovies={foundSavedMovies}
 
      />
    </main>
  )
}

export default SavedMovies