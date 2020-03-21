import React, {useEffect, useState} from 'react'

import api from '../lib/api'
import Auth from '../lib/auth'
import PlayerCard from '../components/PlayerCard'
import AmountSetter from '../components/AmountSetter'
import { resourceArray } from '../lib/config'

const Trade = ({history}) => {

  const [amounts, setAmounts] = useState({ brick: 0, grain: 0, wood: 0, sheep: 0, rock: 0})
  const [player, setPlayer] = useState(null)
  const [tradePlayer, setTradePlayer] = useState(null)
  const [finalPlayer, setFinalPlayer] = useState(null)
  const [finalTradePlayer, setFinalTradePlayer] = useState(null);

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

    updatePlayers(playerId, tradePlayerId)
    const interval = setInterval(async () => updatePlayers(playerId,tradePlayerId), 3000)
    return (() => clearInterval(interval))
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps

  useEffect(()=> {
    if (tradePlayer && player){
      if(!finalTradePlayer && !finalPlayer){
        setFinalTradePlayer(tradePlayer)
        setFinalPlayer(player)
      }
    }
  },[finalPlayer, finalTradePlayer, player, tradePlayer])

  const performTrade = async () => {
    await api.updatePlayer(finalPlayer._id, finalPlayer)
    await api.updatePlayer(finalTradePlayer._id, finalTradePlayer)
    history.push('/game')
  }

  useEffect(() => {  
    if (amounts && player && tradePlayer) {

        let updatedPlayer = {}
        let updatedTradePlayer = {}
        resourceArray.forEach((resourceName) => {
          updatedPlayer[resourceName] = player[resourceName] - amounts[resourceName]
          updatedTradePlayer[resourceName] = tradePlayer[resourceName] + amounts[resourceName]
        })
  
        setFinalPlayer({...player, ...updatedPlayer})
        setFinalTradePlayer({...tradePlayer, ...updatedTradePlayer})
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amounts])
    
  if (!(tradePlayer && player)) return null

  return (
    <>
    <div>Haello {player.name} ,lets trade with player {tradePlayer.name}!</div>
    <AmountSetter watchAmounts={finalPlayer} amounts={amounts} setAmounts={setAmounts}/>
    <PlayerCard  player={finalPlayer ?? player}/>
    <PlayerCard  player={finalTradePlayer ?? tradePlayer}/>
    <button onClick={performTrade}>Trade</button>
    </>
  )
}

export default Trade
