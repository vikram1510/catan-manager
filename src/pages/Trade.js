import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

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

  const cancelTrade = () => {
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
    <Wrapper>
      <TradingWrapper>
      <h2>Trading</h2>
      <h3>({player.name} ➔ {tradePlayer.name})</h3>
      <AmountSetter watchAmounts={finalPlayer} amounts={amounts} setAmounts={setAmounts}/>
      </TradingWrapper>
      <PlayerCard player={finalPlayer}/>
      <PlayerCard player={finalTradePlayer}/>
      <Buttons>
        <div className='cancel-button' onClick={cancelTrade}>Cancel</div>
        <div className='trade-button' onClick={performTrade}>Trade</div>
      </Buttons>
    </Wrapper>
  )
}

const TradingWrapper = styled.div`
padding-top: 10px;
padding: 10px;
background-color: white;
opacity: 100%;
`

const Wrapper = styled.div`
padding-top: 10px;
width: 90%;
margin: auto;

h2 {
  margin: 0px;
}

h3 {
  margin: 0px;
  margin-bottom:15px;
  color:grey;
}

.player-card {
  margin-top: 10px;
}
`

const Buttons = styled.div`

margin-top: 20px;
text-align: center;
font-size: 1.1rem;
font-weight: 700;
color: white;
display: flex;

.trade-button {
  flex-grow: 3;
  border-radius: 5px;
  padding: 3px 4px;
  background-color: #50b350;
  border: 2px solid #255225;
}

.cancel-button {
  flex-grow: 1;
  margin-right:10px;
  border-radius: 5px;
  padding: 3px 4px;
  background-color: #ce5252;
  border: 2px solid #671d38;
}
`

export default Trade
