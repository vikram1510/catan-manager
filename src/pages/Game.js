import React, { useState } from 'react';
import styled from 'styled-components'

import Card from '../components/Card';
import Dashboard from '../components/Dashboard';
import PlayerCard from '../components/PlayerCard'



// import AmountSetter from '../components/AmountSetter'
import Auth from '../lib/auth'
import api from '../lib/api';

const Game = () => {

const [players, setPlayers] = useState(null)
const [player, setPlayer] = useState(undefined) 

const playerId = Auth.getToken()
if (playerId) {
  api.getPlayerByID(playerId)
  .then((player) => 
 { setPlayer(player)}) 
 api.getAllPlayers()
 .then((players) => setPlayers(players))
}

if (!(players && player)) return null

return (
  <Wrapper>
  <Dashboard player={player}/>
  {players.map((opp, key) =>
    (opp.name !== player.name) ?
    <PlayerCardWrapper key={key} >
    <PlayerCard  player={opp}/>
    </PlayerCardWrapper> : undefined)}
</Wrapper>
)
}


const Wrapper = styled.div`
padding-top: 10px;
width: 90%;
margin: auto;
`


const PlayerCardWrapper = styled.div `
margin-bottom: 10px;
`
export default Game
