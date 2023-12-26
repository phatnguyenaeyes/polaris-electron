import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimaryText: 'rgba(0, 0, 0, 0.85)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
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
    Typography: {
      colorText: 'rgba(0, 0, 0, 0.85)',
      colorTextDescription: 'rgba(0, 0, 0, 0.65)',
      colorTextDisabled: 'rgba(0, 0, 0, 0.45)',
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
