import { createGlobalStyle } from "styled-components";
import "@fontsource-variable/anybody";
import "@fontsource/dm-mono";

export const GlobalStyles = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body, html {
    height: 100%;
  }

  body,button {
    font-family: 'DM Mono', monospace;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    flex: 1;
  }
`;
