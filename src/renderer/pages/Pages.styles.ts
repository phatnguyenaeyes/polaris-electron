import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const PageHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  height: 50px;
  margin-bottom: 24px;

  @media ${media.md} {
    right: unset;
    left: 0;
  }
`;
