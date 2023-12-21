import React from 'react';
import Cappuccino from '../media/cappuccino.png';
import { useState } from 'react';
import '../style.css';

export default function ItemCard () {
  const [count, setCount] = useState(0);

  function add(){
    setCount(oldValue => oldValue + 1);
    console.log(count);
  }

  function subtract(){
    if(count > 0){
      setCount(count - 1);
    }
  }
  return (
    <div className='card'>
        <h1>Cappuccino</h1>
        <img src={Cappuccino} alt='cappuccino'/>

        <button className='card--button-customise'>Customise</button>

        <div className='card--button-counter'>
          <button className='counter--minus' onClick={subtract}>-</button>
          <div className='counter--count'>{count}</div>
          <button className='counter--plus' onClick={add}>+</button>
        </div>

        <button className='card--button-add'>Add to Cart</button>

    </div>
  );
};

