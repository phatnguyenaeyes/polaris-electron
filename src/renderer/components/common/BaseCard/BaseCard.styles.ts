import styled from 'styled-components';
import { Card as AntCard } from 'antd';
import { normalizeProp } from '@app/utils/utils';
import { FONT_SIZE, FONT_WEIGHT, media } from '@app/styles/themes/constants';

interface CardInternalProps {
  $padding: string | number | [number, number];
  $autoHeight: boolean;
}

export const Card = styled(AntCard)<CardInternalProps>`
  display: flex;
  flex-direction: column;
  ${(props) => props.$autoHeight && 'height: 100%'};
  box-shadow: var(--box-shadow);

  .ant-card-head {
    font-weight: ${FONT_WEIGHT.bold};
    border-bottom: 0;

    .ant-card-head-title {
      padding-bottom: 0;
      overflow: unset;
      white-space: unset;
    }

    @media ${media.xl} {
      font-size: ${FONT_SIZE.xxl};

      .ant-card-head-title {
        padding-bottom: 0.25rem;
      }
    }
  }

  .ant-card-body {
    flex-grow: 1;
    padding: ${(props) => props.$padding && normalizeProp(props.$padding)};
  }

  .ant-card-bordered {
    border-color: #f0f0f0;
  }
`;
