import styled from 'styled-components';
import { Input as AntInput } from 'antd';
import { FONT_WEIGHT, FONT_SIZE } from '@app/styles/themes/constants';

export const Input = styled(AntInput)`
  .ant-input-group-addon:first-child,
  .ant-input-group-addon:last-child {
    min-width: 5.5rem;
    font-size: ${FONT_SIZE.lg};
    font-weight: ${FONT_WEIGHT.semibold};
    color: var(--primary-color);
  }

  .ant-input-group-addon .ant-select {
    .ant-select-selection-item {
      min-width: 5.5rem;
      font-size: ${FONT_SIZE.lg};
      font-weight: ${FONT_WEIGHT.semibold};
      color: var(--primary-color);
    }
  }

  .ant-select-arrow {
    color: var(--disabled-color);
  }
`;
