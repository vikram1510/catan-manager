import React, {useState} from 'react'
import styled from 'styled-components'
import assets from '../lib/assets'

const items = [
  { itemName: 'Road',
    resources: ['brick','wood'],
    canBuy: undefined,
  },
  { itemName: 'Settlement',
    resources: ['brick','wood','sheep','grain'],
    canBuy: undefined,
  },
  { itemName: 'City',
    resources: ['grain','grain','rock','rock','rock'],
    canBuy: undefined,
  },
  { itemName: 'Development Card',
    resources: ['sheep','grain','rock'],
    canBuy: undefined,
  }]

const BuyCard = ({amounts, setAmounts}) => {

const [showCard, setShowCard] = useState(false);

const calculateAmounts = (itemName) => {

  const itemToBuy = items.find(item => item.itemName === itemName)
  if (itemToBuy.canBuy) {
    setAmounts(createResourceMap(itemToBuy.resources))
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

const renderBuyCard = (items, setShowCard, calculateAmounts, playerAmounts) => (
  <>
  <CollapsedCardWrapper onClick={() => setShowCard(false)}>
  <span>{''}</span>
  <i style={{margin:'right'}} className="fas fa-chevron-up"></i>
  </CollapsedCardWrapper>
  {items.map(item =>
      <div key={item.itemName}><p>{item.itemName}</p>
        <div style={{display:'flex', justifyContent:'space-between'}}>
          <ResourceWraper>
            {item.resources.map((resource, key) => 
            <Resource key={key}>
              <img src={assets[resource]} alt={resource}></img>
            </Resource>)}
          </ResourceWraper>
        <BuyButton canBuy={item.canBuy} onClick={() => calculateAmounts(item.itemName)}>Buy</BuyButton>
        </div>  
      </div>)
    }   
  </>
)
 
const renderCollapsedCard = ({setShowCard}) => (
  <CollapsedCardWrapper onClick={() => setShowCard(true)}>
  <span style={{marginTop:'1px'}}>{'Buy Card'}</span>
  <i style={{margin:'right'}} className="fas fa-chevron-down"></i>
  </CollapsedCardWrapper>
) 

const BuyButton = styled.div`
  padding: 2px 4px;
  width: 30px;
  background-color: ${props => props.canBuy ? '#50b350' : '#50b350'};
  border-radius: 3px;
  text-align: center;
  font-size: 0.8rem;
  margin: auto;
  border: 1px solid ${props => props.canBuy ? '#50b350' : '#50b350'};
  opacity: ${props => props.canBuy ? '100%' : '30%'};
  color: white;
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