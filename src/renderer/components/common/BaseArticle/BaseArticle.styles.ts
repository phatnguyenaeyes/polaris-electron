import styled from 'styled-components';
import { BORDER_RADIUS, FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';
import { BaseTypography } from '../BaseTypography/BaseTypography';

export const Header = styled.div`
  display: flex;
  align-items: center;
  height: 5.5rem;
  margin-left: 1.5625rem;
`;

export const AuthorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.625rem;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex: 1 1 21.25rem;
  flex-direction: column;
  max-width: 42.5rem;
  border-radius: ${BORDER_RADIUS};
  box-shadow: var(--box-shadow);
  transition: 0.3s;

  [data-theme='dark'] & {
    background: var(--secondary-background-color);
  }

  &:hover {
    box-shadow: var(--box-shadow-hover);
  }
`;

export const Author = styled.div`
  font-size: ${FONT_SIZE.lg};
  font-weight: ${FONT_WEIGHT.bold};
  line-height: 1.5625rem;
  color: var(--text-main-color);
`;

export const InfoWrapper = styled.div`
  padding: 1.25rem;

  @media ${media.xl} {
    padding: 1rem;
  }

  @media ${media.xxl} {
    padding: 1.85rem;
  }
`;

export const InfoHeader = styled.div`
  display: flex;
  margin-bottom: 1rem;

  @media ${media.md} {
    margin-bottom: 0.625rem;
  }

  @media ${media.xxl} {
    margin-bottom: 1.25rem;
  }
`;

export const Title = styled.div`
  width: 80%;
  font-size: ${FONT_SIZE.xl};
  font-weight: ${FONT_WEIGHT.semibold};
  line-height: 1.375rem;
  color: var(--text-main-color);

  @media ${media.md} {
    font-size: ${FONT_SIZE.xxl};
  }
`;

export const DateTime = styled(BaseTypography.Text)`
  font-size: ${FONT_SIZE.xs};
  line-height: 1.25rem;
  color: var(--text-main-color);
`;

export const Description = styled.div`
  font-size: ${FONT_SIZE.xs};
  color: var(--text-main-color);

  @media ${media.xxl} {
    font-size: 1rem;
  }
`;

export const TagsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.625rem;
  padding: 0 1.25rem 1.25rem;
`;
