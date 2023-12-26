import styled from 'styled-components';
import { Checkbox as AntdCheckbox } from 'antd';

const { Group } = AntdCheckbox;

export const Checkbox = styled(AntdCheckbox)`
  & .ant-checkbox-inner {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.1875rem;
  }

  .ant-checkbox-disabled.ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: var(--disabled-color);
  }

  .ant-checkbox-disabled + span {
    color: var(--disabled-color);
  }
`;

export const CheckboxGroup = styled(Group)`
  & .ant-checkbox-inner {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.1875rem;
  }
`;
