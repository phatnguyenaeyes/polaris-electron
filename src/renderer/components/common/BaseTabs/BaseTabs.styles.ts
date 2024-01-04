import styled from 'styled-components';
import { Tabs as AntdTabs } from 'antd';

export const StyledTabs = styled(AntdTabs)`
  .ant-tabs-nav {
    &::before {
      visibility: hidden;
    }

    .ant-tabs-tab {
      justify-content: center;
      min-width: 160px;
    }

    .ant-tabs-ink-bar {
      background: linear-gradient(
        270deg,
        #7dd8e5 0%,
        #0b98ac 8.15%,
        #7dd8e5 100%
      );
      background-repeat: no-repeat, repeat;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-disabled {
    color: var(--disabled-color);
  }
  &.ant-tabs-card {
    .ant-tabs-nav-list {
      border-radius: 10px;
      background-color: rgba(0, 0, 0, 0.04);
      padding: 4px;
      height: 52px;
      .ant-tabs-tab {
        border-radius: 10px;
        border: none;
        background-color: transparent;
        .ant-tabs-tab-btn {
          color: rgba(0, 0, 0, 0.28);
        }
        &-active {
          background: #fff;
          .ant-tabs-tab-btn {
            color: #04111d;
          }
        }
      }
    }
  }
`;
