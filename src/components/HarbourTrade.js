import React, {useState, useEffect} from 'react'
import styled from 'styled-components'

import { resourceArray } from "../lib/config";

import QuickTrader from './QuickTrader'
import api from '../lib/api';


const HarbourTrade = ({amounts, item, editMode, checked, canDo, modifyHarborTrade}) => {

  const [lose, setLose] = useState(undefined)

  const displayLose = () => !editMode && lose && !resourceArray.includes(lose) 
  const displayGain = () => !displayLose() && lose

  useEffect(() => {
    if (!editMode) {
      setLose(undefined)
    }
  }, [editMode])

  console.log(lose)

  const doHarborTrade = (gainItem) => {

    let loseQuantity = 2
    
    if (item.includes('any')) {
      loseQuantity = item[item.length-1]
    }
    
    console.log(`${amounts.name} traded ${loseQuantity} ${lose} for ${gainItem} with ${item}`)
    
    api.addToHistory({
      text: `${amounts.name} traded ${loseQuantity} ${lose} for ${gainItem} with ${item}`,
      type: 'HARBOUR'
    })

    api.bank({playerId: amounts._id, amounts: {
      [lose]: -loseQuantity,
      [gainItem]: 1
    }}).then(setLose(undefined))

  }  


    return (
      <Item key={item}>
      <p disabled={canDo} className={canDo ? 'enabled' : 'disabled'} onClick={() => setLose(item)}>
        <input 
          type="checkbox"
          style={{display: editMode ? '' : 'none'}}
          onChange={(event) => modifyHarborTrade(event.target.value)}
          value={item}
          checked={checked}/>    
        {item}
      </p>
      {!editMode && canDo && displayLose() ? <QuickTrader min={item[item.length-1]} placeholder={'I\'ll exchange'} trading={false} mainPlayer={amounts} performTrade={setLose}/> : null}
      {!editMode && canDo && displayGain() ? <QuickTrader min={0} placeholder={`I\'ll get`} trading={false} mainPlayer={amounts} performTrade={doHarborTrade}/> : null}
   </Item>
    )



}


const Item = styled.div`
font-weight:700;

hr {
 margin: 0.2rem;
}

.enabled {
    color: #3754e0;
  }

.disabled {
  color: grey;
}
`


export default HarbourTrade