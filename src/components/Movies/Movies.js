import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'
import { getAllMovies } from '../../utils/MoviesApi'
import { useResize } from '../../utils/CheckResize';

import{
SHORT_DURATION,
ONEMORE,
RESOLUTION_L,
RESOLUTION_M,
RESOLUTION_S,
START_ITEMS_L,
START_ITEMS_M,
START_ITEMS_S,
START_ITEMS_XS,
ADDITIONAL_ITEMS_L,
ADDITIONAL_ITEMS_M,
ADDITIONAL_ITEMS_S} from '../../constants/constants'


function Movies({
  likedMovies,
  setLikedMovies,
  movies,
  setMovies,
  searchedMovies,
  setSearchedMovies,
  notMoviesResult,
  setNotMoviesResult,
  checkedShort,
  setCheckedShort,
}) {

  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [preloaderOn, setPreloaderOn] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);
  const [startItems, setStartItems] = useState(5);;
  const [addItems, setAddItems] = useState(2);
  const [buttonMore, setButtonMore] = useState(false);
  const windowWidth = useResize();

  useEffect(() => {
    settingAmountFilms();
    handleShowButtonMore(startItems);
  }, [windowWidth]);


  useEffect(() => {
    if (localStorage.movieSearchText) {
      setValue(localStorage.getItem('movieSearchText'));
      setCheckedShort(JSON.parse(localStorage.getItem('checkedShort')));
      setShortMovies(JSON.parse(localStorage.getItem('shortMovies')));
      setSearchedMovies(JSON.parse(localStorage.getItem('searchedMovies')));
    }
  }, [])

  useEffect(() => {
    if (movies.length > 0) {
      setNotMoviesResult(false);
    }
    handleNotMoviesResult(shortMovies, searchedMovies);
    savingLocalData();
    handleShowButtonMore(startItems);
  }, [searchedMovies, shortMovies])


  function handleChange(event) {
    setValue(event.target.value);
    if (event.target.value === '') {
      setIsValid(false);
      setButtonDisabled(true);
    } else {
      setIsValid(true);
      setButtonDisabled(false);
    }
  }
  
  function checkshowButtonMore(moviesArr, InitialMovies) {
    moviesArr.length >= InitialMovies + ONEMORE ?
      setButtonMore(true) : setButtonMore(false);
  }

  function handleShowButtonMore(InitialMovies) {
    checkedShort ?
    checkshowButtonMore(shortMovies, InitialMovies) :
    checkshowButtonMore(searchedMovies, InitialMovies);
  }

  function handleClickMore() {
    const allMovies = startItems + addItems;
    setStartItems(allMovies);
    handleShowButtonMore(allMovies);
  }

  
  function handleNotMoviesResult() {
     if (movies.length > 0) {
      if (checkedShort) {
        shortMovies.length === 0 ? setNotMoviesResult(true) : setNotMoviesResult(false);
      } else {
        searchedMovies.length === 0 ? setNotMoviesResult(true) : setNotMoviesResult(false);
      }
    }
  } 


  function filterMovies(moviesArr, text, filter) {
    return moviesArr.filter(movie => movie.nameRU.toLowerCase().includes(text.toLowerCase()) &&
      (filter ? movie.duration < SHORT_DURATION : true));
  }


  function savingLocalData() {
    localStorage.setItem('movieSearchText', value);
    localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
    localStorage.setItem('checkedShort', JSON.stringify(checkedShort));
    localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
  }
  
  

  function getMoviesApi(moviesArr) {
    // console.log(" getMoviesApi movie", moviesArr);
    setButtonMore(false);
    getAllMovies()
    .then((res) => {
      
      setMovies(res);
      moviesArr === searchedMovies ? 
        setSearchedMovies(filterMovies(res, value, false)) : 
        setShortMovies(filterMovies(res, value, true));
        // console.log('получение aRR')
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      setButtonDisabled(false);
      setPreloaderOn(false);
    })
  };

  function findMovies(checked) {    
    setButtonDisabled(true);
    if (value === '') {      
      setIsValid(false);
    } else {
      setPreloaderOn(true);
      setIsValid(true);
      settingAmountFilms();
      if (movies.length > 0) {
        setButtonDisabled(false);
        setPreloaderOn(false);
        checked ?
          setSearchedMovies(filterMovies(movies, value, false)) :
          setShortMovies(filterMovies(movies, value, true));
      } else {
        // console.log("test");
        checked ?          
          getMoviesApi(searchedMovies) :
          getMoviesApi(shortMovies);
      }
    }
  }

  function handleChecked() {
    findMovies(checkedShort);
    setCheckedShort(!checkedShort);
  }

  function handleSubmit(evt) {
    
    evt.preventDefault();
    findMovies(!checkedShort);
  }

  function settingAmountFilms() {
    if (windowWidth >= RESOLUTION_L) {
      setStartItems(START_ITEMS_L);
      setAddItems(ADDITIONAL_ITEMS_L);
    } else if (windowWidth >= RESOLUTION_M) {
      setStartItems(START_ITEMS_M);
      setAddItems(ADDITIONAL_ITEMS_M);
    } else if (windowWidth >= RESOLUTION_S) {
      setStartItems(START_ITEMS_S);
      setAddItems(ADDITIONAL_ITEMS_S);
    } else {
      setStartItems(START_ITEMS_XS);
      setAddItems(ADDITIONAL_ITEMS_S);
    }
  }

  return (
    <main className='movies' aria-label='Страница поиска фильмов'>
      <SearchForm 
      value={value}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      isValid={isValid}
      buttonDisabled={buttonDisabled}
      checkedShort={checkedShort}
      handleChecked={handleChecked}
      />
      {preloaderOn ? <Preloader /> :
      <MoviesCardList 
        searchedMovies={searchedMovies}
        notMoviesResult={notMoviesResult}
        startItems={startItems}
        likedMovies={likedMovies}
        setLikedMovies={setLikedMovies}
        shortMovies={shortMovies}
        checkedShort={checkedShort}
        buttonMore={buttonMore}
        handleClickMore={handleClickMore} />}
    </main>
  );
}


export default Movies;