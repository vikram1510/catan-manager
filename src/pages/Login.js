import React, { useState } from 'react';
import styled from 'styled-components'
import Auth from '../lib/auth'
import api from '../lib/api'

const Login = ({history}) => {

  const [playerName, setPlayerName] = useState('')
  const [showError, setShowError] = useState(null)

  if (Auth.isAuthenticated()) history.push('/game') 

  const handleSubmit = (e) => {
    e.preventDefault()
    api.getPlayerByName(playerName)
    .then(player => {
      if (player) {
        Auth.setToken(player._id)
        history.push('/game') 
      }
      else {
        setShowError(`The name ${playerName} does not exist`)
    }
    }
      )
  }

  const createPlayerAndJoin = () => {
    api.createPlayer(playerName)
    .then(playerId => {
      Auth.setToken(playerId)
      history.push('/game')
    }
    )
  }


  const deletePlayer = async () => {
    const playerAboutToBeGarbaged = await api.getPlayerByName(playerName)
    await api.deletePlayer(playerAboutToBeGarbaged._id)
    setShowError(`The player ${playerAboutToBeGarbaged.name} has been delted`)
  }

return(
<div>
  Hello, Welcome to Catan!

  Enter name to login:
  <form onSubmit={handleSubmit}>
  <input placeholder={'Enter Name'} value={playerName} maxLength="35" onChange={e => setPlayerName(e.target.value)}></input>
  <button>Join game</button>
  {showError && <ErrorMessage style={{color:'red'}}>{showError}</ErrorMessage>}
  </form>
  <button onClick={createPlayerAndJoin}>Create player and Join</button>
  <button onClick={deletePlayer}>Delete me</button>
</div>
)
}

const ErrorMessage = styled.div`
font-size:0.8rem`

export default Login
