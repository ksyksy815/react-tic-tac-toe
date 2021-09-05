import React, { useReducer } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import styled from 'styled-components';
import { GlobalStyles } from './GlobalStyles.style';
import Home from './pages/Home';
import Board from './components/Board';
import Unauthorized from './pages/Unauthorized';

const MainWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  background: var(--dark-blue);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const initialValue = {
  player: null,
  players: {},
  matchId: null
}

export const ACTIONS = {
  SET_PLAYER: 'player',
  GAME_START: 'game start',
  TURN_CHANGE: 'turn change',
  RESET: 'reset'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PLAYER:
      return action.payload
    case ACTIONS.GAME_START:
      return {
        ...state, 
        players: action.payload
      }
    case ACTIONS.TURN_CHANGE:
      return {
        ...state,
        turn: action.payload.turn,
        board: action.payload.board.reduce((acc, cur) => [...acc, ...cur], [])
      }
    case ACTIONS.RESET:
      return { ...initialValue }
    default: 
      throw new Error()
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialValue)

  return (
    <Router>
      <GlobalStyles />
      <MainWrapper>
        <Switch>
          <Route exact path='/'>
            <Home dispatch={dispatch} />
          </Route>
          <Route path='/board'>
            <Board state={state} dispatch={dispatch} />
          </Route>
          <Route path='/unauthorized'>
            <Unauthorized />
          </Route>
        </Switch>
      </MainWrapper>
    </Router>
  );
}

export default App;
