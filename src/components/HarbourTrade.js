import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { resourceArray } from "../lib/config";

import QuickTrader from './QuickTrader'
import api from '../lib/api';
import { socket } from '../lib/sockets';


const HarbourTrade = ({ amounts, item, editMode, checked, canDo, modifyHarborTrade, setShowCard, setAmounts }) => {

  const [lose, setLose] = useState(undefined)

  const displayLose = () => !editMode && lose && !resourceArray.includes(lose)
  const displayGain = () => !displayLose() && lose

  useEffect(() => {
    if (!editMode) {
      setLose(undefined)
    }
  }, [editMode])

  const doHarborTrade = (gainItem) => {

    let loseQuantity = 2

    if (item.includes('any')) {
      loseQuantity = item[item.length - 1]
    }

    // console.log(`${amounts.name} traded ${loseQuantity} ${lose} for ${gainItem} with ${item}`)

    api.addToHistory({
      text: `${amounts.name} traded ${loseQuantity} ${lose} for ${gainItem} with ${item}`,
      type: 'HARBOUR'
    })


    api.bank({
      playerId: amounts._id, amounts: {
        [lose]: -loseQuantity,
        [gainItem]: 1
      }
    }).then(setLose(undefined)).then(setAmounts)
    
    socket.emit('apiUpdateLocal')
    setShowCard((s) => !s)
  }


  return (
    <Item disabled={canDo} key={item} editMode={editMode}>
      <input
        type="checkbox"
        style={{ display: 'none' }}
        onChange={(event) => modifyHarborTrade(event.target.value)}
        value={item}
        checked={checked}
        id={item} />
      <label htmlFor={editMode ? item : ''} disabled={canDo} className={canDo ? 'enabled' : 'disabled'} onClick={() => setLose(item)}>
        <img src={process.env.PUBLIC_URL + `/harbour_${item}.png`} alt={item}></img>
      </label>
      {!editMode && canDo && displayLose() ? <QuickTrader min={item[item.length - 1]} placeholder={`I'll exchange`} trading={false} mainPlayer={amounts} performTrade={setLose} /> : null}
      {!editMode && canDo && displayGain() ? <QuickTrader min={0} filter={lose} placeholder={`I'll get`} trading={false} mainPlayer={amounts} performTrade={doHarborTrade} /> : null}
    </Item>
  )



}


const Item = styled.div`
font-weight:700;
border-radius: 3px;
/* border: 1px solid ${({ disabled }) => disabled ? '#2d4290' : '#dcdcdc'}; */
/* background-color: ${({ disabled }) => disabled ? '#3754e0' : '#acacac'}; */
padding: 0 16px;
margin-bottom: 3px;
color: white;
display: flex;

> div {
  flex-grow: 1;
}


hr {
 margin: 0.2rem;
}

input {
  opacity: 1
}

img {
    height: 40px;
    width: 40px;
    opacity: ${({ disabled }) => disabled ? '1' : '0.5'};
  }

input:checked + label {
  background-color: ${({ editMode }) => editMode ? '#239adf' : 'transparent'};;
  border-radius: 60%;
}

`


export default HarbourTrade
