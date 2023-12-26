import styled from 'styled-components';
import { BORDER_RADIUS, media } from '@app/styles/themes/constants';
import { BaseImage } from '../common/BaseImage/BaseImage';
import { BaseTypography } from '../common/BaseTypography/BaseTypography';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 3.75rem 1.25rem;
  background-color: var(--background-color);
  border-radius: ${BORDER_RADIUS};

  @media ${media.md} {
    padding: 2.5rem 6.25rem 6.25rem;
  }

  @media ${media.xl} {
    flex-direction: row-reverse;
    justify-content: center;
    padding: 12.5rem 3.5rem;
  }
`;

export const Image = styled(BaseImage)`
  margin-bottom: 4rem;

  @media ${media.xxl} {
    margin-bottom: 0;
  }
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${media.xl} {
    margin-right: 7.5rem;
  }
`;

export const Title = styled(BaseTypography.Text)`
  margin-bottom: 1rem;
  font-size: 2.25rem;
  font-weight: 600;
  color: var(--text-main-color);

  @media ${media.md} {
    margin-bottom: 1.75rem;
    font-size: 3rem;
  }

  @media ${media.xl} {
    margin-bottom: 2.25rem;
    font-size: 4rem;
  }
`;

export const Text = styled(Title)`
  margin-bottom: 1.25rem;
  font-size: 0.875rem;

  @media ${media.md} {
    margin-bottom: 1.45rem;
    font-size: 1.12rem;
  }

  @media ${media.xl} {
    margin-bottom: 1.8rem;
    font-size: 1.5rem;
  }
`;
