import styled, { css } from 'styled-components';
import { Button as AntButton } from 'antd';
import { Severity } from '@app/interfaces/interfaces';
import { defineColorBySeverity } from '@app/utils/utils';

interface BtnProps {
  $severity?: Severity;
  $noStyle?: boolean;
}

export const Button = styled(AntButton)<BtnProps>`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.$noStyle &&
    css`
      width: unset;
      height: unset;
      padding: 0;
    `}

  &[disabled],
  &[disabled]:active,
  &[disabled]:focus,
  &[disabled]:hover {
    color: var(--disabled-color);
  }
  ${(props) =>
    !props.danger &&
    css`
      ${props.$severity &&
      css`
        color: ${defineColorBySeverity(props.$severity)};
        text-shadow: none;
        background: rgba(${defineColorBySeverity(props.$severity, true)}, 0.2);
        border-color: ${defineColorBySeverity(props.$severity)};
        box-shadow: none;

        &:hover {
          color: rgba(${defineColorBySeverity(props.$severity, true)}, 0.9);
          background: var(--background-color);
          border-color: rgba(${defineColorBySeverity(props.$severity, true)}, 0.9);
        }

        &:focus {
          color: rgba(${defineColorBySeverity(props.$severity, true)}, 0.9);
          background: var(--background-color);
          border-color: rgba(${defineColorBySeverity(props.$severity, true)}, 0.9);
        }
      `}

      ${props.type === 'text' &&
      css`
        &:hover {
          color: var(--secondary-color);
          background: transparent;
        }
      `}

      ${props.type === 'ghost' &&
      css`
        &:hover {
          color: var(--secondary-color);
          border-color: var(--secondary-color);
        }
      `}

      ${props.type === 'primary' &&
      css`
        background: var(--primary-color);

        &:hover {
          background: var(--secondary-color);
          border-color: var(--secondary-color);
        }
      `}

      ${props.type === 'link' &&
      css`
        & span,
        a {
          text-decoration: underline;
        }
      `};
    `}
`;
