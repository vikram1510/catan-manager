import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'
import { resourceArray } from '../lib/config'

const PlayerCard = ({player, tradeHandler}) => {

  return (
    <Wrapper onClick={() => tradeHandler(player._id)} className='player-card'>
        <PlayerDot></PlayerDot> {player?.name ?? 'Aamir Khan'}
      <ResourceWraper>
        {resourceArray.map((resource, key) => 
        <Resource key={key}>
            <img src={assets[resource]} alt={resource}></img>
            <div>{player?.[resource] ?? '?'}</div>
        </Resource>
        )}
      </ResourceWraper>
    </Wrapper>
  )

}

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
font-weight: 800;
font-size: 1rem;
border: 1px solid #efc5c5;
background-color: white;
`

const ResourceWraper = styled.div`
display: flex;
`

const Resource = styled.div`
height: 25%;
/* margin: auto; */
padding: 0px 10px;

  div {
    text-align:center;
  }

  img {
    height: auto;
    width: 100%;
  }
`

const PlayerDot = styled.span`
  height: 10px;
  width: 10px;
  background-color: black;
  border-radius: 50%;
  display: inline-block;

`

export default PlayerCard