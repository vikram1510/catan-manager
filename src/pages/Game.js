import React, { useState } from 'react';
import Card from '../components/Card';
import Auth from '../lib/auth'
import axios from 'axios'

import AmountSetter from '../components/AmountSetter'

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
<div>
  <Card name="aa"/>
  <AmountSetter />
</div>
)
}

export default Game
