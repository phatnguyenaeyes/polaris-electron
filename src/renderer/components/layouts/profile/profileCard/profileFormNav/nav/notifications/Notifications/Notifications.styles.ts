import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const Description = styled(BaseTypography.Text)`
  display: block;
  margin-bottom: 1rem;
  font-size: 0.75rem;

  @media ${media.md} {
    margin-bottom: 2rem;
    font-size: 1rem;
  }
`;
