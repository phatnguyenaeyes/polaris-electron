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
      color: #ffffff80;
    }

    .ant-tabs-ink-bar {
      background: ${() => `url(/light-underline.png)`};
      background-color: transparent;
      background-repeat: no-repeat, repeat;
    }
  }

  .ant-tabs-tab.ant-tabs-tab-disabled {
    color: var(--disabled-color);
  }
`;
