import React from 'react';
import { ButtonProps as AntButtonProps, Button as AntdButton } from 'antd';
import { Severity } from '@app/interfaces/interfaces';
import * as S from './BaseButton.styles';

export const { Group: ButtonGroup } = AntdButton;

export interface BaseButtonProps extends AntButtonProps {
  severity?: Severity;
  noStyle?: boolean;
}

// eslint-disable-next-line react/display-name
export const BaseButton = React.forwardRef<HTMLElement, BaseButtonProps>(
  ({ className, severity, noStyle, children, ...props }, ref) => {
    return (
      <S.Button
        ref={ref}
        className={className}
        $noStyle={noStyle}
        {...props}
        $severity={severity}
      >
        {children}
      </S.Button>
    );
  },
);
