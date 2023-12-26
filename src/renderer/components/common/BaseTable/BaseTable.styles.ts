import styled from 'styled-components';
import { Table as AntdTable } from 'antd';
import { FONT_SIZE } from '@app/styles/themes/constants';

export const Table = styled(AntdTable)`
  .ant-table {
    background-color: transparent;
    border: 1px solid rgb(255 255 255 / 0.11);
    border-radius: 12px;
  }

  & thead .ant-table-cell {
    font-size: ${FONT_SIZE.xs};
    font-weight: normal;
    line-height: 1.25rem;
    text-transform: uppercase;
    background-color: transparent;
    border-bottom: 1px solid rgb(255 255 255 / 0.04);

    & .anticon {
      color: var(--primary-color);
    }
  }

  & tbody .ant-table-cell {
    font-size: ${FONT_SIZE.xs};
    line-height: 1.25rem;
    color: var(--text-main-color);
    border-bottom: 1px solid rgb(255 255 255 / 0.04);
  }

  & tbody .ant-table-row-expand-icon {
    min-width: 1.25rem;
    min-height: 1.25rem;
    margin-top: 0;
    border-radius: 0.1875rem;
  }

  /* stylelint-disable-next-line no-invalid-double-slash-comments */
  // Override default antd selector
  &
    .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: #3f3f3f;
  }

  & .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next,
  .ant-pagination-item {
    min-width: 2.0625rem;
    height: 2.0625rem;
    font-size: ${FONT_SIZE.xs};
    line-height: 2.0625rem;
    border-radius: 0;
  }

  & .ant-pagination-prev .ant-pagination-item-link,
  .ant-pagination-next .ant-pagination-item-link {
    border-radius: 0;
  }

  & .ant-checkbox-inner {
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--primary-color);
    border-radius: 0.1875rem;
  }

  & .editable-row .ant-form-item-explain {
    position: absolute;
    top: 100%;
    font-size: 0.75rem;
  }

  .ant-table-column-sort {
    background-color: transparent;
  }

  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: var(--disabled-color);
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  .ant-pagination.ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }
`;
