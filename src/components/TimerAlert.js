import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import api from '../lib/api'
import Auth from '../lib/auth'
import { socket } from '../lib/sockets'

const TimerAlert = ({ gameEvents }) => {
  const [createdBy, setCreatedBy] = useState(null)

  useEffect(() => {
    if (gameEvents) {
      const timerEvent = gameEvents.find(event => event.name === 'timer-end')
      if (timerEvent) setCreatedBy(timerEvent.createdBy)
      else setCreatedBy(null)
    }
  }, [gameEvents])

  const clearEvents = () => {
    api.deleteEvents().then(() => {
      setCreatedBy(null)
      socket.emit('apiUpdateLocal')
    }
    )
  }

  if (!createdBy) return null

  return (
    <Wrapper className="timer">
      <h1 className="animated shake">TIME UP</h1>

      {Auth.getToken() === createdBy._id
        ? <button onClick={clearEvents}>Continue</button> :
        <p>( timer created by {createdBy.name} )</p>
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: black;
  z-index: 1000;
  color: white;
  text-align: center;
  margin: auto;

  button {
    padding: 8px;
    background-color: #0bba0b;
    border: 0;
    border-radius: 8px;
    color: white;
  }

`

export default TimerAlert
