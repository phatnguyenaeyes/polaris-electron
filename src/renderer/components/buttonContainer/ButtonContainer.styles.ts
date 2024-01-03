import styled, { css } from 'styled-components';

interface StyledProps {
  $align?: 'right';
}
const Wrapper = styled.div<StyledProps>`
  display: flex;
  justify-content: center;
  ${(props) =>
    props.$align === 'right' &&
    css`
      justify-content: flex-end;
    `}
  & > * {
    &:not(:last-of-type) {
      margin-right: 12px;
    }
  }
`;
export { Wrapper };
