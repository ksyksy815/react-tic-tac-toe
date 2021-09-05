import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const UnauthorizedPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: grid;
  place-content: center;
  row-gap: 1rem;

  button {
    width: 250px;
    border: none;
    background: var(--light-blue);
    padding: 0.2rem 1rem;
    border-radius: 5px;
    
    a {
      color: var(--dark-blue);
      text-decoration: none;
    }

    &:hover {
      cursor: pointer;
      background: rgb(6, 49, 92);
      a {
        color: #fff;
      }
    }
  }
`

export default function Unauthorized() {
  return (
    <UnauthorizedPage>
      <h1>Oops! <br/> It seems like you are in a wrong match.</h1>
      <button><Link to="/">Go bacok to the main page</Link></button>
    </UnauthorizedPage>
  )
}
