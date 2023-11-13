import { useState } from "react";
import Checkbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({  
  setMoviesSearch,
  moviesSearch,
  isChecked,
  setIsChecked,
  handleSearchMovies,
}) {
  const [isEmptyQuery, setIsEmptyQuery] = useState(false);

    const handleCheckbox = () => {
      handleSearchMovies(!isChecked);
      setIsChecked(!isChecked);
    };

    const handleChange = (e) => {
      setMoviesSearch(e.target.value);
      setIsEmptyQuery(false);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      if (!moviesSearch) {
        setIsEmptyQuery(true);
        return;
      }
        
      handleSearchMovies(isChecked);
    };
    
   
  return (
    <section className='search' aria-label='Поисковая строка'>
      <div className='search__container'>
        <form id='search-form' className='search-form' onSubmit={handleSubmit} noValidate >
          <input 
            className='search-form__input'
            name="Search"
            type='text' 
            value={moviesSearch}
            onChange={handleChange}
            placeholder='Фильм'
            required 
          />
          <button 
            className='search-form__button' 
            type='submit'            
            aria-label='Поиск'
          >
          </button>
          {isEmptyQuery && (
          <span className="form-search__error-message">
            Нужно ввести ключевое слово
          </span>
        )}
      <Checkbox 
        isChecked={isChecked} 
        checkHandler={handleCheckbox}
      />
      </form>
      </div>
    </section>
  );
}

export default SearchForm;
