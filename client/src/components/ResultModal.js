import React from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { ACTIONS } from '../App'

const Modal = styled.div`
  position: absolute;
  z-index: 500;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
  display: grid;
  place-content: center;
`

const Result = styled.div`
  position: relative;
  width: 300px;
  height: 200px;
  background: var(--light-blue);
  color: var(--dark-blue);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  row-gap: 1rem;

  #modal-back-btn {
    border: none;
    background: var(--dark-blue);
    padding: 0.2rem 1rem;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
      background: rgb(6, 49, 92);
    }
  }
`

export default function ResultModal( { message, dispatch } ) {
  const history = useHistory()

  const goBackToHome = () => {
    dispatch({type: ACTIONS.RESET})
    history.push('/')
  }

  return (
    <Modal>
      <Result>
        <h1>{ message }</h1>
        <button id="modal-back-btn" onClick={goBackToHome}>Go back</button>
      </Result>
    </Modal>
  )
}
