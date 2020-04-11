import React, { useState, useEffect, useRef, useCallback } from 'react'
import styled from 'styled-components'

const end = 60;

const Timer = ({ action }) => {

  const [count, setCount] = useState(0);
  const [isTimerOn, setTimerState] = useState(false);
  const interval = useRef(null)

  useEffect(() => {
    if (isTimerOn && (!count && !interval.current)) {
      interval.current = setInterval(() => setCount(c => c + 1), 1000)
    }
    if (!isTimerOn) {
      setCount(0)
      stopInterval()
    }
    if (isTimerOn && count === end){
      action().then(() => setTimerState(false))
    }
  }, [count, isTimerOn, action])

  const stopInterval = () => {
    clearInterval(interval.current)
    interval.current = null
  }



  return (
    <TimerSpan onClick={() => setTimerState(!isTimerOn)} count={count}>
      <div className='top'></div>
      <div className='bottom'></div>
      <p>{isTimerOn ? count : 'Timer'}</p>
    </TimerSpan>
  )
}

const TimerSpan = styled.span`
  height: 30px;
  width: 54px;
  background-color: #772020;
  color: white;
  border-radius: 3px;
  border: 1px solid #772020;
  font-weight:700;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  text-align: center;
  

  > div.bottom {
    flex-grow: ${({ count }) => count / end};
    background-color: black;
    width: 100%;
  }

  p {
    position: absolute;
    width: 100%;
    height: 100%;
    color: white;
    left: 0;
  }
`


export default Timer
