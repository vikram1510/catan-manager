import React, { useState, useEffect } from 'react'
import styled from 'styled-components'


const end = 60;

const Timer = () => {

  const [count, setCount] = useState(0);
  const [isTimerOn, setTimerState] = useState(true);

  useEffect(() => {
    if (isTimerOn){
      setCount(count + 1)
    }
  }, [count, isTimerOn])






  

  

  return (
    <TimerSpan onClick={() => setTimerState(!!isTimerOn)}>
      <div className='top'></div>
      <div className='bottom'></div>
      <p>{count}</p>
    </TimerSpan>
  )
}

const TimerSpan = styled.span`
  height: 30px;
  width: 40px;
  background-color: black;
  display: flex;
  flex-direction: column-reverse;
  position: relative;

  > div.bottom {
    flex-grow: 0.6;
    background-color: yellow;
  }

  p {
    position: absolute;
    width: 100%;
    height: 100%;
    text-align: center;
    color: white;
  }
`


export default Timer
