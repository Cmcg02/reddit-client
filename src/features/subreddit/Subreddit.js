import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Subreddit.module.css';

export function Subreddit(props) {
  const {selected, title, url, image, handleClick} = props;

  if(selected){
    return(<li title={title} style={{border: '2px solid gold'}}><img src={image} alt='X'/> <h6>{title}</h6></li>)
  }

  return(<li title={title} onClick={() => handleClick(url)}><img src={image} alt='X'/> <h6>{title}</h6></li>)
}
