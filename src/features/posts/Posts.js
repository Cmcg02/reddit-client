import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../card/Card';
import { fetchPosts} from '../../app/redditSlice';
import { selectFilteredPosts } from '../../app/redditSlice';


export function Post() {
  const reddit = useSelector((state) => state.reddit);
  const { isLoadingPosts, errorPosts, subreddit, errorState } = reddit;
  const dispatch = useDispatch()
  const posts = useSelector(selectFilteredPosts);

  useEffect(() => {
    dispatch(fetchPosts(subreddit));
  }, [subreddit]);  

  if(isLoadingPosts){
    return (<h1>...</h1>)
  }

  if(errorPosts){
    return errorState?(<h1>{errorState}</h1>):(<h1>Unknown error</h1>)
  }

  if(posts.length){
    
    return posts.map((post, i) => {
      //replace with card component
      //passed name, image, id...
      return (<>
        <Card 
          index={i} 
          title={post.title} 
          url={post.url} 
          type={post.post_hint} 
          text={post.selftext} 
          link={post.permalink}
        /></>)
    })
  }
}
