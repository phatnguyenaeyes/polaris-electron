import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';

export const SearchResultsWrapper = styled.div`
  & > div {
    font-size: 0.875rem;

    & .ant-list-header {
      padding-bottom: 6px;
      font-size: 0.75rem;
      color: var(--primary-color);

      @media ${media.md} {
        font-size: 0.875rem;
      }
    }

    & .ant-list-items {
      padding-left: 0.5rem;
    }
  }
`;

export const Text = styled(BaseTypography.Text)`
  color: var(--text-main-color);

  &:hover {
    text-decoration: underline;
  }
`;
