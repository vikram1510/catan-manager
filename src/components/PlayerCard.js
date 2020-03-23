import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'
import { resourceArray } from '../lib/config'

const PlayerCard = ({player}) => {

  const resourceList =resourceArray.reduce((resourceList, resource) => {
    let count = player?.[resource]

    for (let i = 1; i < count; i++) {
      resourceList.push(resource)
    }

    return resourceList
  }, [])  

  console.log(resourceList)

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
      {/* <ResourceWraper>

      </ResourceWraper> */} 
    </Wrapper>
  )

}

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
font-weight: 800;
font-size: 1rem;
border: 1px solid #efc5c5;
background-color: white;
display:flex;


.resource-area {
  /* background-color: red */
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
