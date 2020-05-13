import React, { useState } from 'react'
import styled from 'styled-components'

import { resourceArray } from '../lib/config'
import HarbourTrade from './HarbourTrade'

// const APIHarbourTrades = ['brick','any4','wood','any3']

const availableTrades = ['any-4', 'any-3', 'brick', 'wood', 'rock', 'sheep', 'grain']

const HarbourTrades = ({ amounts, setAmounts }) => {

  // console.log('RERENDER harbortrade')

  const [editMode, setEditMode] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [harborTrades, setHarborTrades] = useState(['any-4']);

  if (harborTrades.includes('any-3') && harborTrades.includes('any-4')) {
    console.log('removing any-4', harborTrades)
    setHarborTrades(harborTrades.filter(e => e !== 'any-4'))
  }

  const modifyHarborTrade = (tradeName) => {

    if (harborTrades.includes(tradeName)) {
      setHarborTrades(harborTrades.filter(e => e !== tradeName))
    } else {
      setHarborTrades((trades) => [...trades, tradeName])
    }


  }

  return (
    <Wrapper>
      {showCard ? renderHarbourTrades(availableTrades, harborTrades, modifyHarborTrade, setShowCard, amounts, setAmounts, editMode, setEditMode) : renderCollapsedCard({ setShowCard })}
    </Wrapper>)

}

const canDo = (tradeType, playerAmounts) => {

  if (resourceArray.includes(tradeType)) {
    return playerAmounts[tradeType] >= 2
  }

  return resourceArray.some(resource => playerAmounts[resource] >= (tradeType[tradeType.length - 1]))

}


// const createResourceMap = (resources, polarity=1) => {
//   return resources.reduce((final, resource) => {
//     if (!(resource in final)) final[resource] = 0
//     final[resource] = final[resource] + (1 * polarity) 
//     return final
//   }, {})
// }

const renderHarbourTrades = (availableTrades, harborTrades, modifyHarborTrade, setShowCard, amounts, setAmounts, editMode, setEditMode) => (
  <>
    <Header onClick={() => setShowCard(false)}>
      <span>{''}</span>
      <i style={{ margin: 'right' }} className="fas fa-chevron-up"></i>
    </Header>
    <HarbourTradesWrapper editMode={editMode}>
      {

        availableTrades.map(item => {

          if (!editMode && !harborTrades.includes(item)) {
            return null
          }

          return (
            <HarbourTrade
              key={item}
              amounts={amounts}
              item={item}
              editMode={editMode}
              checked={harborTrades.includes(item)}
              canDo={canDo(item, amounts)}
              modifyHarborTrade={modifyHarborTrade}
              setShowCard={setShowCard}
              setAmounts={setAmounts}
            />


          )
        })}
    </HarbourTradesWrapper>
    <button onClick={() => setEditMode(!editMode)}>{editMode ? 'Save' : 'Edit'}</button>
  </>
)

const renderCollapsedCard = ({ setShowCard }) => (
  <Header onClick={() => setShowCard(true)}>
    <span style={{ marginTop: '1px' }}>{'Harbour Trades'}</span>
    <i style={{ margin: 'right' }} className="fas fa-chevron-down"></i>
  </Header>
)



// const BuyButton = styled.div`
//   padding: 2px 4px;
//   width: 30px;
//   background-color: ${props => props.canBuy ? '#50b350' : '#50b350'};
//   text-align: center;
//   font-size: 0.9rem;
//   margin: auto;
//   border: 1px solid ${props => props.canBuy ? '#50b350' : '#50b350'};
//   opacity: ${props => props.canBuy ? '1' : '0.3'};
//   color: white;
//   flex-grow: 2;
// `

const Header = styled.div`
display: flex;
justify-content: space-between;

i {
  margin-top: 5px;
}
`

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
border: 1px solid lightgray;
background-color: white;
font-weight: 500;
margin-bottom: 4px;
margin-top: 2px;

button {
  padding: 2px 4px; 
  background-color: #50b350;
  text-align: center;
  font-size: 0.9rem;
  margin: auto;
  margin-top: 5px;
  border: 1px solid #50b350;
  color: white;
  border-radius: 3px;
}
 `
// const ResourceWraper = styled.div`
// display: flex;
// width:80%;
// font-weight:800;
// flex-grow: 7;
// `

// const Resource = styled.div`
// width: 30px;
// height: 30px;
// padding: 0px 4px;

//   img {
//     height: auto;
//     width: 100%;
//   }
// `

const HarbourTradesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ editMode }) => editMode ? 'row' : 'column'}
`


export default HarbourTrades
