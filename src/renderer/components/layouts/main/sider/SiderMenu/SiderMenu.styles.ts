import styled from 'styled-components';
import { FONT_SIZE } from '@app/styles/themes/constants';
import { BaseMenu } from '@app/components/common/BaseMenu/BaseMenu';

export const Menu = styled(BaseMenu)`
  background: transparent;
  border-right: 0;

  /* a {
    display: block;
    width: 100%;
  } */

  .ant-menu-title-content .menu-link {
    display: flex;
    align-items: center;

    &::before {
      width: 1px;
      height: 8px;
      margin-right: 16px;
      content: '';
      background-color: transparent;
    }
  }

  .ant-menu-submenu {
    .ant-menu-title-content {
      /* padding-left: 16px; */
      &::before {
        width: 1px;
        height: 8px;
        margin-right: 16px;
        content: '';
        background-color: transparent;
      }
    }
  }

  .ant-menu-item,
  .ant-menu-submenu {
    /* font-size: ${FONT_SIZE.xs}; */
  }

  .ant-menu-item-icon {
    width: 1.25rem;
  }

  .ant-menu-submenu-expand-icon,
  .ant-menu-submenu-arrow,
  span[role='img'],
  a,
  .ant-menu-item,
  .ant-menu-submenu {
    /* color: var(--text-sider-secondary-color); */
    /* fill: var(--text-sider-secondary-color); */
  }

  .ant-menu-item:hover,
  .ant-menu-submenu-title:hover {
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    a,
    .ant-menu-item-icon,
    .ant-menu-title-content {
      /* color: var(--white); */
      /* fill: var(--white); */
    }
  }

  .ant-menu-submenu-selected {
    .ant-menu-submenu-title {
      /* color: var(--text-sider-primary-color); */

      .ant-menu-submenu-expand-icon,
      .ant-menu-submenu-arrow,
      span[role='img'] {
        /* color: var(--text-sider-primary-color); */
        /* fill: var(--text-sider-primary-color); */
      }
    }
  }

  .ant-menu-item-selected {
    /* background-color: transparent !important; */

    &::after {
      border-right: transparent;
    }
    /* stylelint-disable-next-line no-descending-specificity */
    .ant-menu-submenu-expand-icon,
    .ant-menu-submenu-arrow,
    span[role='img'],
    .ant-menu-item-icon,
    a {
    }
  }

  .ant-menu-item-active,
  .ant-menu-submenu-active .ant-menu-submenu-title {
    /* background-color: transparent !important; */
  }
  &.ant-menu-inline-collapsed .ant-menu-submenu .ant-menu-title-content {
    opacity: 0;
  }
`;
