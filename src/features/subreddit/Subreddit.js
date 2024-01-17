import React from 'react';
import logo from '../../Reddit-Emblema-650x366.png';

export function Subreddit(props) {
  const {selected, title, url, image, handleClick} = props;

  if(selected){
    return(<li title={title} className='subreddit'  id='selected-subreddit'><img src={image?image:logo} alt='X'/> <h6>{title}</h6></li>)
  }

  return(<li title={title} onClick={() => handleClick(url)} className='subreddit'><img src={image?image:logo} alt='X'/> <h6>{title}</h6></li>)
}
