import styled from 'styled-components';
import { media } from '@app/styles/themes/constants';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

export const BaseFormTitle = styled(BaseTypography.Text)`
  display: block;
  font-size: 1rem;
  font-weight: 400;

  @media ${media.md} {
    font-size: 28px;
  }
`;
