import { css } from 'styled-components';

export const resetCss = css`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  ::-webkit-scrollbar {
    width: 1rem;
  }

  ::-webkit-scrollbar-track {
    background-color: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background-color: var(--scroll-color);
    background-clip: content-box;
    border: 0.375rem solid transparent;
    border-radius: 1.25rem;
  }

  body {
    font-weight: 400;
  }
`;
