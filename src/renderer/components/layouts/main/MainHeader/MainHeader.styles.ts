import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';
import { LAYOUT } from '@app/styles/themes/constants';
import { media } from '@app/styles/themes/constants';
import styled, { css } from 'styled-components';

interface Header {
  $isTwoColumnsLayoutHeader: boolean;
}

export const Header = styled(BaseLayout.Header)<Header>`
  line-height: 1.5;

  @media ${media.md} {
    height: ${LAYOUT.desktop.headerHeight};
    padding: ${LAYOUT.desktop.paddingVertical} ${LAYOUT.desktop.paddingHorizontal};
  }

  @media ${media.md} {
    ${(props) =>
      props?.$isTwoColumnsLayoutHeader &&
      css`
        padding: 0;
      `}
  }
`;
