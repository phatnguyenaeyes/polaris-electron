import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import styled from 'styled-components';
import { BaseSpace } from '../../BaseSpace/BaseSpace';
import { BaseInput } from '../BaseInput/BaseInput';

export const SearchInput = styled(BaseInput.Search)`
  & .ant-input-prefix {
    margin: 0.5rem;
  }

  & .ant-input-search-button {
    height: 3.54875rem;
    box-shadow: none;
  }

  .ant-input-search-button {
    &.ant-btn .anticon {
      color: var(--primary-color);
    }

    width: 100%;
    color: var(--primary-color);
    background-color: rgb(1 80 154 / 0.05);
    border: 1px solid var(--border-color);
  }

  &.ant-input-search-large .ant-input-search-button {
    height: 4.36125rem;
  }

  & input {
    font-weight: 600;
    background-color: var(--background-color);

    @media ${media.md} {
      font-size: 1rem;
    }

    &::placeholder {
      font-weight: 500;
    }
  }

  .ant-input-group-addon {
    min-width: 5.5rem;
    font-size: ${FONT_SIZE.lg};
    font-weight: ${FONT_WEIGHT.semibold};
    color: var(--primary-color);
  }
`;

export const Space = styled(BaseSpace)`
  & > .ant-space-item:last-of-type {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
