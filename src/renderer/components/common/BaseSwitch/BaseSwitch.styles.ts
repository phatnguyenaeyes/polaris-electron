import { Switch as AntdSwitch } from 'antd';
import styled from 'styled-components';

export const Switch = styled(AntdSwitch)`
  &.ant-switch[aria-checked='false'] {
    background-image: linear-gradient(to right, var(--disabled-color), var(--disabled-color)),
      linear-gradient(to right, var(--background-color), var(--background-color));
  }
`;
