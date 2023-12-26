import styled from 'styled-components';
import { Pagination as AntdPagination } from 'antd';

export const Pagination = styled(AntdPagination)`
  .ant-pagination-item-container .ant-pagination-item-ellipsis {
    color: var(--disabled-color);
  }

  .ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  &.ant-pagination .ant-pagination-item {
    background-color: transparent;
    border: none;
    border-radius: 14px;

    &-active {
      background-color: var(--pagination-active-color);

      a {
        font-size: 20px;
        color: var(--text-invert);
      }
    }
  }

  &.ant-pagination {
    .ant-pagination-prev,
    .ant-pagination-next {
      width: 30px;
      min-width: 30px;
      height: 30px;
      line-height: 30px;
    }

    .ant-pagination-prev {
      margin-right: 20px;
    }

    .ant-pagination-next {
      margin-left: 20px;
    }

    .ant-pagination-item-link {
      background: rgb(255 255 255 / 0.05);
      border: none;
    }
  }

  &.ant-pagination.ant-pagination-disabled {
    .ant-pagination-item-link,
    .ant-pagination-item a {
      color: var(--disabled-color);
    }
  }

  & .ant-select-arrow {
    color: var(--disabled-color);
  }

  .ant-select-disabled.ant-select:not(.ant-select-customize-input) .ant-select-selector {
    color: var(--disabled-color);
  }
`;
