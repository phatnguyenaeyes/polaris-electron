import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#0B98AC',
    controlHeight: 48,
    controlHeightSM: 36,
    borderRadius: 8,
    fontSize: 15,
  },
  components: {
    Button: {
      fontWeight: 600,
    },
    Card: {
      colorBgContainer: '#FFFFFF',
      headerBg: '#FAFAFA',
    },
    Table: {
      headerBorderRadius: 6,
    },
    Layout: {
      headerHeight: 60,
    },
    Modal: {
      borderRadius: 12,
      borderRadiusLG: 12,
    },
  },
};
