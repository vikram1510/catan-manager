import React, {useState} from 'react'
import styled from 'styled-components'
import assets from '../lib/assets'

const items = [
  { itemName: 'Road',
    resources: ['brick','wood'],
  },
  { itemName: 'Settlement',
    resources: ['brick','wood','sheep','grain'],
  },
  { itemName: 'City',
    resources: ['grain','grain','rock','rock','rock'],
  },
  { itemName: 'Development Card',
    resources: ['sheep','grain','rock'],
  }]

const BuyCard = ({amounts, setAmounts}) => {

  const [showCard, setShowCard] = useState(false);

  const calculateAmounts = (itemName) => {

    const itemToBuy = items.find(item => item.itemName === itemName)
  
    if (itemToBuy?.canBuy) {
      const listToBuy = createResourceMap(itemToBuy.resources)

      let newAmounts = {}
      Object.entries(listToBuy).forEach(([resourceName, amount]) => {
        newAmounts[resourceName] = amounts[resourceName] - amount
      })

      setAmounts({...amounts, ...newAmounts})
    }
    
  }

  items.forEach((item) => {
    item.canBuy = canBuy(item.resources, amounts)
  })

  return (
  <Wrapper>
    {showCard ? renderBuyCard(items, setShowCard, calculateAmounts) : renderCollapsedCard({setShowCard})}
  </Wrapper>)

}

const canBuy = (itemResources, playerAmounts) => {

  const resourceMap = createResourceMap(itemResources)
  return itemResources.every(resource => playerAmounts[resource] >= resourceMap[resource]);

}


const createResourceMap = (resources) => {
  return resources.reduce((final, resource) => {
    if (!(resource in final)) final[resource] = 0
    final[resource]++
    return final
  }, {})
}

const renderBuyCard = (items, setShowCard, calculateAmounts) => (
  <>
  <CollapsedCardWrapper onClick={() => setShowCard(false)}>
  <span>{''}</span>
  <i style={{margin:'right'}} className="fas fa-chevron-up"></i>
  </CollapsedCardWrapper>
  {items.map(item =>
      <Item key={item.name}>
      <p>{item.itemName}</p>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <ResourceWraper>
            {item.resources.map((resource, key) => 
            <Resource key={key}>
              <img src={assets[resource]} alt={resource}></img>
            </Resource>)}
          </ResourceWraper>
        <BuyButton canBuy={item.canBuy} onClick={() => calculateAmounts(item.itemName)}>Buy</BuyButton>
        </div>  
            <hr/>
      </Item>
      )
    }   
  </>
)
 
const renderCollapsedCard = ({setShowCard}) => (
  <CollapsedCardWrapper onClick={() => setShowCard(true)}>
  <span style={{marginTop:'1px'}}>{'Buy Card'}</span>
  <i style={{margin:'right'}} className="fas fa-chevron-down"></i>
  </CollapsedCardWrapper>
) 

const Item = styled.div`
font-weight:700;

hr {
 margin: 0.2rem;
}
`

const BuyButton = styled.div`
  padding: 2px 4px;
  width: 30px;
  background-color: ${props => props.canBuy ? '#50b350' : '#50b350'};
  text-align: center;
  font-size: 0.9rem;
  margin: auto;
  border: 1px solid ${props => props.canBuy ? '#50b350' : '#50b350'};
  opacity: ${props => props.canBuy ? '1' : '0.3'};
  color: white;
  flex-grow: 2;
`

const CollapsedCardWrapper = styled.div`
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
