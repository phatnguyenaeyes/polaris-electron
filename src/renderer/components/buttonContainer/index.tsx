import React, { PropsWithChildren } from 'react';

import { Wrapper } from './ButtonContainer.styles';

interface Props {
  align?: 'right';
}

export const ButtonContainer: React.FC<Props & PropsWithChildren> = ({
  align,
  ...props
}) => {
  return (
    <Wrapper $align={align} {...props}>
      {props.children}
    </Wrapper>
  );
};
