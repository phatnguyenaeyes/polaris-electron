import { BORDER_RADIUS } from '@app/styles/themes/constants';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import styled, { css } from 'styled-components';

interface BtnProps {
  $isFirstActive: boolean;
}

export const Btn = styled(BaseButton)`
  display: flex;
  align-items: center;
  justify-content: center;

  &.ant-btn-icon-only.ant-btn-sm {
    height: 1.875rem;
  }
`;

export const ButtonGroup = styled.div<BtnProps>`
  display: inline-flex;
  column-gap: 0.325rem;
  padding: 0.325rem;
  background-color: rgb(var(--primary-rgb-color) 0.1);
  border-radius: ${BORDER_RADIUS};

  ${(props) =>
    props.$isFirstActive
      ? css`
          & > ${Btn}:first-of-type {
            color: var(--text-secondary-color);
            background: var(--primary-color);
          }
        `
      : css`
          & > ${Btn}:last-of-type {
            color: var(--text-secondary-color);
            background: var(--warning-color);
          }
        `}

  &:not(:last-of-type) {
    margin-bottom: 0.625rem;
  }
`;
