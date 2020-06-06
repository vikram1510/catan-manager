import React from 'react'
import styled from 'styled-components'

import assets from '../../lib/assets'

const ResourceSetter = ({ resourceName, amount, changeResourceAmount, watchAmount, show }) => {

  const checkAmountsAndChange = (by) => {

    if (watchAmount === null) {

      if (by === -1) {

        if (amount > 0) changeResourceAmount(resourceName, -1)

      } else if ((by === 1)) {

        changeResourceAmount(resourceName, 1)

      }

    } else {

      if (watchAmount >= 0 && by === -1) {

        if (amount > 0) changeResourceAmount(resourceName, by)

      } else if (watchAmount > 0 && by === 1) {

        changeResourceAmount(resourceName, by)

      }

    }


  }


  return (

    <ResourceWrapper amount={amount} watchAmount={watchAmount} show={show}>
      <i className="fas fa-plus-square" onClick={() => checkAmountsAndChange(1)}></i>
      <div className="resource-image-wrapper">
        <img src={assets[resourceName]} alt={resourceName}></img>
      </div>
      <i className="fas fa-minus-square" onClick={() => checkAmountsAndChange(-1)}></i>
      <p>{show ? amount : 'X'}</p>
    </ResourceWrapper>
  )

}

const ResourceWrapper = styled.div`

  display: flex;
  flex-direction: column;
  align-items: center;
  width: 16%;
  margin-right: 4%;

  i {
    font-size: 40px;
  }

  :last-child {
    margin-right: 0px
  }

  .fa-plus-square {
    color:${props => props.theme.greenButton};
    opacity: ${({ watchAmount }) => ((watchAmount !== null) && (watchAmount <= 0)) ? '0.3' : '1'};
  }

  i:active {
     opacity: 0.5
    }

  .fa-minus-square {
    color:${props => props.theme.redButton};
    opacity: ${({ amount, show }) => !show || amount > 0 ? '1' : '0.3'};
  }

  .resource-image-wrapper{
    width: 50px;
    height: 50px;


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
