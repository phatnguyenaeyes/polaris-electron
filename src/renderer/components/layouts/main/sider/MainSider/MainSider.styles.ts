import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { media } from '@app/styles/themes/constants';
import { LAYOUT } from '@app/styles/themes/constants';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';

export const Sider = styled(BaseLayout.Sider)`
  position: fixed;
  right: 0;
  z-index: 5;
  min-height: 100vh;
  max-height: 100vh;
  overflow: visible;
  /* color: var(--text-secondary-color); */
  &.ant-layout-sider {
    background-color: var(--white);
    border-right: 1px solid rgba(0, 0, 0, 0.08);
  }
  @media ${media.md} {
    right: unset;
    left: 0;
  }

  @media ${media.xl} {
    position: unset;
  }
`;

export const CollapseButton = styled(BaseButton)<{ $isCollapsed: boolean }>`
  background: var(--collapse-background-color);
  border: 1px solid var(--border-color);
  transition: all 0.2s ease;
  /* stylelint-disable-next-line order/properties-order */
  position: absolute;
  right: 0.5rem;
  ${(props) =>
    props.$isCollapsed &&
    css`
      right: -1rem;
    `}
  color: var(--text-secondary-color);

  &:hover {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }

  &:focus {
    color: var(--text-secondary-color);
    background: var(--primary-color);
    border: 1px solid var(--border-color);
  }
`;

export const SiderContent = styled.div`
  max-height: calc(100vh - ${LAYOUT.mobile.headerHeight});
  overflow: hidden auto;

  @media ${media.md} {
    max-height: calc(100vh - ${LAYOUT.desktop.headerHeight});
  }
`;

export const SiderLogoLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  overflow: hidden;
`;
export const SiderLogoCenter = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const SiderLogoDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${LAYOUT.mobile.headerHeight};
  padding: ${LAYOUT.mobile.headerPadding};

  @media ${media.md} {
    height: ${LAYOUT.desktop.headerHeight};
    padding-top: ${LAYOUT.desktop.paddingVertical};
    padding-bottom: ${LAYOUT.desktop.paddingVertical};
  }
`;

export const BrandSpan = styled.span`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--white);
`;
