import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { socket } from '../../lib/sockets';
import colors from '../../lib/colors';

const end = 3;
const warningCount = end * 0.2;

const Timer = ({ action, playerName }) => {

  const [count, setCount] = useState(end);
  const [isTimerOn, setTimerState] = useState(false);
  const [editable, setEditable] = useState(true);
  const [creator, setCreator] = useState('')
  const interval = useRef(null)

  useEffect(() => {
    socket.on('updateTimer', ({ playerName: timerCreatorName, timerState }) => {
      setTimerState(timerState)
      setCreator(timerCreatorName)
      if (timerCreatorName !== playerName & timerState === true) {
        setEditable(false)
      } else {
        setEditable(true)
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
      socket.emit('updateTimerLocal', { playerName: playerName, timerState: !isTimerOn })
      setTimerState(!isTimerOn)
      setCreator('')
    }
  }

  return (
    <TimerSpan onClick={() => updateTimer()} count={count} isTimerOn={isTimerOn} editable={editable}>
      <div className='top'></div>
      <div className='bottom'></div>
      <p className='time'>{isTimerOn ? count : 'Timer'}</p>
      <p className='creator'>{isTimerOn ? creator.substr(0, 9) : ''}</p>
    </TimerSpan>
  )
}

const TimerSpan = styled.span`
  height: 30px;
  width: 54px;
  background-color: ${colors.button};
  color: ${colors.buttonText};
  font-weight:700;
  display: flex;
  align-self: center;
  font-size: 1rem;
  flex-direction: column-reverse;
  position: relative;
  text-align: center;
  border-radius: 3px;
  border:  ${({ editable }) => editable ? '0px' : '1.5px solid #fc033d'};
  

  > div.bottom {
    flex-grow: ${({ count, isTimerOn }) => isTimerOn ? count / end : 0};
    background-color: ${({ count }) => count <= warningCount ? colors.redButton : colors.black};
    width: 100%;
    transition: background-color 3s;
  }

  .time {
    position: absolute;
    width: 100%;
    height: 100%;
    color: ${colors.playerCardText};
    left: 0;
  }
  
  .creator {
    position: absolute;
    top:15px;
    font-size: 0.7rem;
    width: 100%;
    height: 100%;
    color: ${colors.playerCardText2};
  }
`


export default Timer
