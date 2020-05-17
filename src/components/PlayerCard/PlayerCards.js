import React, { useState } from "react";
import styled from 'styled-components'

import PlayerCard from './PlayerCard'

const PlayerCards = ({ players, player: mainPlayer, updatePlayers }) => {

	const [tradePlayerId, setTradePlayerId] = useState(null)
	const otherPlayers = players.filter((pl) => pl._id !== mainPlayer._id)

	return (
		otherPlayers.map((player) =>
			<PlayerCardWrapper key={player._id}>
				<PlayerCard
					player={player}
					mainPlayer={mainPlayer}
					showTrade={player._id === tradePlayerId}
					setTradePlayerId={setTradePlayerId}
					updatePlayers={updatePlayers}
				/>
			</PlayerCardWrapper>)
	)
}

const PlayerCardWrapper = styled.div`
margin-bottom: 10px;
`

export default PlayerCards