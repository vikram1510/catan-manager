import React from 'react'
import styled from 'styled-components'

import { resourceArray } from '../lib/config'
import TransitionResource from './TransitionResource'
import { TransitionGroup } from 'react-transition-group'

const QuickTrader = ({ placeholder, mainPlayer, player, performTrade, trading, min = 1, filter = [] }) => {

  const availaibleResources = []

  resourceArray.forEach((resource) => {

    if (mainPlayer[resource] >= min && !filter.includes(resource)) {
      availaibleResources.push(resource)
    }

  })

  return <Wrapper>
    <div className='text'>
      {availaibleResources.length > 0 ? (placeholder ?? `I'll give you...`) : 'Nothing to trade 😞'}
    </div>
    {availaibleResources.length > 0 ? <TransitionGroup className='resource-list'>
      {availaibleResources.map(resource =>
        <TransitionResource
          key={resource}
          resource={resource}
          disabled={trading}
          onClickHandler={() => performTrade(resource)} />)
      }
    </TransitionGroup> : null}
  </Wrapper>
}

const Wrapper = styled.div`
color: ${props => props.theme.text3};
background-color: ${props => props.theme.cardBG3};
transform: translate(0px, -5px);
display:flex;
flex-direction:row;
justify-content:space-evenly;
align-items: center;  
border-radius: 0 0 5px 5px;
animation: slide-up 0.4s ease;

.resource-list {
  display: flex;
  flex-direction:row;
}

.text {
  vertical-align:center;
}

.resource-image-wrapper{

  &[disabled] {
    opacity:0.5;
  }

    max-width: 40px;
    max-height: 40px;
    padding: 4px 10px;


    img {
      height: auto;
      width: 100%;
    }
}

@keyframes slide-up-img {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes slide-up {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }
    100% {
        opacity: 1;
        transform: translateY(-5px);
    }
}

`


export default QuickTrader