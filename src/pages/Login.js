import React, { useState } from 'react';
import styled from 'styled-components'
import Auth from '../lib/auth'
import api from '../lib/api'

const Login = ({history}) => {

  const [playerName, setPlayerName] = useState('')
  const [showError, setShowError] = useState('')

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
        setShowError(`The name '${playerName}' does not exist`)
    }
    }
      )
  }

  const createPlayerAndJoin = () => {
    if (playerName) {
      api.createPlayer(playerName)
      .then(playerId => {
        Auth.setToken(playerId)
        history.push('/game')
      }
      )
    } else {
      setShowError('Enter a name create and join')
    }
  }


  const deletePlayer = async () => {
    if (playerName) {
      const playerAboutToBeGarbaged = await api.getPlayerByName(playerName)
      await api.deletePlayer(playerAboutToBeGarbaged?._id)
      setShowError(`The player ${playerAboutToBeGarbaged?.name} has been delted`)
    } else {
      setShowError('Enter a name to delete')
    }
  }

return(
  <Wrapper>
    <h1>Catan Manager</h1>
  <p>Enter a name to Join</p>
  <form onSubmit={handleSubmit}>
    <div className='input-area'>
    <input placeholder={'Player Name'} value={playerName} maxLength="35" onChange={e => setPlayerName(e.target.value)}></input>
    {showError && <ErrorMessage className='error-container'><i className="fas fa-exclamation-circle"></i>{showError}</ErrorMessage>}
    </div>
    <button className='join'>Join game</button>
  </form>
  <Buttons>
  <button className='create' onClick={() => createPlayerAndJoin()}>Create player and Join</button>
  <button className='delete' onClick={() => deletePlayer()}>Delete me</button>
  </Buttons>
  </Wrapper>
)
}

const Wrapper = styled.div`
background-color: white;
position: absolute;
top: 30%;
left: 50%;
-webkit-transform: translate(-50%, -50%);
transform: translate(-50%, -50%);
width:80%;
height: auto;
padding: 10px;
-webkit-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
-moz-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);


h1 {
  margin-top:0px;
}

p {
  font-weight: 700;
  font-size:0.9rem;
}

form {
  display:flex;
  flex-direction:column;
}

input {
  padding:5px; 
  border:1px solid #ccc; 
  -webkit-border-radius: 5px;
  border-radius: 5px;
  width:90%;
  align-self: center;
  margin-bottom:5px;
}

.input-area {
  display:flex;
  flex-direction:column;
  margin-bottom:10px;
}

button {
  width: 90%;
  align-self: center;
	border-radius:3px;
	cursor:pointer;
	padding:6px 47px;
	text-decoration:none;
}

.join {
	border:1px solid #3ac247;
  background-color:#98f5b1;
	color:#3ac247;
}

.join:hover {
	background-color:#69cc84;
  color:white;
}
.join:active {
	position:relative;
	top:1px;
}
`

const Buttons = styled.div`

display:flex;
flex-direction:column;
  margin-top:20px;

button {

  width: 90%;
  align-self: center;
  margin-top:10px;
	border-radius:3px;
	cursor:pointer;
	padding:6px 47px;
	text-decoration:none;
}

.create {
	border:1px solid #3ac247;
  background-color:white;
	color:#3ac247;
}

.delete {
  border: 1px solid #c23a3a;
  background-color: #f59898;
  color: #9e3b3b;
}

.create:hover {
	background-color:#69cc84;
  color:white;
}

.delete:hover {
	background-color:#c23a3a;
  color:white;
}

.create:active .delete:active {
	position:relative;
	top:1px;
}

`

const ErrorMessage = styled.div`
color:#e81a36;
font-size:0.8rem;
margin-bottom: 5px;

i {
  margin-right:4px;
}
`

export default Login
