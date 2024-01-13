import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../card/Card';
import { fetchPosts} from '../../app/redditSlice';
import { selectFilteredPosts } from '../../app/redditSlice';


export function Post() {
  const reddit = useSelector((state) => state.reddit);
  const { isLoading, error, subreddit } = reddit;
  const dispatch = useDispatch()
  const posts = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [subreddit]);  

  if(isLoading){
    return (<h1>Loading</h1>)
  }

  if(error){
    return (<h1>Error</h1>)
  }

  if(posts.length){
    return posts.map(post => {
      //replace with card component
      //passed name, image, id...
      return (<p>{post.title}</p>)
    })
  }
}
