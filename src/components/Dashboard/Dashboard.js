import React from 'react'
import styled from 'styled-components'

import AmountSetter from './AmountSetter'
import BuyCard from './BuyCard'
import HarbourTrades from './HarbourTrade/HarbourTrades'
import { resourceArray } from '../../lib/config'

const Dashboard = ({ player, setPlayer }) => {

  let total = 0;
  resourceArray.forEach((resource) => {
    total += player?.[resource]
  })

  return (
    <Wrapper>
      <div>{player.name} ({total})</div>
      <AmountSetter amounts={player} setAmounts={setPlayer} />
      <BuyCard amounts={player} setAmounts={setPlayer} />
      <HarbourTrades amounts={player} setAmounts={setPlayer} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
padding: 2px 10px 4px;
border-radius: 5px;
border: 1px solid #980b0b;

background-color: white;
font-weight: 800;
margin-bottom:10px; 
`

export default Dashboard
