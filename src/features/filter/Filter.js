import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSubreddits } from '../../app/redditSlice';
import './Filter.module.css'


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

  const subredditsData = subreddits.map((subreddit)=> {
    console.log(subreddit)
    return {
      title: subreddit.display_name,
      image: subreddit.icon_img,
      id: subreddit.id,
      name: subreddit.name
    }
  })
  
  const subredditsButtons = subredditsData.map((subreddit)=> {
    console.log(subreddit.image)
    return(<li><img src={subreddit.image} alt={subreddit.title}/></li>)
  })

  return (
    <nav>
      <ul>
        {subredditsButtons}
      </ul>
    </nav>
  );
}
