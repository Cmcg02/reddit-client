import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Search.module.css';

export function Search() {
  const [searchInput, setSearchInput] = useState('');

  return (
    <form>
      <input type='text' onChange={e => setSearchInput(e.target.value)} className='search-input' id='search'></input>
      <button type='submit' className='search-button'>Search</button>
    </form>
  );
}
