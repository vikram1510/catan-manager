import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'

const PlayerCard = ({playerData}) => {

  return (
    <PlayerCardWrapper>
      {playerData?.name ?? 'Aamir Khan'}
      <Wrapper>
        {['brick','wood','grain','sheep','rock'].map(
          resource => 
        <Resource>
            <img src={assets[resource]} alt={resource}></img>
            <div>{playerData?.[resource] ?? '?'}</div>
        </Resource>
        )}
      </Wrapper>



    </PlayerCardWrapper>
  )

}

const PlayerCardWrapper = styled.div`
padding:10px;
border-radius: 5px;
font-weight: 800;
font-size: 1.1rem;
border: 1px solid grey;
background-color: white
`

const Wrapper = styled.div`
display: flex;
`

const Resource = styled.div`
height: 25%;
margin:auto;
padding: 5px;

div {
  text-align:center;
}

img {
  height: auto;
  width: 100%;
}
`


export default PlayerCard