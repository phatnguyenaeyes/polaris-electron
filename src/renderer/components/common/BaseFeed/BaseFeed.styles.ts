import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const NewsWrapper = styled.div`
  display: flex;
  flex-direction: column;

  & > div {
    margin-bottom: 1.25rem;

    @media ${media.xl} {
      margin-bottom: 1.5rem;
    }

    @media ${media.xxl} {
      margin-bottom: 2.5rem;
    }
  }
`;

export const SpinnerWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 2rem;
`;
