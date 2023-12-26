import styled from 'styled-components';

export const StyledIcon = styled.span<{ size?: number }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => `${props.size || 24}px`};
  width: 100%;
  height: auto;
  font-size: 0;

  &::before {
    display: block;
    padding-bottom: 100%;
    content: '';
  }
`;

export const Image = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
