import React from 'react'
import styled from 'styled-components'

import {resourceArray} from '../lib/config'
import assets from '../lib/assets'
import api from '../lib/api'

const QuickTrader = ({mainPlayer, player, performTrade, setShowQuickTrade}) => {

  const availaibleResources = []
  resourceArray.forEach((resource) => {
    if(mainPlayer[resource] >= 1) {
      availaibleResources.push(resource)
    }

  })

  return <Wrapper>
    <div className='text'>
      {availaibleResources.length > 0 ? `I'll give you...` : 'Nothing to trade 😞'}
    </div>
        {availaibleResources.map(resource => 
        <div onClick={() => {performTrade(resource)}}  className="resource-image-wrapper"> 
          <img src={assets[resource]} alt={resource}></img>
        </div>)
        }
  </Wrapper>
}

const Wrapper = styled.div`
color: gray;
background-color: #ececec;
transform: translate(0px, -5px);
display:flex;
flex-direction:row;
justify-content:space-evenly;
align-items: center;  

.text {
  vertical-align:center;
}

.resource-image-wrapper{
    max-width: 40px;
    max-height: 40px;
    padding: 4px 10px;


    /* padding: 10px; */
    img {
      height: auto;
      width: 100%;
    }
  }

`


export default QuickTrader