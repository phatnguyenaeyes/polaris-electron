import styled, { css } from 'styled-components';

interface OverlayProps {
  show: boolean;
}

export const Overlay = styled.div<OverlayProps>`
  position: absolute;
  z-index: 1;
  height: 0;

  ${(props) =>
    props.show &&
    css`
      width: 100vw;
      height: 100vh;
      backdrop-filter: blur(6px);
    `}
`;
