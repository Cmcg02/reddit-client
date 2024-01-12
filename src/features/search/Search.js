import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Search.module.css';
import {setSearchTerm} from '../../app/redditSlice'

export function Search() {
  const dispatch = useDispatch()
  const [searchInput, setSearchInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(setSearchTerm(searchInput))
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={e => setSearchInput(e.target.value)} className='search-input' id='search'></input>
      <button type='submit' className='search-button' onClick={handleSubmit}>Search</button>
    </form>
  );
}
