import type { ThemeConfig } from 'antd';

export const themeConfig: ThemeConfig = {
  token: {
    colorPrimary: '#0B98AC',
    controlHeight: 52,
    controlHeightSM: 36,
    borderRadius: 8,
    fontSize: 15,
  },
  components: {
    Button: {},
    Card: {},
    Table: {},
    Layout: {
      headerHeight: 76,
    },
    Modal: {},
  },
};
