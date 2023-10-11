import FilterCheckbox from '../../FilterCheckbox/FilterCheckbox';

// function SearchForm() {
//   return (
//     <section className='search' aria-label='Поисковая строка'>
//       <div className='search__container'>
//         <form className='search-form' autoComplete='off'>
//           <input 
//             className='search-form__input'
//             type='text' 
//             autoComplete='nope' 
//             minLength='2' 
//             placeholder='Фильм' 
//             required 
//           />
//           <button 
//             className='search-form__button'
//             type='submit' 
//             aria-label='Кнопка поиска'
//           ></button>
//           {/* <FilterCheckbox /> */}
//         </form>
//       </div>
//     </section>
//   );
// }

// export default SearchForm;

import { useState } from "react";
// import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

function SearchForm() {
  const [searchValue, setSearchValue] = useState("");
  const [isShortsChecked, setIsShortsChecked] = useState(false);

  const handleChange = ({ target }) => {
    setSearchValue(target.value);
  };

  const handleShortsCheck = () => {
    setIsShortsChecked(!isShortsChecked);
  };

  return (
    <section>
      <form className="form-search">
        <label className="form-search__wrapper">
          <input
            type="text"
            placeholder="Фильм"
            className="form-search__input"
            onChange={handleChange}
            value={searchValue}
            minLength="2"
            required
          />
          <button className="form-search__submit-btn"></button>
        </label>
        <FilterCheckbox
          checkHandler={handleShortsCheck}
          isChecked={isShortsChecked}
        />
      </form>
    </section>
  );
}

export default SearchForm;
