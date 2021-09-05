import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  :root {
    --dark-blue: rgb(2,15,28);
    --light-blue: rgb(8,172,194);
    --light-gray: rgb(207, 223, 227);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    color: var(--light-gray);
    font-family: 'Poppins', sans-serif;

    &:focus {
      outline: none;
    }
  }

  h1, h2, h3 {
    color: #fff;
  }
`