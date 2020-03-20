import React from 'react'

import styled from 'styled-components'

import assets from '../lib/assets'

const ResourceSetter = ({ resourceName, amount, changeResourceAmount } ) => {

  const decreaseAmount = () => {
    if (amount >= 1) changeResourceAmount(resourceName, -1)
  }



  return (
    
    <ResourceWrapper>
        <i style={{color:'green'}} className="fas fa-chevron-circle-up" onClick={() => changeResourceAmount(resourceName, 1)}></i>
        <div className="resource-image-wrapper"> 
          <img src={assets[resourceName]} alt={resourceName}></img>
        </div>
        <i style={{color:'#d82828'}} className="fas fa-chevron-circle-down" onClick={() => decreaseAmount()}></i>
        <p>{amount}</p>
    </ResourceWrapper>
  )

}


const ResourceWrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16%;
  margin-right: 4%;

  .resource-image-wrapper{
    width: 50px;
    height: 50px;

    background-color: white;
    /* padding: 10px; */
    img {
      height: auto;
      width: 100%;
    }
  }

  p {
    font-size: 1.2rem
  }

`

export default ResourceSetter
