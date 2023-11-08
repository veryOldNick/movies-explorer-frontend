import Checkbox from '../FilterCheckbox/FilterCheckbox';

function SearchForm({
  value,
  handleSubmit,
  handleChange,
  isValid,
  buttonDisabled,
  checkedShort,
  handleChecked,
  checkedShortSaved,}) {
   
  return (
    <section className='search' aria-label='Поисковая строка'>
      <div className='search__container'>
        <form className='search-form' onSubmit={handleSubmit} noValidate >
          <input 
            className='search-form__input'
            name="Search"
            type='text' 
            autoComplete='off'
            value={value || ''}
            onChange={handleChange}
            placeholder='Фильм'
            required 
          />
          <button 
            className='search-form__button' 
            type='submit' 
            disabled={buttonDisabled} 
            aria-label='Поиск'
          >
          </button>
      
      <Checkbox 
        handleChecked={handleChecked}
        checkedShort={checkedShort}
        checkedShortSaved ={checkedShortSaved}
      />
      </form>
      </div>
    </section>
  );
}

export default SearchForm;