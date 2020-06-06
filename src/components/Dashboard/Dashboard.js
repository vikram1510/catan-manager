import React, { useState } from 'react'
import styled from 'styled-components'

import AmountSetter from './AmountSetter'
import BuyCard from './BuyCard'
import HarbourTrades from './HarbourTrade/HarbourTrades'
import { resourceArray } from '../../lib/config'

const Dashboard = ({ player, setPlayer }) => {

  const [show, setShow] = useState(true)

  let total = 0;
  resourceArray.forEach((resource) => {
    total += player?.[resource]
  })

  return (
    <Wrapper show={show}>
      <div className='header'><div>{player.name} <span className='total'>({total})</span></div>
        <button onClick={() => setShow(!show)}>{show ? 'Hide Resources' : 'Show Resources'}</button></div>
      <AmountSetter amounts={player} setAmounts={setPlayer} show={show} />
      <BuyCard amounts={player} setAmounts={setPlayer} />
      <HarbourTrades amounts={player} setAmounts={setPlayer} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
padding: 2px 10px 4px;
border-radius: 5px;
border: 1px solid ${props => props.theme.borderCol};

background-color: ${props => props.theme.cardBG};
color: ${props => props.theme.text};
font-weight: 800;
margin-bottom:10px; 

.total {
  color: ${props => props.theme.text2};
}

.header {
  display:flex;
  justify-content: space-between;
  margin-bottom:10px;
  margin-top:3px;
}

button {
   display:inline-block;
   border-radius: 3px;
   border: 1px solid ${({ show, theme }) => show ? theme.redButton : theme.greenButton} ;
   color:${({ show, theme }) => show ? theme.redButton : theme.greenButton};
   background-color:${({ show, theme }) => show ? theme.redGhostButtonBg : theme.greenGhostButtonBg};
   text-align:center;
   transition: all 0.2s;
}
`

export default Dashboard
