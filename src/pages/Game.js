import React, { useState } from 'react';
import Card from '../components/Card';
import Auth from '../lib/auth'
import axios from 'axios'

import AmountSetter from '../components/AmountSetter'

const Game = (playerName) => {

const [game, setGame] = useState(null)

if (!game) {
  axios.get('http://api-catan.herokuapp.com/players').then((response) => {
    setGame(response.data)
    console.log('response', response);
  })
} 


return(
<div>
  <Card name="aa"/>
  <AmountSetter />
</div>
)
}

export default Game
