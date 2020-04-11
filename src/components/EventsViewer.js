import React, {useState} from 'react'
import styled from 'styled-components'
import { resourceArray } from '../lib/config'
import assets from '../lib/assets'
import api from '../lib/api'
import moment from 'moment'

moment.updateLocale('en', {
  relativeTime : {
      s  : 'a few seconds',
      m:  "a min",
      mm: "%d mins",
      h:  "an h",
      hh: "%d hrs",
  }
});

const EVENT_TYPE = {
  'TRADE':'#124E78',
  'COLLECT':'#1B998B',
  'RETURN':'#67115c',
  'BUY':'#5BC16C',
  'ROB':'#E71D36',
  'RESET':'#CE63A0',
}


const EventsViewer = ({player, events, listCapacity=50}) => {

  const [showTime, setShowTime] = useState(false)

  // console.log(events)
  let filterEvents 
  if (events.length > listCapacity) {
    filterEvents = events.slice(0,listCapacity)
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
  
  const deleteHistory = () => {
    // eslint-disable-next-line no-restricted-globals
    const confirmAnswer = confirm('You are about to delete the game history. This process is irreversible. Are you sure?')
    
    if (confirmAnswer) {
      api.deleteHistory()
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
        <Event key={key} mine={event.text.includes(player.name)} className='event'> 
          <span className='eventType' style={{backgroundColor: EVENT_TYPE[event.type]}}>{event.type} </span>
          {`${event.text}`} 
          <Resource
            className="resource-image-wrapper animated bounceIn">
            <img src={assets[resourcesToRender[key]]} alt={resourcesToRender[key]}></img>
          </Resource>
          {showTime ? <span className='timeStamp animated slideInRight'> {moment(event.createdAt).fromNow()}</span> : null}
        </Event>)}
        </div>
      <button onClick={deleteHistory}>Clear History</button>
    </Wrapper>
  )
}


const combineEvents = (events) => {

  let combinedEvents = []

  let count = 0
  events.forEach((event, index) => {

    if (['RETURN','COLLECT','BUY','ROB'].includes(event.type)) {

      if (events?.[index-1]?.text === event.text || events?.[index+1]?.text === event.text) {
        count = count + 1

        if (events?.[index+1]?.text !== event.text) {
          combinedEvents.push({...event, text: event.text.replace('1', count).replace(' a ', ` ${count} `)})
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
background-color: white;
border-radius: 5px;
border: 1px solid #980b0b;
padding: 0px 10px 10px 10px;
margin-bottom:10px;

h3 {
  margin:0px;

  span {
    font-size:0.9rem;
    margin-left:5px;
    color: grey;
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
  background-color: white;
  border-radius: 5px;
  border: 1px solid #980b0b;
  color:#980b0b;

}
`

const Event = styled.div`

  margin: -10px;
  color:${props => props.mine ? 'black' : 'gray'};
  padding: 5px 0px 5px 0px;
  font-size:0.9rem;
  font-weight:600;
  display:flex;
  align-items: center;

.eventType {

  font-family: 'Roboto Condensed', sans-serif;

  background-color: #1b50c5;
  color: white;
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
