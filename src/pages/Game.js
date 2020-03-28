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
const [syncing, setSyncing] = useState(false)
const [trading, setTrading] = useState(false)
const [tradePlayerId, setTradePlayerId] =  useState(null)

const updatePlayers = async (playerId) => {


  setSyncing(true)

  const players = await api.getAllPlayers()
  const player = players.find(player => player._id === playerId)
  setPlayer(player)
  setPlayers(players)
  
  setSyncing(false)
}


useEffect(() => {
  const playerId = Auth.getToken()
  updatePlayers(playerId)
  const interval = setInterval(async () => await updatePlayers(playerId), 2000)
  return (() => clearInterval(interval))
}, [])

const openTrade = (id) => {
  history.push('/trade?player=' + id)
}

const logout = () => {
  Auth.logout()
  history.push('/')
}

const resetAmounts = async () => {
  const resetAmounts = {brick: 0, wood: 0, grain: 0, rock: 0, sheep: 0}
  await api.updatePlayer(player._id, resetAmounts)
  setPlayer({ ...player, ...resetAmounts})
}

const robPlayer = async (innocent) => {

  const robbedItem = rob({innocent})

  if (robbedItem) {
    alert(`You robbed 1 ${robbedItem} from ${innocent.name}!`)

    await api.transaction({toId: player._id, fromId: innocent._id, amounts:{[robbedItem]: 1}})
    await updatePlayers(player._id)

  } else {

    alert(`${innocent.name} has no items to rob`)

  }
  
}

const doQuickTrade = async (resource, toId) => {
  
  setTrading(true)
  if (player[resource] >= 1 ) {
    await api.transaction({toId, fromId:player._id, amounts:{[resource]: 1}})
    await updatePlayers(player._id)
  }
  setTrading(false)

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
      <GameButton className="refresh" disabled={syncing} onClick={() => updatePlayers(player._id)}> <i className={`fas fa-sync ${syncing ? 'fa-spin' : ''}`}></i></GameButton>
      <GameButton onClick={resetAmounts}>Reset</GameButton>
      <GameButton onClick={logout}>Log out</GameButton>
    </div>

  </Header>
  <Dashboard player={player} setPlayer={setPlayer}/>
  
  {players.map((opp, key) =>
    (opp.name !== player.name) ?
    <PlayerCardWrapper key={key} >
    {oldPlayerCard ? 
    <PlayerCardOld tradeHandler={(id) => openTrade(id)} player={opp} /> : 
    <PlayerCard
      showTrade={opp._id === tradePlayerId ? true : false}
      setTradePlayerId={setTradePlayerId}
      trading={trading} 
      mainPlayer={player} 
      quickTradeHandler={(resource, id) => doQuickTrade(resource, id)} 
      robHandler={(player) => robPlayer(player)} 
      tradeHandler={(id) => openTrade(id)} player={opp}/>}
    </PlayerCardWrapper> : undefined)}

  {/* <input className='aaa' type="checkbox" value={oldPlayerCard} onClick={() => setOldPlayerCard(!oldPlayerCard)}></input> */}
  </Wrapper>
  </>
)
}

const RefreshButton = styled.div`
border-radius: 5px;
padding: 5px;
background-color:#ffdf00;
border: 1px solid black;
text-align:center;
font-weight: 800;
font-size:1.2rem;
height:60px;
vertical-align:center;
margin-bottom: 10px;
display:flex;
align-items: center;
justify-content: center;


&[disabled] {

}
`

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
&.refresh {
  border-radius: 100%;
}
`
export default Game
