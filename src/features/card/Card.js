import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchComments, hideComments } from '../../app/redditSlice';
import { Comments } from '../comments/Comments';
import commentIcon from './comment-icon.png'
import canelIcon from './Cross_icon.png'
import linkIcon from './link-icon.png'

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
      {text?<p className='post-body' id={`body${index}`}>{posts[index].selftext}</p>:null}
    </div>)
  } else if(type=='hosted:video'){
    content = (<div className='video-content'>
      <p>Video unavailable, please follow the link to watch it on Reddit.</p>
      {text?<p className='post-body' id={`body${index}`}>{posts[index].selftext}</p>:null}
    </div>)
  } else{
    content = (<div className='default-content'>
      {text?<p className='post-body' id={`body${index}`}>{posts[index].selftext}</p>:null}
    </div>)
  }

  
  let PostComponent = (
    <div className='post'>
      <h3>{title}</h3>
      {content}
      <span className='comments'>      
        <button onClick={handleClick}>{showingComments?(<img src={canelIcon} className='cancel-icon icon'/>):(<img src={commentIcon} className='comment-icon'/>)}</button>
        <a href={posts[index].url} target='_blank'><button href={posts[index].url}><img src={linkIcon} className='link-icon icon'/></button></a>
        {showingComments?<Comments comments={comments} isLoadingComments={isLoadingComments} errorComments={errorComments}/>:null}
      </span>
    </div>
  )
  return PostComponent
  }
