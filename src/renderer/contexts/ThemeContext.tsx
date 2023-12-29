import { ConfigProvider, theme } from 'antd';
import React, { PropsWithChildren } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '@app/styles/GlobalStyles';
import { lightTheme } from '@app/styles/themes';
import { themeConfig } from '../themes/themeConfig';

// eslint-disable-next-line react/function-component-definition
export const ThemeContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm,
        ...themeConfig,
      }}
    >
      <ThemeProvider theme={lightTheme}>
        <>
          <GlobalStyles />
          {children}
        </>
      </ThemeProvider>
    </ConfigProvider>
  );
};
