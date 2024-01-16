import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, hideComments } from '../../app/redditSlice';
import { Comments } from '../comments/Comments';

export function Card(props) {
  const {title, url, type, text, index, link} = props;
  const reddit = useSelector(state=> state.reddit);
  const {posts} = reddit;
  const {comments, isLoadingComments, errorComments, isLoadingPosts, errorPosts, showingComments} = posts[index]
  const dispatch = useDispatch()

  const handleClick = async () => {
    if(showingComments)
    {
      dispatch(hideComments(index))
    }else{
          dispatch(fetchComments(index, link))
          console.log(comments)
    }
  }
  let content
  switch(type){
    case 'image':{
      content = (<>
        <img src={url}/>
        {text?<p>{text}</p>:null}
      </>)
    }
    case 'hosted:video':{
      content = (<>
        <a href={link}>Link to Video</a>
      </>)
    }
    default:{
      content = (<>
        <p className='post-body'></p>
      </>)
    }
  }
  const postBodys = document.getElementsByClassName('post-body')
  //postBodys.map(body=>body.innerHTML=text)
  //console.log(postBodys)
  for(let item of postBodys){
    item.innerHTML = text
  }
  let PostContentComponent = (
    <section className='post-content'>
      {content}
    </section>
  )
  
  let PostComponent = (
    <div className='post'>
      <h3>{title}</h3>
      {PostContentComponent}
      <button onClick={handleClick}>{showingComments?'Hide':'Comments'}</button>
      {showingComments?<Comments comments={comments} isLoadingComments={isLoadingComments} errorComments={errorComments}/>:null}
    </div>
  )
  return PostComponent
  }
