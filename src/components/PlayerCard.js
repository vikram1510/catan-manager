import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'
import { resourceArray } from '../lib/config'

const PlayerCard = ({player}) => {

  console.log('rdering player card', player)

  const resourceList =resourceArray.reduce((resourceList, resource) => {
    let count = player?.[resource]

    for (let i = 0; i < count; i++) {
      resourceList.push(resource)
    }

    return resourceList
  }, [])  

  if (!player) return null

  return (
    <Wrapper className='player-card'>
      <div className='player-avatar'>
      {player.name}
      </div>
      <div className='resource-area'>
        <ResourceWraper>
        {resourceList.map((resource, key) => 
        <Resource key={key}>
            <img src={assets[resource]} alt={resource}></img> {/* TODO make this a component with custom styling */}
       </Resource>
        )}
        </ResourceWraper>
      </div>
    </Wrapper>
  )

}

const Wrapper = styled.div`
/* padding: 0px 10px 4px; */
font-size: 1rem;
display:flex;

.player-avatar {
background-color: #962716;
color: white;
border-radius: 5px 0px 0px 5px;
padding: 10px;
width: 50px;
}

.resource-area {
border-radius: 0px 5px 5px 0px;
background-color: #fefefe;
flex-grow: 1;
padding:10px;
}

`


const Resource = styled.div`
padding: 0 5px;
width:30px;

  div {
    text-align:center;
  }

  img {
    height: auto;
    width: 100%;
  }
`

const ResourceWraper = styled.div`
display: flex;
flex-wrap: wrap;

`

export default PlayerCard
