import styled from 'styled-components';

export const StyledVisibilityContent = styled.div<{ $visible?: boolean }>`
  display: ${(props) => (props.$visible ? 'block' : 'none')};
`;
