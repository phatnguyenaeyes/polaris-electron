import React, { PropsWithChildren } from 'react';
import * as S from './CardContent.styles';

export const CardContent: React.FC<PropsWithChildren> = (props) => <S.StyledCardContent {...props} />;
