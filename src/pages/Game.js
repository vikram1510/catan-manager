import React, { useState, useEffect} from 'react';

import styled from 'styled-components'

import Dashboard from '../components/Dashboard';
import PlayerCard from '../components/PlayerCard'

import Auth from '../lib/auth'
import api from '../lib/api';

const Game = ({history}) => {

const [players, setPlayers] = useState(null)
const [player, setPlayer] = useState(undefined)

const updatePlayers = async (playerId) => {
  const players = await api.getAllPlayers()
  setPlayers(players)

  const player = players.find(player => player._id === playerId)
  setPlayer(player)
}

useEffect(() => {
  const playerId = Auth.getToken()
  updatePlayers(playerId)
  const interval = setInterval(async () => updatePlayers(playerId), 3000)
  return (() => clearInterval(interval))
}, [])

const openTrade = (id) => {
  history.push('/trade?player=' + id)
}

const logout = () => {
  Auth.logout()
  history.push('/')
}


if (!(players && player)) return null

return (
  <Wrapper>
  <LogoutButton onClick={logout}>Logout</LogoutButton>
  <Dashboard player={player}/>
  {players.map((opp, key) =>
    (opp.name !== player.name) ?
    <PlayerCardWrapper onClick={() => openTrade(opp._id)} key={key} >
    <PlayerCard  player={opp}/>
    </PlayerCardWrapper> : undefined)}
  </Wrapper>
)
}


const Wrapper = styled.div`
padding-top: 10px;
width: 90%;
margin: auto;
display: flex;
flex-direction: column;
`


const PlayerCardWrapper = styled.div `
margin-bottom: 10px;
`

const LogoutButton = styled.button`
background-color: #ce3737;
color: white;
border-radius: 10%;
padding: 8px;
margin-bottom: 8px;
align-self: flex-end;
`
export default Game
