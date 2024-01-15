import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './Card.module.css';
import { fetchComments } from '../../app/redditSlice';

export function Card(props) {
  const {title, url, type, text, index, link} = props;
  const reddit = useSelector(state=> state.reddit);
  const {posts} = reddit;
  const comments = posts[index].comments
  const [showingComments, setShowingComments] = useState(false)

  const dispatch = useDispatch()

  const handleClick = async () => {
    dispatch(fetchComments(index, link))
    setShowingComments(!showingComments)
  }
  var commentsComponent =[]
  commentsComponent = comments.map(comment => {
    return (
      <li><i>{comment.author}: </i>{comment.body}</li>
    )
  })
  commentsComponent = commentsComponent.slice(0,8)

  const image = (
    <div className='post'>
      <h3>{title}</h3>
      <img src={url}/>
      <button onClick={handleClick}>Comments</button>
      <ul className='post-comments'>{showingComments?commentsComponent:null}</ul>
    </div>
  )
  const video = (
    <div className='post'>
      <h3>{title}</h3>
      <p>{text?text:null}</p>
      <button onClick={handleClick}>Comments</button>
      <ul className='post-comments'>{showingComments?commentsComponent:null}</ul>
    </div>
  )
  const def = (
    <div className='post'>
      <h3>{title}</h3>
      <p>{text}</p>
      <button onClick={handleClick}>Comments</button>
      <ul className='post-comments'>{showingComments?commentsComponent:null}</ul>
    </div>
  )


  switch(type){
    case 'image':
      return image;
    case 'hosted:video':
      return null;
    default:
      return def
  }
}
