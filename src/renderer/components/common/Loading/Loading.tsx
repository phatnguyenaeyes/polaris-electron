import React from 'react';
import styled from 'styled-components';
import { GlobalSpinner } from '@app/components/common/GlobalSpinner/GlobalSpinner';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { themeObject } from '@app/themes/themeVariables';

interface LoadingProps {
  size?: string;
  color?: string;
}

const SpinnerContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

export const Loading: React.FC<LoadingProps> = ({ size, color }) => {
  const theme = useAppSelector((state) => state.theme.theme);
  const spinnerColor = color || themeObject[theme].spinnerBase;

  return (
    <SpinnerContainer>
      <GlobalSpinner size={size} color={spinnerColor} />
    </SpinnerContainer>
  );
};

