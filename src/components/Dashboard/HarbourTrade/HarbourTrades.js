import React, { useState } from 'react'
import styled from 'styled-components'

import { resourceArray } from '../../../lib/config'
import colors from '../../../lib/colors'
import HarbourTrade from './HarbourTrade'


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

const Header = styled.div`
display: flex;
justify-content: space-between;

i {
  margin-top: 5px;
  color: ${colors.dividerBox}
}
`

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
border: 1px solid ${colors.dividerBox};
background-color: ${colors.cardBG2};
color: ${colors.text2};
font-weight: 500;
margin-bottom: 4px;
margin-top: 2px;

button {
  padding: 2px 4px; 
  background-color: ${colors.greenButton};
  text-align: center;
  font-size: 0.9rem;
  margin: auto;
  margin-top: 5px;
  border: 1px solid ${colors.greenButton};
  color: ${colors.greenButtonText};
  border-radius: 3px;
}
 `

const HarbourTradesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: ${({ editMode }) => editMode ? 'row' : 'column'}
`


export default HarbourTrades
