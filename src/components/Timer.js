import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'

const end = 60;
const warningCount = end*0.2;

const Timer = ({ action }) => {

  const [count, setCount] = useState(end);
  const [isTimerOn, setTimerState] = useState(false);
  const interval = useRef(null)

  useEffect(() => {
    if (isTimerOn && !interval.current) {
      interval.current = setInterval(() => setCount(c => c - 1), 1000)
    }
    if (!isTimerOn) {
      setCount(end)
      stopInterval()
    }
    if (isTimerOn && count === 0){
      action().then(() => setTimerState(false))
    }
  }, [count, isTimerOn, action])

  const stopInterval = () => {
    clearInterval(interval.current)
    interval.current = null
  }

  return (
    <TimerSpan onClick={() => setTimerState(!isTimerOn)} count={count} isTimerOn={isTimerOn}>
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
  font-weight:700;
  display: flex;
  flex-direction: column-reverse;
  position: relative;
  text-align: center;
  

  > div.bottom {
    flex-grow: ${({ count, isTimerOn }) => isTimerOn ? count/end : 0};
    background-color: ${({count}) => count <= warningCount ? '#d70202' : 'black'};
    width: 100%;
    transition: background-color 3s;
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
