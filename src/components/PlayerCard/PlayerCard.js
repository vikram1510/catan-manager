import React, { useState } from 'react'
import styled from 'styled-components'

import { resourceArray } from '../../lib/config'
import QuickTrader from '../QuickTrader'
// import assets from '../../lib/assets'
import { rob } from '../../lib/rob'
import { socket } from '../../lib/sockets'
import api from '../../lib/api';

const PlayerCard = ({
  mainPlayer, player, updatePlayers, showTrade, setTradePlayerId }) => {

  const [trading, setTrading] = useState(false)


  let total = 0;
  const resourceListKey = []
  const resourceList = resourceArray.reduce((resourceList, resource) => {
    let count = player?.[resource]

    for (let i = 0; i < count; i++) {
      resourceList.push(resource)
      resourceListKey.push(`${resource} ${i}`)
      total += 1
    }

    return resourceList
  }, [])


  const showTradeMenu = () => {
    if (!showTrade) {
      setTradePlayerId(player._id)
    } else {
      setTradePlayerId('')
    }
  }

  if (!player) return null

  return (
    <BiggerWrapper>
      <Wrapper className='player-card'>
        <div className='player-avatar'>
          <div className='player-name'> {player.name} </div>
          <div className='player-total'>{total}</div>
          <RobButton className='rob' onClick={async () => {
            await robPlayer(player, mainPlayer)
            updatePlayers(mainPlayer._id)
          }}>Rob</RobButton>
        </div>
        <div onClick={() => showTradeMenu()} className='resource-area'>
          <ResourceWraper>
            <div className='resource-wrapper'>
              {resourceList.map((resource, key) =>
                <Resource
                  key={key}
                  className="resource-image-wrapper">
                  <img src={'/question-mark.png'} alt={resource}></img>
                </Resource>
              )}
            </div>
          </ResourceWraper>
        </div>
      </Wrapper>
      {showTrade ? <QuickTrader trading={trading} mainPlayer={mainPlayer} performTrade={(resource) => doQuickTrade(resource, player, mainPlayer, setTrading, updatePlayers)} player={player} /> : null}
    </BiggerWrapper>
  )

}


const robPlayer = async (innocent, player) => {

  const robbedItem = rob({ innocent })

  if (robbedItem) {
    alert(`You robbed 1 ${robbedItem} from ${innocent.name}!`)

    await api.transaction({ toId: player._id, fromId: innocent._id, amounts: { [robbedItem]: 1 } })
    await api.addToHistory({
      text: `${player.name} stole a ${robbedItem} from ${innocent.name}`,
      type: 'ROB'
    })

    socket.emit('apiUpdateLocal')
  } else {
    alert(`${innocent.name} has no items to rob`)
  }

}



const doQuickTrade = async (resource, toPlayer, player, setTrading, updatePlayers) => {

  setTrading(true)
  if (player[resource] >= 1) {
    await api.transaction({ toId: toPlayer._id, fromId: player._id, amounts: { [resource]: 1 } })
    await api.addToHistory({
      text: `${player.name} gave ${toPlayer.name} a ${resource}`,
      type: 'TRADE'
    })

    await updatePlayers(player._id)
    socket.emit('apiUpdateLocal')
  }
  setTrading(false)

}

const RobButton = styled.div`

  background: ${props => props.theme.redButton};
  border-radius: 4px;
  margin:auto;
  text-align: center;
  color: ${props => props.theme.redButtonText};
  
  &:active {
    background: ${props => props.theme.redButtonHighlight};
  }
`

const BiggerWrapper = styled.div`
display:flex;
flex-direction:column;
`

const Wrapper = styled.div`
font-size: 1rem;
display:flex;

.player-avatar {
background-color: ${props => props.theme.playerCardBG};
color: white;
border-radius: 5px 0px 0px 5px;
padding: 10px;
min-width: 50px;
}

.player-name {
  color: ${props => props.theme.playerCardText};
  font-weight: 600;
  text-align: center;
  margin: auto;
}

.player-total {
  color: ${props => props.theme.playerCardText2};
  font-weight: 1000;
  text-align: center;
}

.resource-area {

border: 1px solid ${props => props.theme.borderCol};
border-radius: 0px 5px 5px 0px;
background-color: ${props => props.theme.cardBG};
padding:10px;
flex-grow: 1;
}


.resource-wrapper {
  display: flex;
flex-wrap: wrap;
}
`


const Resource = styled.div`
padding: 0 5px;
width:30px;

  div {
    text-align:center;
  }

  img {
    height: auto;
    width: 100%;
  }
`


const ResourceWraper = styled.div`
display: flex;
flex-wrap: wrap;
`

export default PlayerCard
