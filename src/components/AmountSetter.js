import React from 'react'
import styled from 'styled-components'

import ResourceSetter from './ResourceSetter'
import { resourceArray } from '../lib/config'

const AmountSetter = ({amounts, setAmounts}) => {

  return (
    <WrapperDiv className="amount-setter-wrapper">
      {resourceArray.map(resource => (
        <ResourceSetter
          key={resource}
          resourceName={resource}
          amount={amounts[resource]}
          changeResourceAmount={setAmounts}
        />
      ))
      }
    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default AmountSetter
