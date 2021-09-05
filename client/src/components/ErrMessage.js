import React from 'react'
import styled, { keyframes } from 'styled-components'

const slideIn = keyframes`
  from {
    right: -150px;
  }
  to {
    right: 0
  }
`

const Message = styled.span`
  padding: 0.2rem;
  width: 150px;
  position: absolute;
  right: 0;
  top: 5rem;
  background: var(--light-blue);
  color: #fff;
  transition: 0.2s;
  text-align: center;
  animation: ${slideIn} 0.2s;
`

export default function ErrMessage( { message }) {
  return (
    <Message>
      {message}
    </Message>
  )
}
