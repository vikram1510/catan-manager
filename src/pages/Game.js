import React, { useState } from 'react';
import styled from 'styled-components'
import Card from '../components/Card';
import Auth from '../lib/auth'


// import AmountSetter from '../components/AmountSetter'
import PlayerCard from '../components/PlayerCard'
import api from '../lib/api';

const Game = () => {

const [players, setPlayers] = useState(null)
const [playerName, setPlayerName] = useState(undefined) 

const playerId = Auth.getToken()
if (playerId) {
  api.getPlayerByID(playerId)
  .then((player) => 
 { setPlayerName(player.name)}) 
}

 
if (!players) {
  api.getAllPlayers()
  .then((players) => setPlayers(players))
}





return (
  players &&
<div style={{width:'90%', margin:'auto'}}>
  <Card name={playerName ? playerName : 'no name'}/>
  <div style={{height:'10px '}}></div>
  {
  players.map((player, key) =>
    (player.name !== playerName) ?
    <PlayerCardWrapper key={key} >
    <PlayerCard  player={player}/>
    </PlayerCardWrapper> : undefined)  
  }
</div>
)
}


const PlayerCardWrapper = styled.div `
margin-bottom: 10px;
`
export default Game
