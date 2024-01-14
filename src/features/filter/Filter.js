import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits, setSubreddit } from '../../app/redditSlice';
import './Filter.module.css';
import { Subreddit } from '../subreddit/Subreddit';


export function Filter() {
  // const exampleFiltersList = []
  // for(var i=1; i<5; i++){
  //   exampleFiltersList.push(<li><button>{`filter ${i}`}</button></li>)
  // }

  const reddit = useSelector((state) => state.reddit);
  const { isLoadingSubreddits, error, subreddit, subreddits } = reddit;
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
      id: subreddit.id,
      url: subreddit.url
    }
  })
  
  const subredditsButtons = subredditsData.map((card, i)=> {
    if (card.url==subreddit) {
      return(<Subreddit title={card.title} url={card.url} handleClick={handleClick} image={card.image} selected={true}/>)
    }
      return(<Subreddit title={card.title} url={card.url} handleClick={handleClick} image={card.image} selected={false}/>)
  })

  return (
    <nav>
      <ul>
        {subredditsButtons}
      </ul>
    </nav>
  );
}
