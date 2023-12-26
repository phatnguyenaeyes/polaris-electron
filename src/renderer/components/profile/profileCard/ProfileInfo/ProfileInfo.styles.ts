import styled from 'styled-components';
import { media } from '@app/styles/themes/constants';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

interface FullnessLineProps {
  width: number;
}

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

export const ImgWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 6.9375rem;
  margin: 0 auto 1.25rem auto;
  background: conic-gradient(
    from -35.18deg at 50% 50%,
    #006ccf -154.36deg,
    #ff5252 24.13deg,
    #ffb155 118.76deg,
    #006ccf 205.64deg,
    #ff5252 384.13deg
  );
  border-radius: 50%;

  @media ${media.xl} {
    width: 11.125rem;
    margin: 0 auto 2rem auto;
  }

  & > span {
    width: calc(100% - 10px);
    height: calc(100% - 10px);
    margin: 5px;

    @media ${media.xl} {
      margin: 7px;
    }
  }
`;

export const Title = styled(BaseTypography.Text)`
  margin-bottom: 0.5rem;
  font-size: 1.125rem;
  font-weight: 700;

  @media ${media.xl} {
    margin-bottom: 1rem;
    font-size: 1.5rem;
  }
`;

export const Subtitle = styled(BaseTypography.Text)`
  margin-bottom: 2rem;

  @media ${media.xl} {
    margin-bottom: 2.5rem;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const FullnessWrapper = styled.div`
  height: 1.875rem;
  margin-bottom: 0.625rem;
  background-color: rgb(var(--warning-rgb-color) 0.5);
  border-radius: 50px;

  @media ${media.xl} {
    height: 2.5rem;
    margin-bottom: 1rem;
  }
`;

export const FullnessLine = styled.div<FullnessLineProps>`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: ${(props) => props.width}%;
  height: 100%;
  padding-right: 0.625rem;
  color: var(--text-secondary-color);
  background: linear-gradient(90deg, var(--warning-color) 0%, var(--error-color) 100%);
  border-radius: 50px;

  @media ${media.xl} {
    padding-right: 0.875rem;
    font-size: 1rem;
    font-weight: 600;
  }
`;

export const Text = styled(BaseTypography.Text)`
  font-size: 0.75rem;
  color: var(--text-main-color);
  text-align: left;

  @media ${media.md} {
    text-align: center;
  }

  @media ${media.xl} {
    font-size: 0.875rem;
    text-align: left;
  }
`;
