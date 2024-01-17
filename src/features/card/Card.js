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

  if(type=='image'){
    content= (<div className='image-content'>
      <img src={url}/>
      <p className='post-body'></p>
    </div>)
  } else if(type=='hosted:video'){
    content = (<div className='video-content'>
      <a href={link}>Link to Video</a>
      <p className='post-body'></p>
    </div>)
  } else{
    content = (<div className='default-content'>
      <p className='post-body'></p>
    </div>)
  }

  const postBodys = document.getElementsByClassName('post-body')
  //postBodys.map(body=>body.innerHTML=text)
  //console.log(postBodys)
  for(let item of postBodys){
    if(text){item.innerHTML = text}
  }
  
  let PostComponent = (
    <div className='post'>
      <h3>{title}</h3>
      {content}
      <span className='comments'>      
        <button onClick={handleClick}>{showingComments?'Hide':'Comments'}</button>
        {showingComments?<Comments comments={comments} isLoadingComments={isLoadingComments} errorComments={errorComments}/>:null}
      </span>
    </div>
  )
  return PostComponent
  }
