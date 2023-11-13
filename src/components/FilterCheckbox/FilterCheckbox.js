function Checkbox({ 
  checkHandler, 
  isChecked,
}) {

  return (
    <div className="checkbox">
        <input 
        type='checkbox'
        className='checkbox__field'
        id='toggle'
        onChange={checkHandler}
        checked={isChecked}
        aria-label='Поиск короткометражек'/>
        <label htmlFor='toggle' className="checkbox__switch"></label>
        <span htmlFor="toggle" className="checkbox__label">Короткометражки</span>

    </div>
  );
};

export default Checkbox;
