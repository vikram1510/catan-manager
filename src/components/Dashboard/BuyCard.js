import React, { useState } from 'react'
import styled from 'styled-components'
import assets from '../../lib/assets'
import api from '../../lib/api'
import { socket } from '../../lib/sockets'

const items = [
  {
    itemName: 'Road',
    resources: ['brick', 'wood'],
  },
  {
    itemName: 'Settlement',
    resources: ['brick', 'wood', 'sheep', 'grain'],
  },
  {
    itemName: 'City',
    resources: ['grain', 'grain', 'rock', 'rock', 'rock'],
  },
  {
    itemName: 'Development Card',
    resources: ['sheep', 'grain', 'rock'],
  }]

const BuyCard = ({ amounts, setAmounts }) => {

  const [showCard, setShowCard] = useState(false);


  items.forEach((item) => {
    item.canBuy = canBuy(item.resources, amounts)
  })

  const buyItem = (itemName) => {
    const itemToBuy = items.find(item => item.itemName === itemName)

    if (itemToBuy?.canBuy) {
      const listToBuy = createResourceMap(itemToBuy.resources, -1)

      api.bank({ playerId: amounts._id, amounts: listToBuy })
        .then(setAmounts)
        .then(() => setShowCard(false))

      api.addToHistory({
        text: `${amounts.name} bought a ${itemName}`,
        type: 'BUY'
      })

      socket.emit('apiUpdateLocal')
    }

  }

  return (
    <Wrapper>
      {showCard ? renderBuyCard(items, setShowCard, buyItem) : renderCollapsedCard({ setShowCard })}
    </Wrapper>)

}

const canBuy = (itemResources, playerAmounts) => {

  const resourceMap = createResourceMap(itemResources)
  return itemResources.every(resource => playerAmounts[resource] >= resourceMap[resource]);

}


const createResourceMap = (resources, polarity = 1) => {
  return resources.reduce((final, resource) => {
    if (!(resource in final)) final[resource] = 0
    final[resource] = final[resource] + (1 * polarity)
    return final
  }, {})
}

const renderBuyCard = (items, setShowCard, buyItem) => (
  <>
    <Header onClick={() => setShowCard(false)}>
      <span>{''}</span>
      <i className="fas fa-chevron-up"></i>
    </Header>
    {items.map(item =>
      <Item key={item.itemName}>
        <p>{item.itemName}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <ResourceWraper>
            {item.resources.map((resource, key) =>
              <Resource key={key}>
                <img src={assets[resource]} alt={resource}></img>
              </Resource>)}
          </ResourceWraper>
          <BuyButton canBuy={item.canBuy} onClick={() => buyItem(item.itemName)}>Buy</BuyButton>
        </div>
      </Item>
    )
    }
  </>
)

const renderCollapsedCard = ({ setShowCard }) => (
  <Header onClick={() => setShowCard(true)}>
    <span style={{ marginTop: '1px' }}>{'Buy Card'}</span>
    <i className="fas fa-chevron-down"></i>
  </Header>
)

const Item = styled.div`
font-weight:700;
color: ${props => props.theme.text2};

hr {
 margin: 0.2rem;
}
`

const BuyButton = styled.div`
  padding: 2px 4px;
  width: 30px;
  background-color: ${props => props.theme.greenButton};
  text-align: center;
  font-size: 0.9rem;
  margin: auto;
  border: 1px solid ${props => props.theme.greenButton};
  color: ${props => props.theme.greenButtonText};
  opacity: ${props => props.canBuy ? '1' : '0.3'};
  flex-grow: 2;
`

const Header = styled.div`
display: flex;
justify-content: space-between;

i {
  margin-top: 5px;
  color: ${props => props.theme.dividerBox}
}
`

const Wrapper = styled.div`
padding: 0px 10px 4px;
border-radius: 5px;
border: 1px solid ${props => props.theme.dividerBox};
background-color: ${props => props.theme.cardBG2};
color: ${props => props.theme.text2};
font-weight: 500;
margin-bottom: 4px;
margin-top: 2px;
`
const ResourceWraper = styled.div`
display: flex;
width:80%;
font-weight:800;
flex-grow: 7;
`

const Resource = styled.div`
width: 30px;
height: 30px;
padding: 0px 4px;

  img {
    height: auto;
    width: 100%;
  }
`


export default BuyCard
