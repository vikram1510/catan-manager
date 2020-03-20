import React from 'react'

import styled from 'styled-components'

import assets from '../lib/assets'

const ResourceSetter = ({ resourceName, amount, changeResourceAmount } ) => {
  return (
    
    <ResourceWrapper>
        <i className="fas fa-chevron-circle-up" onClick={() => changeResourceAmount(resourceName, 1)}></i>
        <div className="resource-image-wrapper"> 
          <img src={assets[resourceName]} alt={resourceName}></img>
        </div>
        <i className="fas fa-chevron-circle-down" onClick={() => changeResourceAmount(resourceName, -1)}></i>
        <p>{amount}</p>
    </ResourceWrapper>
  )

}


const ResourceWrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 15%;
  margin-right: 2%;

  .resource-image-wrapper{
    width: 50px;
    height: 50px;
    margin: 8px;
    background-color: white;
    padding: 10px;
    img {
      height: auto;
      width: 100%;
    }
  }

  p {
  }

`

export default ResourceSetter
