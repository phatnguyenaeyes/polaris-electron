import styled from 'styled-components';
import { media } from '@app/styles/themes/constants';

const colStyles = {
  height: '75px',
  minWidth: '50px',
  fontWeight: 600,
  padding: '0.3125rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

export const Col = styled.div`
  ${colStyles};

  border-bottom: 1px solid rgb(var(--primary-rgb-color) 0.3);

  @media ${media.md} {
    justify-content: unset;
    padding: 0.5rem;
    font-size: 1rem;
  }

  @media ${media.xl} {
    padding: 0.75rem;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & .ant-checkbox-wrapper {
    font: inherit;
    color: inherit;

    & > .ant-checkbox > .ant-checkbox-inner {
      border-color: var(--primary-color);
      border-radius: 3px;
    }
  }

  &:last-of-type {
    ${Col} {
      justify-content: unset;
    }
  }
`;

export const HeaderCol = styled(Col)`
  color: var(--primary-color);
  background: var(--secondary-background-color);
  border-top: 1px solid rgb(var(--primary-rgb-color) 0.3);

  & .ant-checkbox-wrapper {
    flex-wrap: wrap;
    row-gap: 0.5rem;
    justify-content: center;
  }
`;
