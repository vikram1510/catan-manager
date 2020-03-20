import React, { useState } from 'react';
import Card from '../components/Card';
import Auth from '../lib/auth'
import axios from 'axios'

import AmountSetter from '../components/AmountSetter'
import PlayerCard from '../components/PlayerCard'

const Game = (playerName) => {

const [game, setGame] = useState(null)

if (!game) {
  axios.get('http://localhost:3030/players').then((response) => {
    setGame(response.data)
    console.log('response', response);
  })
}

if (game?.length < 2) {
  axios.post('http://localhost:3030/players/', {name: 'noob'}).then((_) => {
  console.log('added noob')})
}


return(
<div style={{width:'90%', margin:'auto'}}>
  <Card name="aa"/>
  <div style={{height:'10px '}}></div>
  <AmountSetter />
  <PlayerCard/>
</div>
)
}

export default Game
