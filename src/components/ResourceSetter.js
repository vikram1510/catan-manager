import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'

const ResourceSetter = ({ resourceName, amount, changeResourceAmount, watchAmount } ) => {

  const checkAmountsAndChange = (by) => {

    if (watchAmount === null) {
      
      if (by === -1) {

        if (amount > 0) changeResourceAmount({[resourceName]: amount - 1})
      
      } else if ((by === 1)) {

        changeResourceAmount({[resourceName]: amount + 1})
      
      }

    } else {

      if (watchAmount >= 0 && by === -1) {

        if (amount > 0) changeResourceAmount({[resourceName]: amount - 1})

      } else if (watchAmount > 0 && by === 1) {

        changeResourceAmount({[resourceName]: amount + 1})

      }


    }

    // if (watchAmount === null){
    //   if (by < 0 && watchAmount > 0) {
    //     decreaseAmount()
    //   } else {
    //     changeResourceAmount({[resourceName]: amount + 1})
    //   }
    // }

  }


  return (
    
    <ResourceWrapper amount={amount} watchAmount={watchAmount}>
        <i className="fas fa-chevron-circle-up" onClick={() => checkAmountsAndChange(1)}></i>
        <div className="resource-image-wrapper"> 
          <img src={assets[resourceName]} alt={resourceName}></img>
        </div>
        <i  className="fas fa-chevron-circle-down" onClick={() => checkAmountsAndChange(-1)}></i>
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

  .fa-chevron-circle-up {
    color:green;
    opacity: ${({watchAmount}) => ((watchAmount !== null) && (watchAmount <= 0))  ? '30%' : '100%'}
  }

  .fa-chevron-circle-down {
    color:#d82828;
    opacity: ${({amount}) => amount <= 0 ? '30%' : '100%'}
  }

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
