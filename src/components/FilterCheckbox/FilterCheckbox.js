function FilterCheckbox() {
  return (
    <div className="checkbox">
      <input 
        type='checkbox' 
        className='checkbox__field' 
        id='toggle' 
        defaultChecked 
        aria-label='Поиск короткометражек'
      />
      <label htmlFor='toggle' className="checkbox__switch"></label>
      <span htmlFor="toggle" className="checkbox__label">Короткометражки</span>
    </div>
  );
}

export default FilterCheckbox;
