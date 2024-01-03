import { BaseRadio } from '@app/components/common/BaseRadio/BaseRadio';
import styled, { css } from 'styled-components';

export const BaseRadioGroup = styled(BaseRadio.Group)<{
  $displayAsTab?: boolean;
}>`
  ${(props) =>
    props.$displayAsTab &&
    css`
      &.ant-radio-group .ant-space {
        border-radius: 10px;
        background: rgba(0, 0, 0, 0.04);
        width: max-content;
        padding: 4px;
        .ant-radio-button-wrapper {
          background-color: transparent;
          border-color: transparent;
          .radio-group__label {
            font-weight: 600;
            color: rgba(0, 0, 0, 0.28);
          }
          &-checked {
            background-color: #fff;
            .radio-group__label {
              color: #000;
            }
          }
        }
      }
    `}
`;
