import React, { useState } from 'react'
import styled from 'styled-components'

import ResourceSetter from './ResourceSetter'
import { resourceArray } from '../lib/config'

const AmountSetter = () => {

  const [amounts, setAmounts] = useState({brick: 0, grain: 0, wood: 0, sheep: 0, rock: 0})

  const changeResourceAmount = (resourceName, by) => {
    setAmounts({ ...amounts, [resourceName]: amounts[resourceName] + by })
  }

  return (
    <WrapperDiv className="amount-setter-wrapper">
      {resourceArray.map(resource => (
        <ResourceSetter
          resourceName={resource}
          amount={amounts[resource]}
          changeResourceAmount={changeResourceAmount}
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
