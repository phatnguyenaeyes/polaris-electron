import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';
import { LAYOUT } from '@app/styles/themes/constants';
import { media } from '@app/styles/themes/constants';
import styled, { css } from 'styled-components';

interface Header {
  $isTwoColumnsLayoutHeader: boolean;
}

export const Header = styled(BaseLayout.Header)<Header>`
  line-height: 1.5;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: center;
  &.ant-layout-header {
    padding: 0 36px;
  }

  @media ${media.md} {
    ${(props) =>
      props?.$isTwoColumnsLayoutHeader &&
      css`
        padding: 0;
      `}
  }
`;
