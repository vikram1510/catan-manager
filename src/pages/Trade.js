import React, {useEffect, useState} from 'react'

import api from '../lib/api'
import Auth from '../lib/auth'
import PlayerCard from '../components/PlayerCard'
import AmountSetter from '../components/AmountSetter'

const Trade = () => {
  
  const [player, setPlayer] = useState(undefined)
  const [tradePlayer, setTradePlayer] = useState(undefined)
  
  const updatePlayers = async (playerId, tradePlayerId) => {
    const players = await api.getAllPlayers()
    const player = players.find(player => player._id === playerId)
    const tradePlayer = players.find(player => player._id === tradePlayerId)
    setPlayer(player)
    setTradePlayer(tradePlayer)
  }
  
  useEffect(() => {
    const queryUrl = window.location.search
    const urlParams = new URLSearchParams(queryUrl)
    const tradePlayerId = urlParams.get('player')

    const playerId = Auth.getToken()
    updatePlayers(playerId,tradePlayerId)
    const interval = setInterval(async () => updatePlayers(playerId,tradePlayerId), 3000)
    return (() => clearInterval(interval))
  }, [])

  if (!(tradePlayer && player)) return null

  return (
    <>
    <div>Haello {player.name} ,lets trade with player {tradePlayer.name}!</div>
    <PlayerCard  player={tradePlayer}/>
    <AmountSetter amounts={player} setAmounts={(list) => {console.log(list)}}/>
    <PlayerCard  player={player}/>
    </>
  )
}

export default Trade