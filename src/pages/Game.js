import React, { useState, useEffect} from 'react';

import styled from 'styled-components'

import Dashboard from '../components/Dashboard';
import PlayerCard from '../components/PlayerCard'

import Auth from '../lib/auth'
import api from '../lib/api';
import assets from '../lib/assets'

const Game = ({history}) => {

const [players, setPlayers] = useState(null)
const [player, setPlayer] = useState(undefined)

const updatePlayers = async (playerId) => {
  const players = await api.getAllPlayers()
  
  const player = players.find(player => player._id === playerId)
  setPlayer(player)
  setPlayers(players)
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

if (players && !player) {
  logout()
}

if (!(players && player)) return null


return (
  <>
  <Wrapper>
    <Header>
    <div className="logo-img-wrapper">
      <img src={assets.logo} alt='Catan Logo'></img>
    </div>
  <LogoutButton onClick={logout}>Log out</LogoutButton>
  </Header>
  <Dashboard player={player}/>
  {players.map((opp, key) =>
    (opp.name !== player.name) ?
    <PlayerCardWrapper onClick={() => openTrade(opp._id)} key={key} >
    <PlayerCard  player={opp}/>
    </PlayerCardWrapper> : undefined)}
  </Wrapper>
  </>
)
}


const Header = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;

.logo-img-wrapper {
  width:100px;
  padding: 7px;

  img {
   width: 100%;
   height: auto;
  }
}
`

const Wrapper = styled.div`
padding-top: 10px;
width: 95%;
margin: auto;
height: 100vh;
display: flex;
flex-direction: column;
`

const PlayerCardWrapper = styled.div `
margin-bottom: 10px;
`

const LogoutButton = styled.button`
background-color: #772020;
color: white;
border-radius: 3px;
border: 1px solid #772020;
padding: 8px;
margin-bottom: 8px;
font-weight:700;
align-self: flex-end;
`
export default Game
