import React from 'react'
import styled from 'styled-components'

import AmountSetter from './AmountSetter'
import BuyCard from '../components/BuyCard'

const Dashboard = ({player}) => {


return (
  <Wrapper>
    <div>{player.name}</div>
    <AmountSetter>
    </AmountSetter>
    <BuyCard/>
  </Wrapper>
)



}

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
border: 1px solid grey;
-webkit-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
-moz-box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
box-shadow: 7px 10px 14px -10px rgba(128,128,128,1);
/* box-shadow: 5px 10px; */
background-color: white;
font-weight: 800;
margin-bottom:10px; 
`

export default Dashboard