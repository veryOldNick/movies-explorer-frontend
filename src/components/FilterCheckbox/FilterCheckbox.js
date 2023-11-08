import { useLocation } from 'react-router-dom';

function Checkbox({ 
  handleChecked,
  checkedShort,
  checkedShortSaved
}) {

  const {pathname} =useLocation();

  return (
    <div className="checkbox">
        <input 
        type='checkbox'
        className='checkbox__field'
        id='toggle'
        onChange={handleChecked}
        checked={pathname === '/movies' ? checkedShort : checkedShortSaved}
        aria-label='Поиск короткометражек'/>
        <label htmlFor='toggle' className="checkbox__switch"></label>
        <span htmlFor="toggle" className="checkbox__label">Короткометражки</span>

    </div>
  );
}

export default Checkbox;
