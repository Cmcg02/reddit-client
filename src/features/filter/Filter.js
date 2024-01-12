import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './Filter.module.css'


export function Filter() {
  const exampleFiltersList = []
  for(var i=1; i<5; i++){
    exampleFiltersList.push(<li><button>{`filter ${i}`}</button></li>)
  }

  return (
    <nav>
      <ul>
        {exampleFiltersList}
      </ul>
    </nav>
  );
}
