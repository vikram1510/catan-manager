import React from 'react'
import styled from 'styled-components'

import ResourceSetter from './ResourceSetter'
import { resourceArray } from '../lib/config'
import api from '../lib/api'

const AmountSetter = ({ amounts, setAmounts, watchAmounts = null }) => {

  const changeResourceAmount = async (resource, amount) => {
    const newAmounts = await api.bank({ playerId: amounts._id, amounts: { [resource]: amount } })

    let text = ''
    let type = ''
    if (amount > 0) {
      text = `${amounts.name} got ${amount} ${resource}`
      type = 'COLLECT'
    } else {
      text = `${amounts.name} lost ${amount * -1} ${resource}`
      type = 'RETURN'
    }

    await api.addToHistory({ text, type })
    setAmounts(newAmounts)
  }

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
