import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'
import { resourceArray } from '../lib/config'

const PlayerCard = ({player}) => {

  let total = 0;

  const resourceList =resourceArray.reduce((resourceList, resource) => {
    let count = player?.[resource]

    for (let i = 0; i < count; i++) {
      resourceList.push(resource)
      total +=1
    }

    return resourceList
  }, [])  

  if (!player) return null

  return (
    <Wrapper className='player-card'>
      <div className='player-avatar'>
      <div className='player-name'> {player.name} </div>
      <div className='player-total'>{total}</div>
      </div>
      <div className='resource-area'>
        <ResourceWraper>
        {resourceList.map((resource, key) =>  
          <Resource key={key}>
            <img src={assets[resource]} alt={resource}></img> 
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
min-width: 50px;
}

.player-name {
  font-weight: 600;
  text-align: center;
  margin: auto;
}

.player-total {
  color: #da8d82;
  font-weight: 1000;
  text-align: center;
}

.resource-area {
border-radius: 0px 5px 5px 0px;
background-color: #fefefe;
padding:10px;
flex-grow: 1;
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
