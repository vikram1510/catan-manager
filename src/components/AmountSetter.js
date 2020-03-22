import React from 'react'
import styled from 'styled-components'

import ResourceSetter from './ResourceSetter'
import { resourceArray } from '../lib/config'

const AmountSetter = ({amounts, setAmounts, watchAmounts = null }) => {

  const changeResourceAmount = (resourceMap) => {
    setAmounts({...amounts, ...resourceMap})
  }

  console.log('jkhkjsd', watchAmounts)

  return (
    <WrapperDiv className="amount-setter-wrapper">
      {resourceArray.map(resource => (
        <ResourceSetter
          key={resource}
          resourceName={resource}
          amount={amounts[resource]}
          changeResourceAmount={changeResourceAmount}
          watchAmount={watchAmounts && watchAmounts[resource]}
        />
      ))
      }
    </WrapperDiv>
  )
}

const WrapperDiv = styled.div`
  touch-action: manipulation;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`

export default AmountSetter
