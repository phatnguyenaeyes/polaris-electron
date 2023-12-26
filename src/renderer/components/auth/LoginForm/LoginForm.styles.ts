import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const LoginDescription = styled.div`
  margin-bottom: 1.875rem;
  font-size: ${FONT_SIZE.xs};
  color: var(--text-main-color);

  @media ${media.xs} {
    margin-bottom: 1.5625rem;
    font-weight: ${FONT_WEIGHT.bold};
  }

  @media ${media.md} {
    margin-bottom: 1.75rem;
    font-weight: ${FONT_WEIGHT.regular};
  }

  @media ${media.xl} {
    margin-bottom: 1.875rem;
  }
`;

export const RememberMeText = styled.span`
  font-size: ${FONT_SIZE.xs};
  color: var(--primary-color);
`;

export const ForgotPasswordText = styled.span`
  font-size: ${FONT_SIZE.xs};
  color: var(--text-light-color);
  text-decoration: underline;
`;
