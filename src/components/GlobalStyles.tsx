// src/GlobalStyles.ts
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: #2F2E41;
    color: #ffffff;
    font-family: Open Sans, Arial, sans-serif;
    padding: 0 4vw
  }

  #root {
    height: 100vh;
    margin: 0;
  }
`;

export default GlobalStyles;
