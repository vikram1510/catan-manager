import React, { useState, useEffect} from 'react';

import styled from 'styled-components'

import Dashboard from '../components/Dashboard';
import PlayerCard from '../components/PlayerCard'
import PlayerCardOld from '../components/PlayerCardOld'

import Auth from '../lib/auth'
import api from '../lib/api';
import assets from '../lib/assets'
import {rob} from '../lib/rob'

const Game = ({history}) => {

const [players, setPlayers] = useState(null)
const [player, setPlayer] = useState(undefined)
const [oldPlayerCard, setOldPlayerCard] = useState(false)
const [updateInProgress, setUpdateInProgress] = useState(false)

const updatePlayers = async (playerId) => {

  setUpdateInProgress(true)

  const players = await api.getAllPlayers()
  const player = players.find(player => player._id === playerId)
  setPlayer(player)
  setPlayers(players)

  setUpdateInProgress(false)

}

const setPlayerWhenReady = (player) => {
  if (!updateInProgress) {
    setPlayer(player)
  }
}

useEffect(() => {
  const playerId = Auth.getToken()
  updatePlayers(playerId)
  const interval = setInterval(async () => await updatePlayers(playerId), 3000)
  return (() => clearInterval(interval))
}, [])

useEffect(() => {

  if (player && !updateInProgress) {
    api.updatePlayer(player._id, player)
  }

}, [player, updateInProgress])

const openTrade = (id) => {
  history.push('/trade?player=' + id)
}

const logout = () => {
  Auth.logout()
  history.push('/')
}

const resetAmounts = () => setPlayer({ ...player, brick: 0, wood: 0, grain: 0, rock: 0, sheep: 0})

const robPlayer = async (innocent) => {

  const {newRobber, newInnocent, robbedItem} = rob({robber:player,innocent})

  if (robbedItem) {
    alert(`You robbed 1 ${robbedItem} from ${innocent.name}!`)
  } else {
    alert(`${innocent.name} has no items to rob`)
  }
  api.updatePlayer(innocent._id, newInnocent)
  api.updatePlayer(player._id, newRobber)

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
    <div className="game-buttons">
      <GameButton onClick={resetAmounts}>Reset</GameButton>
      <GameButton onClick={logout}>Log out</GameButton>
    </div>

  </Header>
  <Dashboard player={player} setPlayer={setPlayerWhenReady}/>
  {players.map((opp, key) =>
    (opp.name !== player.name) ?
    <PlayerCardWrapper key={key} >
    {oldPlayerCard ? 
    <PlayerCardOld tradeHandler={(id) => openTrade(id)} player={opp} /> : 
    <PlayerCard robHandler={(player) => robPlayer(player)} tradeHandler={(id) => openTrade(id)} player={opp}/>}
    </PlayerCardWrapper> : undefined)}
  <input className='aaa' type="checkbox" value={oldPlayerCard} onClick={() => setOldPlayerCard(!oldPlayerCard)}></input>
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
.game-buttons {
  button:first-of-type{
    margin-right: 16px;
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

const GameButton = styled.button`
background-color: #772020;
color: white;
border-radius: 3px;
border: 1px solid #772020;
padding: 8px;
font-weight:700;
align-self: flex-end;
`
export default Game
