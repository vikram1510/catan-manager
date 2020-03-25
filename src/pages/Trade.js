import React, {useEffect, useState} from 'react'
import styled from 'styled-components'

import api from '../lib/api'
import Auth from '../lib/auth'
import PlayerCard from '../components/PlayerCard'
import AmountSetter from '../components/AmountSetter'
import { resourceArray } from '../lib/config'

const Trade = ({history}) => {

  const [amounts, setAmounts] = useState({name: 'Trade', brick: 0, grain: 0, wood: 0, sheep: 0, rock: 0})
  const [player, setPlayer] = useState(null)
  const [tradePlayer, setTradePlayer] = useState(null)
  const [initialPlayer, setInitialPlayer] = useState(null)
  const [initialTradePlayer, setInitialTradePlayer] = useState(null)
  const [trading, setTrading] = useState(false)

  const updatePlayers = async (playerId, tradePlayerId) => {
    const players = await api.getAllPlayers()
    const player = players.find(player => player._id === playerId)
    const tradePlayer = players.find(player => player._id === tradePlayerId)
    setPlayer(player)
    setTradePlayer(tradePlayer)
    setInitialPlayer(player)
    setInitialTradePlayer(tradePlayer)
  }
  
  useEffect(() => {
    const queryUrl = window.location.search
    const urlParams = new URLSearchParams(queryUrl)
    const tradePlayerId = urlParams.get('player')
    const playerId = Auth.getToken()

    updatePlayers(playerId, tradePlayerId)
  }, [])
  // eslint-disable-next-line react-hooks/exhaustive-deps


  const performTrade = async () => {
    setTrading(true)

    let latestPlayer = await api.getPlayerByID(player._id)
    let latestTradePlayer = await api.getPlayerByID(tradePlayer._id)

    resourceArray.forEach((resourceName) => {
      latestPlayer[resourceName] = latestPlayer[resourceName] - amounts[resourceName]
      latestTradePlayer[resourceName] = latestTradePlayer[resourceName] + amounts[resourceName]
    })

    await api.updatePlayer(player._id, latestPlayer)
    await api.updatePlayer(tradePlayer._id, latestTradePlayer)

    setTrading(false)
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
          updatedPlayer[resourceName] = initialPlayer[resourceName] - amounts[resourceName]
          updatedTradePlayer[resourceName] = initialTradePlayer[resourceName] + amounts[resourceName]
        })

        setPlayer({...player, ...updatedPlayer})
        setTradePlayer({...tradePlayer, ...updatedTradePlayer})
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amounts])
    
  if (!(tradePlayer && player)) return null

  return (
    <>
    <Wrapper>
      <TradingWrapper>
      <h2>Trading</h2>
      <h3>({player.name} ➔ {tradePlayer.name})</h3>
      <AmountSetter watchAmounts={player} amounts={amounts} setAmounts={setAmounts}/>
      </TradingWrapper>
      <PlayerCard player={player}/>
      <PlayerCard player={amounts}/>
      <PlayerCard player={tradePlayer}/>
      <Buttons>
        <div className='cancel-button' onClick={cancelTrade} disabled={trading}>Cancel</div>
        <div className='trade-button' onClick={performTrade} disabled={trading}>Trade</div>
      </Buttons>
    </Wrapper>
    </>
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
width:100vw;
height: 100vh;
background-color: #000000aa;

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
  &[disabled]{
    opacity: 0.7;
  }
}

.cancel-button {
  flex-grow: 1;
  margin-right:10px;
  border-radius: 5px;
  padding: 3px 4px;
  background-color: #ce5252;
  border: 2px solid #671d38;
  &[disabled]{
    opacity: 0.7;
  }
}
`

export default Trade
