import styled from 'styled-components';
import { media } from '@app/styles/themes/constants';
import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';

export const LayoutMaster = styled(BaseLayout)`
  height: 100vh;
  width: 100vw;
`;

export const LayoutMain = styled(BaseLayout)`
  @media ${media.md} {
    margin-left: 80px;
  }

  @media ${media.xl} {
    margin-left: unset;
  }
`;
