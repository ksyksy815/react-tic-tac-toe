import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { io } from 'socket.io-client'
import axios from 'axios'
import ResultModal from './ResultModal'
import ErrMessage from './ErrMessage'
import { ACTIONS } from '../App'

const BoardWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 3rem;

  #board-player {
    text-align: right;
  }
`

const Grid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 150px);
  grid-template-rows: repeat(3, 150px);

  .box {
    font-size: 5rem;
    display: grid;
    place-content: center;
    position: relative;

    &:nth-child(-n+3) {
      border-bottom: 1px solid var(--light-blue);
    }

    &:nth-child(3n+1) {
      border-right: 1px solid var(--light-blue);
    }

    &:nth-child(3n) {
      border-left: 1px solid var(--light-blue);
    }

    &:nth-child(n+7) {
      border-top: 1px solid var(--light-blue);
    }

    &:hover {
      cursor: pointer;
      background: var(--light-blue);
    }
  }
`

export default function Board( { state, dispatch } ) {
  const history = useHistory()

  const [matchingMode, setMatchingMode] = useState(true)
  const [outcome, setOutcome] = useState(null)
  const [errMessage, setErrMessage] = useState('')
  const [errMessageShown, setErrMessageShown] = useState(false)

  const handleClick = (e) => {
    // If the target is unclickable:
    if (state.turn !== state.player) {
      setErrMessage(`It's not your turn!`)
      setErrMessageShown(true)
      setTimeout(()=> setErrMessageShown(false), 2000)
      return;
    } 
    if (e.target.textContent !== '') {
      setErrMessage(`Already taken!`)
      setErrMessageShown(true)
      setTimeout(()=> setErrMessageShown(false), 2000)
      return;
    } 

    // If the target is clickable:
    const row = e.target.id[0]
    const column = e.target.id[1]

    axios
      .post(`${process.env.REACT_APP_SERVER}/submitMove`,
      {
        player: state.player,
        row,
        column,
        matchId: state.matchId
      })
      .catch((err) => console.log(err))
  }

  useEffect(()=> {
    if (state.matchId === null) {
      history.push('/unauthorized')
    }
  }, [])

  useEffect(() => {
    if (Object.keys(state.players).length === 2) {
      setMatchingMode(false)
    }
  }, [])

  useEffect(() => {
    const socket = io( process.env.REACT_APP_SERVER,
      { extraHeaders: { "Access-Control-Allow-Origin": "*" } })

    socket.on('join', (message) => {
      if (message.matchId === state.matchId) {
        dispatch({
          type: ACTIONS.GAME_START,
          payload: { 
            players: message.players,
            turn: message.turn,
            board: message.board
          }
        })
        setMatchingMode(false)
      }
    })

    socket.on('submitMove', (message) => {
      if (message.matchId === state.matchId) {
        dispatch({
          type: ACTIONS.TURN_CHANGE, 
          payload: { 
            turn: message.turn, 
            board: message.board
          }
        })
  
        if (message.gameOver) {
          if ( message.winner ) {
            message.winner === state.player ? 
            setOutcome('You win!') : setOutcome('You lost!')
          } else {
            setOutcome('Draw!')
          }
        }
      }
    })

    return function cleanUp() {
      socket.disconnect()
    }
  }, [])

  return (
    <BoardWrapper>
      { outcome !== null && <ResultModal message={outcome} dispatch={dispatch} /> }
      { matchingMode ?
      <>
        <span>Finding the perfect match for you...!</span>
      </>
      :
      <>
        <h1>Turn: Player { state.turn }</h1>
        <div>
          <Grid>
            <div className="box" id={'00'} onClick={handleClick}>{state.board[0]}</div>
            <div className="box" id={'01'} onClick={handleClick}>{state.board[1]}</div>
            <div className="box" id={'02'} onClick={handleClick}>{state.board[2]}</div>
            <div className="box" id={'10'} onClick={handleClick}>{state.board[3]}</div>
            <div className="box" id={'11'} onClick={handleClick}>{state.board[4]}</div>
            <div className="box" id={'12'} onClick={handleClick}>{state.board[5]}</div>
            <div className="box" id={'20'} onClick={handleClick}>{state.board[6]}</div>
            <div className="box" id={'21'} onClick={handleClick}>{state.board[7]}</div>
            <div className="box" id={'22'} onClick={handleClick}>{state.board[8]}</div>
          </Grid>
          <div id="board-player">
            You are Player { state.player }
          </div>
        </div>
        { errMessageShown && <ErrMessage message={errMessage} /> }
      </>
      }
    </BoardWrapper>
  )
}