import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { v4 as uuidV4 } from 'uuid'
import { ACTIONS } from '../App'

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 2rem;

  h1{
    position: absolute;
    top: 15%;
  }

  #btn-new-room {
    width: 300px;
    height: 300px;
    background: transparent;
    border: 1px solid var(--light-blue);
    font-size: 2rem;
    font-weight: bold;
    transition: 0.2s;

    &:hover {
      cursor: pointer;
      background: var(--light-blue);
      color: var(--dark-blue);
      transform: translateY(-3px);
    }
  }

  #matching-message {
    position: relative;
    text-align: center;
    width: 300px;
    height: 25px;
  }
`

export default function Home( { dispatch } ) {
  const history = useHistory()

  const makeNewRoom = (e) => {
    e.preventDefault();

    const playerId = uuidV4();

    axios
    .post(`${process.env.REACT_APP_SERVER}/play`, {
      playerId
    })
    .then((res) => {
      dispatch({
        type: ACTIONS.SET_PLAYER, 
        payload: { 
          player: res.data.result.player,
          players: res.data.result.players,
          matchId: res.data.result.matchId,
          board: res.data.result.board,
          turn: res.data.result.turn
        } 
      })
      history.push('/board')
    })
    .catch((err) => console.log(err))
  };

  return (
    <HomeWrapper>
      <h1>Welcome to Tic-Tac-Toe!</h1>
        <button id="btn-new-room" onClick={makeNewRoom}>FIND MATCH</button>
    </HomeWrapper>
  )
}
