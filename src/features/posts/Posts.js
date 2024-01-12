import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Card } from '../card/Card';

export function Post() {
  /*const fetchT = async () => {
    let returned = await fetch('https://www.reddit.com/r/popular.json')
    .then(response => response.json())
    .then(body => body.data.children)
    returned = returned.filter(post => post.data.post_hint == 'image')
    let posts = returned.map(post => {
      return {
        title: post.data.title,
        author: post.data.author,
        image: post.data.url
      };
    });
    setPostsArr(posts)
  }
  fetchT()*/

  /*const postList = postsArr.map(post=> {return (
    <li>
      <h3>{post.title}</h3>
      <p>author: {post.author}</p>
      <img src={post.image}/>
    </li>
  )})
  console.log(postList)*/

  return (
    <div>
      <ul>
        
      </ul>
    </div>
  );
}
