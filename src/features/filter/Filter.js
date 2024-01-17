import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits, setSubreddit } from '../../app/redditSlice';
import { Subreddit } from '../subreddit/Subreddit';


export function Filter() {

  const reddit = useSelector((state) => state.reddit);
  const { isLoadingSubreddits, errorSubreddits, subreddit, subreddits } = reddit;
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchSubreddits());
  }, []);
  
  const handleClick = (name) => {
    dispatch(setSubreddit(name))
  }

  const subredditsData = subreddits.map((subreddit)=> {
    return {
      title: subreddit.display_name,
      image: subreddit.icon_img,
      url: subreddit.url
    }
  })
  subredditsData.unshift({
    title: 'Recomended',
    image: '',
    url: 'r/popular',

  })
  
  const subredditsButtons = subredditsData.map((card, i)=> {
    if (card.url==subreddit) {
      return(<Subreddit title={card.title} url={card.url} handleClick={handleClick} image={card.image} selected={true} />)
    }
      return(<Subreddit title={card.title} url={card.url} handleClick={handleClick} image={card.image} selected={false}/>)
  })

  if(isLoadingSubreddits){
    return (
      <nav>
        <h6>...</h6>
      </nav>
    )
  }

  if(errorSubreddits){
    return (
      <nav>
        <h6>Error</h6>
      </nav>
    )
  }

  return (
    <nav>
      <ul>
        {subredditsButtons}
      </ul>
    </nav>
  );
}
