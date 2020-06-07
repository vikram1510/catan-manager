import React from 'react'
import styled from 'styled-components'

import assets from '../lib/assets'
import api from '../lib/api';
import { socket } from '../lib/sockets'

import Timer from './Timer/Timer';

const Header = ({ logout, player, updatePlayers, syncing, toggleTheme }) => {


	const resetAmounts = async () => {

		const sure = window.confirm('Are you sure you wanna reset? You\'ll lose everything!!!', 'testste')

		if (sure) {
			const resetAmounts = { brick: 0, wood: 0, grain: 0, rock: 0, sheep: 0 }
			await api.updatePlayer(player._id, resetAmounts)
			await api.addToHistory({
				text: `${player.name} has reset!`,
				type: 'RESET'
			})
			updatePlayers()
			socket.emit('apiUpdateLocal')
		}

	}


	const addTimerEndEvent = async () => {
		api.addToEvents({ name: 'timer-end', createdBy: player._id })
		updatePlayers()
		socket.emit('apiUpdateLocal')
	}

	return (
		<Wrapper>
			<div className="logo-img-wrapper animated shake">
				<img src={assets.logo} alt='Catan Logo'></img>
			</div>
			<div className="game-buttons">
				<Timer action={addTimerEndEvent} playerName={player.name} />
				<GameButton className="refresh" disabled={syncing} onClick={() => updatePlayers()}>
					<i className={`fas fa-sync ${syncing ? 'fa-spin' : ''}`}></i>
				</GameButton>
				<GameButton onClick={resetAmounts}>Reset</GameButton>
				<GameButton onClick={logout}>Log out</GameButton>
				<GameButton onClick={toggleTheme}>
					<i className="fas fa-moon"></i>
				</GameButton>
			</div>
		</Wrapper>
	)
}

const Wrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;

.logo-img-wrapper {
  width:100px;
  padding: 7px;

  img {
   width: 100%;
   height: auto;
  }
}

.game-buttons{
  display: flex;
  align-items: flex-start;
}
`

export const GameButton = styled.button`
background-color: ${(props) => props.disabled ? props.theme.buttonHighlight : props.theme.button};
color: ${props => props.theme.buttonText};
border-radius: 3px;
border: 1px solid ${props => props.theme.buttonBorder};
padding: 8px;
font-weight:700;
font-size: 0.75rem;
margin-left: 5px;
  

&.refresh {
  border-radius: 100%;
}
`

export default Header