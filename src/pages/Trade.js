import React, {useEffect, useState} from 'react'

import api from '../lib/api'
import Auth from '../lib/auth'
import PlayerCard from '../components/PlayerCard'
import AmountSetter from '../components/AmountSetter'

const Trade = () => {

  const [amounts, setAmounts] = useState({ brick: 0, grain: 0, wood: 0, sheep: 0, rock: 0})
  const [player, setPlayer] = useState(null)
  const [tradePlayer, setTradePlayer] = useState(null)

  const changeAmounts = (listTobuy) => {
    const changedAmounts = Object.keys(listTobuy).reduce((final, resourceName) => {
      final[resourceName] = amounts[resourceName] - listTobuy[resourceName]
      return final
    }, {})
    setAmounts({...amounts, ...changedAmounts})
  }


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
    <AmountSetter amounts={amounts} setAmounts={changeAmounts}/>
    <PlayerCard  player={player}/>
    <button>Trade</button>
    </>
  )
}

export default Trade
