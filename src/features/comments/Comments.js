import React, { useState } from 'react';


export function Comments(props) {
  const {comments, errorComments, isLoadingComments} = props;
  const [amount, setAmount] = useState(5)


  
  const handleClick = () => {
    if(amount+3>commentComponents.length){
      setAmount(amount+3)
    }
    console.log(amount)
  }

  const commentComponents = comments.map(comment => {
    return (
      <li><i>{comment.author}: </i><p>{comment.body}</p></li>
    )
  }).slice(0,amount)

  const returnComponent = (
    <>
    <ul className='post-comments'>
      {commentComponents}
    </ul>
    <button onClick={handleClick} className='add-more-comments'>+</button>
    </>
  )



  if(isLoadingComments){
    return (<h3>loading...</h3>)
  }
  if(errorComments){
    return(<h3>Error</h3>)
  }

  if(comments.length){
    return (<>
      {returnComponent}
    </>)
  }else{
    return(
      <p>No Comments Found</p>
    )
  }
}
