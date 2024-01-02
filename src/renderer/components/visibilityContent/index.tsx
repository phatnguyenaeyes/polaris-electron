import React, { HTMLAttributes } from 'react';
import * as S from './VisibilityContent.styles';

interface Props extends HTMLAttributes<HTMLDivElement> {
  visible?: boolean;
}

export const VisibilityContent: React.FC<Props> = ({ visible, ...props }) => {
  return (
    <S.StyledVisibilityContent $visible={visible}>
      {props.children}
    </S.StyledVisibilityContent>
  );
};
