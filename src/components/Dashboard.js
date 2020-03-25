import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

import AmountSetter from './AmountSetter'
import BuyCard from '../components/BuyCard'
import api from '../lib/api'

const Dashboard = ({player, setPlayer}) => {

const updatePlayer = (newPlayer) => {
  api.updatePlayer(player._id, newPlayer)
  setPlayer(newPlayer)
}

return (
  <Wrapper>
    <div>{player.name}</div>
    <AmountSetter amounts={player} setAmounts={updatePlayer} />
    <BuyCard amounts={player} setAmounts={updatePlayer}/>
  </Wrapper>
)



}

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
border: 1px solid #efc5c5;
-webkit-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
-moz-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
/* box-shadow: 5px 10px; */
background-color: white;
font-weight: 800;
margin-bottom:10px; 
`

export default Dashboard
