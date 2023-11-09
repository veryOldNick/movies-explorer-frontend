import React, { useEffect, useState } from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader'
import { getAllMovies } from '../../utils/MoviesApi'
import { useResize } from '../../utils/CheckResize';

import{
  BIG_SCREEN_SIZE,
  SMALL_SCREEN_SIZE,
  CARDS_QUANTITY_DESKTOP,
  CARDS_QUANTITY_TABLET,
  CARDS_QUANTITY_MOBILE,
  CARDS_MORE_DESKTOP,
  CARDS_MORE_MOBILE,
  SHORT_MOVIES_DURATION,
} from '../../constants/constants'


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
  // const [startItems, setStartItems] = useState(5);;
  // const [addItems, setAddItems] = useState(2);
  const [startItems, setVisibleCount] = useState(CARDS_QUANTITY_DESKTOP);
  const [addItems, setLoadMoreCount] = useState(CARDS_MORE_DESKTOP);
  const [buttonMore, setButtonMore] = useState(false);
  const windowWidth = useResize();

  useEffect(() => {
    // settingAmountFilms();
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
    moviesArr.length >= InitialMovies + 1 ?
      setButtonMore(true) : setButtonMore(false);
  }

  function handleShowButtonMore(InitialMovies) {
    checkedShort ?
    checkshowButtonMore(shortMovies, InitialMovies) :
    checkshowButtonMore(searchedMovies, InitialMovies);
  }

  // Больше фильмов
  function handleClickMore() {
    const allMovies = startItems + addItems;
    setVisibleCount(allMovies);
    handleShowButtonMore(allMovies);
  };

  
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
      (filter ? movie.duration < SHORT_MOVIES_DURATION : true));
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
      // settingAmountFilms();
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
  // количество показываемых карточек на странице в зависимости от ширины экрана

   useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth <= SMALL_SCREEN_SIZE) {
        setVisibleCount(CARDS_QUANTITY_MOBILE);
        setLoadMoreCount(CARDS_MORE_MOBILE);
      } else if (screenWidth <= BIG_SCREEN_SIZE) {
        setVisibleCount(CARDS_QUANTITY_TABLET);
        setLoadMoreCount(CARDS_MORE_MOBILE);
      } else {
        setVisibleCount(CARDS_QUANTITY_DESKTOP);
        setLoadMoreCount(CARDS_MORE_DESKTOP);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

    
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
