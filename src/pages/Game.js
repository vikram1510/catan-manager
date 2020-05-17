import React, { useState, useEffect } from 'react';
import styled from 'styled-components'

import Auth from '../lib/auth'
import api from '../lib/api';
import { socket } from '../lib/sockets'

import TimerAlert from '../components/Timer/TimerAlert'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard/Dashboard';
import PlayerCards from "../components/PlayerCard/PlayerCards";
import EventsViewer from '../components/EventsViewer';

const Game = ({ history }) => {

  const [players, setPlayers] = useState(null)
  const [player, setPlayer] = useState(undefined)
  //TODO do gameevents from sockets?
  const [gameEvents, setGameEvents] = useState(null)
  const [events, setEvents] = useState(undefined)

  const [syncing, setSyncing] = useState(false)

  const playerId = Auth.getToken()

  const updatePlayers = async () => {
    setSyncing(true)

    const players = await api.getAllPlayers()
    const gameEvents = await api.getEvents()
    const player = players.find(player => player._id === playerId)
    updateHistory()

    setPlayer(player)
    setPlayers(players)
    setGameEvents(gameEvents)
    setSyncing(false)
  }

  const updateHistory = async () => {
    const historyEvents = await api.getHistory()
    setEvents(historyEvents)
  }

  useEffect(() => {
    updateHistory()
  }, [player])

  useEffect(() => {

    updatePlayers(playerId)
    socket.on('apiUpdate', () => {
      console.log('Update Call from API')
      updatePlayers(playerId)
    })
    // eslint-disable-next-line
  }, [])

  const logout = () => {
    Auth.logout()
    history.push('/')
  }

  //TODO fix this logic (for returning null/logging out)
  if (players && !player) {
    logout()
  }

  if (!(players && player)) return null

  return (
    <>
      <TimerAlert gameEvents={gameEvents} />
      <Wrapper>
        <Header
          logout={logout}
          player={player}
          updatePlayers={updatePlayers}
          syncing={syncing}
        />
        <Dashboard player={player} setPlayer={setPlayer} />
        <PlayerCards players={players} updatePlayers={updatePlayers} player={player} />
        <EventsViewer player={player} events={events} updateHistory={updateHistory} />
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
padding-top: 10px;
width: 95%;
margin: auto;
display: flex;
flex-direction: column;
`

export default Game
