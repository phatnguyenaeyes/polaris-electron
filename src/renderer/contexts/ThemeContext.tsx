import { ConfigProvider, theme } from 'antd';
import React, { PropsWithChildren, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@app/styles/GlobalStyles';
import { darkTheme, lightTheme } from '@app/styles/themes';
import { themeConfig } from '../themes/themeConfig';

// eslint-disable-next-line react/function-component-definition
export const ThemeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [mode, setMode] = useState('dark');

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        ...themeConfig,
      }}
    >
      <ThemeProvider theme={mode === 'light' ? lightTheme : darkTheme}>
        <>
          <GlobalStyles />
          {children}
        </>
      </ThemeProvider>
    </ConfigProvider>
  );
};
