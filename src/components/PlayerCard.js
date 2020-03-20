import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'
import { resourceArray } from '../lib/config'

const PlayerCard = ({player}) => {

  return (
    <PlayerCardWrapper>
        <PlayerDot></PlayerDot> {player?.name ?? 'Aamir Khan'}
      <Wrapper>
        {resourceArray.map((resource, key) => 
        <Resource key={key}>
            <img src={assets[resource]} alt={resource}></img>
            <div>{player?.[resource] ?? '?'}</div> {/* TODO make this a component with custom styling */}
        </Resource>
        )}
      </Wrapper>
    </PlayerCardWrapper>
  )

}

const PlayerCardWrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
font-weight: 800;
font-size: 1rem;
border: 1px solid grey;
background-color: white;
`

const Wrapper = styled.div`
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