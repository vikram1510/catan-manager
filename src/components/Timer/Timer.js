import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { socket } from '../../lib/sockets';

const end = 60;
const warningCount = end * 0.2;

const Timer = ({ action, player }) => {

  const [count, setCount] = useState(end);
  const [isTimerOn, setTimerState] = useState(false);
  const [editable, setEditable] = useState(true);
  const interval = useRef(null)

  const playerName = player.name


  useEffect(() => {
    socket.on('updateTimer', ({ playerName: socketPlayerName, timerState }) => {
      console.log('update recieved', socketPlayerName, timerState)
      setTimerState(timerState)
      if (socketPlayerName !== playerName & timerState === true) {
        setEditable(false)
        console.log('timer locked')
      } else {
        setEditable(true)
        console.log('timer not locked')
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isTimerOn && !interval.current) {
      interval.current = setInterval(() => setCount(c => c - 1), 1000)
    }
    if (!isTimerOn) {
      setCount(end)
      stopInterval()
    }
    if (isTimerOn && count === 0) {
      if (editable) {
        action()
      } else {
        setEditable(true)
      }
      setTimerState(false)
    }
  }, [count, isTimerOn, action, editable])

  const stopInterval = () => {
    clearInterval(interval.current)
    interval.current = null
  }

  const updateTimer = () => {
    if (editable) {
      socket.emit('updateTimerLocal', { playerName: player.name, timerState: !isTimerOn })
      setTimerState(!isTimerOn)
    }
  }

  return (
    <TimerSpan onClick={() => updateTimer()} count={count} isTimerOn={isTimerOn} editable={editable}>
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
  border-radius: 3px;
  border:  ${({ editable }) => editable ? '0px' : '1.5px solid #fcba03'};
  

  > div.bottom {
    flex-grow: ${({ count, isTimerOn }) => isTimerOn ? count / end : 0};
    background-color: ${({ count }) => count <= warningCount ? '#d70202' : 'black'};
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