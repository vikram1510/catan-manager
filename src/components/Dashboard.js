import React from 'react'
import styled from 'styled-components'

import AmountSetter from './AmountSetter'
import BuyCard from '../components/BuyCard'
import {resourceArray} from '../lib/config'

const Dashboard = ({player, setPlayer}) => {

  let total = 0;

  resourceArray.forEach((resource) => {
    let count = player?.[resource]
    total +=count
  })  

return (
  <Wrapper>
    <div>{player.name} ({total})</div>
    <AmountSetter amounts={player} setAmounts={setPlayer} />
    <BuyCard amounts={player} setAmounts={setPlayer}/>
  </Wrapper>
)
}

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
border: 1px solid #980b0b;
-webkit-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
-moz-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
background-color: white;
font-weight: 800;
margin-bottom:10px; 
`

export default Dashboard
