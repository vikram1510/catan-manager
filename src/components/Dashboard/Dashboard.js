import React, { useState } from 'react'
import styled from 'styled-components'

import AmountSetter from './AmountSetter'
import BuyCard from './BuyCard'
import HarbourTrades from './HarbourTrade/HarbourTrades'
import { resourceArray } from '../../lib/config'
import colors from '../../lib/colors'

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
border: 1px solid ${colors.borderCol};

background-color: ${colors.cardBG};
color: ${colors.text};
font-weight: 800;
margin-bottom:10px; 

.total {
  color: ${colors.text2};
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
   border: 1px solid ${({ show }) => show ? colors.redButton : colors.greenButton} ;
   color:${({ show }) => show ? colors.redButton : colors.greenButton};
   background-color:${({ show }) => show ? colors.redButtonText : colors.greenButtonText};
   text-align:center;
   transition: all 0.2s;
}
`

export default Dashboard
