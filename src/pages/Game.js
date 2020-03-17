import React, { useState } from 'react';
import Card from '../components/Card';
import Auth from '../lib/auth'
import axios from 'axios'

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
</div>
)
}

export default Game