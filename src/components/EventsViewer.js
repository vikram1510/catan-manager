import React, { useState } from 'react'
import styled from 'styled-components'
import { resourceArray } from '../lib/config'
import assets from '../lib/assets'
import api from '../lib/api'
import { socket } from '../lib/sockets'
import moment from 'moment'

moment.updateLocale('en', {
  relativeTime: {
    s: 'a few seconds',
    m: "a min",
    mm: "%d mins",
    h: "an h",
    hh: "%d hrs",
  }
});



const EventsViewer = ({ player, events, listCapacity = 100, updateHistory }) => {

  // const EVENT_TYPE = {
  //   'TRADE': theme.history.trade,
  //   'COLLECT': theme.history.collect,
  //   'RETURN': theme.history.return,
  //   'BUY': theme.history.buy,
  //   'ROB': theme.history.rob,
  //   'RESET': theme.history.reset,
  //   'HARBOUR': theme.history.harbour,
  // }

  const [showTime, setShowTime] = useState(false)

  if (!events) {
    return null
  }

  let filterEvents
  if (events.length > listCapacity) {
    filterEvents = events.slice(0, listCapacity)
  } else {
    filterEvents = events;
  }

  filterEvents = combineEvents(filterEvents)

  let resourcesToRender = []
  filterEvents.forEach((event) => {

    let resourceToRender = ''

    resourceArray.forEach((resource) => {
      if (event.text.includes(resource)) {

        resourceToRender = resource
      }
    })

    resourcesToRender.push(resourceToRender)

  })

  const deleteHistory = async () => {

    const confirmAnswer = window.confirm('You are about to delete the game history. This process is irreversible. Are you sure?')

    if (confirmAnswer) {
      api.deleteHistory()
      socket.emit('apiUpdateLocal')
      // Make sure history is deleted before updating
      setTimeout(() => { updateHistory() }, 100);
    } else {
      alert('GAME HISTORY DELETED. GAME HISTORY DELETED. GAME HISTORY DELETED. GAME HISTORY DELETED. GAME HISTORY DELETED. just kidding, cancelled it')
    }
  }

  if (filterEvents.length <= 0) return null
  return (
    <Wrapper>
      <h3>History <span>{`(${events.length})`}</span></h3>
      <div onClick={() => setShowTime(!showTime)} className='event-scrolView'>
        {filterEvents.map((event, key) =>
          <Event key={key} mine={event.text.includes(player.name)} eventType={event.type.toLowerCase()} className='event' >
            <span className='eventType'>{event.type} </span>
            {`${event.text}`}
            <Resource
              className="resource-image-wrapper animated bounceIn">
              <img src={assets[resourcesToRender[key]]} alt={resourcesToRender[key]}></img>
            </Resource>
            {showTime ? <span className='timeStamp animated slideInRight'> {moment(event.createdAt).fromNow()}</span> : null}
          </Event>)
        }
      </div >
      <button onClick={deleteHistory}>Clear History</button>
    </Wrapper >
  )
}


const combineEvents = (events) => {

  let combinedEvents = []

  let count = 0
  events.forEach((event, index) => {

    if (['RETURN', 'COLLECT', 'BUY', 'ROB'].includes(event.type)) {

      if (events?.[index - 1]?.text === event.text || events?.[index + 1]?.text === event.text) {
        count = count + 1

        if (events?.[index + 1]?.text !== event.text) {
          combinedEvents.push({ ...event, text: event.text.replace('1', count).replace(' a ', ` ${count} `) })
          count = 0
        }

      } else {
        combinedEvents.push(event)
      }


    } else {
      combinedEvents.push(event)
    }


  })

  return combinedEvents

}

const Wrapper = styled.div`
background-color: ${props => props.theme.cardBG};
border-radius: 5px;
border: 1px solid ${props => props.theme.borderCol};
padding: 0px 10px 10px 10px;
margin-bottom:10px;

h3 {
  margin:0px;
  color: ${props => props.theme.history.text};

  span {
    font-size:0.9rem;
    margin-left:5px;
    color: ${props => props.theme.history.text2};
  }
}

.event-scrolView {
  padding:5px;
  max-height:200px;
  overflow: scroll;
}


button {
  width: 100%;
  margin-top:10px;
  padding: 5px;
  background-color: ${props => props.theme.cardBG};
  border-radius: 5px;
  border: 1px solid ${props => props.theme.button};
  color:${props => props.theme.button};
}
`

const Event = styled.div`

  margin: -10px;
  color:${props => props.mine ? props => props.theme.history.text : props => props.theme.history.text2};
  padding: 5px 0px 5px 0px;
  font-size:0.9rem;
  font-weight:600;
  display:flex;
  align-items: center;

.eventType {

  font-family: 'Roboto Condensed', sans-serif;

  background-color: ${props => props.theme.history[props.eventType]};
  color: ${props => props.theme.history.text3};
  padding:2px 8px;
  font-size:0.7rem;
  font-weight:700;
  border-radius:4px;
  margin-right:4px;
  margin-left:10px;
  height:12px;
}

.timeStamp {
  color: grey;
  margin-left:auto;
  margin-right: 5px;
  font-size:0.6rem;
}
`


const Resource = styled.div`
width:20px;
margin-left:10px;

  div {
    text-align:center;
  }

  img {
    height: auto;
    width: 100%;
  }
`


export default EventsViewer
