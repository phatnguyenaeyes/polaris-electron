import styled from 'styled-components';
import { Tabs as AntdTabs } from 'antd';
import { BASE_NAME_PUBLIC } from '@app/config/config';

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
`;
