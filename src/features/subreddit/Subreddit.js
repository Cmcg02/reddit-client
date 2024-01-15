import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Subreddit.module.css'

export function Subreddit(props) {
  const {selected, title, url, image, handleClick} = props;

  if(selected){
    return(<li title={title} className='subreddit'  id='selected-subreddit'><img src={image} alt='X'/> <h6>{title}</h6></li>)
  }

  return(<li title={title} onClick={() => handleClick(url)} className='subreddit'><img src={image} alt='X'/> <h6>{title}</h6></li>)
}
