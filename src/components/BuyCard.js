import React, {useState} from 'react'
import styled from 'styled-components'
import assets from '../lib/assets'

const items = [
  { displayName: 'Road',
    resources: ['brick','wood']
  },
  { displayName: 'Settlement',
    resources: ['brick','wood','sheep','grain']
  },
  { displayName: 'City',
    resources: ['grain','grain','rock','rock','rock']
  },
  { displayName: 'Development Card',
    resources: ['rock','sheep','grain']
  }]


const BuyCard = () => {

const [showCard, setShowCard] = useState(false);

  return (

  <Wrapper>
    {showCard ? renderBuyCard(items, setShowCard) : renderCollapsedCard({setShowCard})}
  </Wrapper>)

}


const renderBuyCard = (items, setShowCard) => (
  <>
  <CollapsedCardWrapper onClick={() => setShowCard(false)}>
<span>{''}</span>
  <i style={{margin:'right'}}class="fas fa-chevron-up"></i>
  </CollapsedCardWrapper>
  {items.map(item =>
      <>
      {item.displayName}
      <div style={{display:'flex', justifyContent:'space-between'}}>
      <ResourceWraper>
        {item.resources.map((resource, key) => 
        <Resource key={key}>
            <img src={assets[resource]} alt={resource}></img>
        </Resource>
        )}
      </ResourceWraper>
      <BuyButton>Buy</BuyButton>
      </div>  
      </>)}
     
      </>
)
 
const renderCollapsedCard = ({setShowCard}) => (
  <CollapsedCardWrapper onClick={() => setShowCard(true)}>
  <span style={{marginTop:'1px'}}>{'Buy Card'}</span>
  <i style={{margin:'right'}}class="fas fa-chevron-down"></i>
  </CollapsedCardWrapper>
) 

const BuyButton = styled.div`
  padding: 2px 4px;
  width: 30px;
  background-color: #50b350;
  border-radius: 3px;
  text-align: center;
  font-size: 0.8rem;
  margin: auto;
  border: 1px solid green;
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