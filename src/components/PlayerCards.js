import React, { useState } from "react";
import styled from 'styled-components'

import PlayerCard from '../components/PlayerCard'

const PlayerCards = ({ players, player: mainPlayer, updatePlayers }) => {

	const [tradePlayerId, setTradePlayerId] = useState(null)

	return (
		players.map((opp, key) =>
			(opp._id !== mainPlayer._id) ?
				<PlayerCardWrapper key={key}>
					<PlayerCard
						mainPlayer={mainPlayer}
						player={opp}
						showTrade={opp._id === tradePlayerId}
						setTradePlayerId={setTradePlayerId}
						updatePlayers={updatePlayers}
					/>
				</PlayerCardWrapper>
				: undefined)
	)
}


const PlayerCardWrapper = styled.div`
margin-bottom: 10px;
`

export default PlayerCards