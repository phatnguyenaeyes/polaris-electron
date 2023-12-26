import { BASE_COLORS } from '../constants';
import { ITheme } from '../types';

const chartColors = {
  chartTooltipLabel: '#6a7985',
  chartColor1: '#339CFD',
  chartColor1Tint: '#339CFD', // update
  chartColor2: '#dc88f5',
  chartColor2Tint: '#dc88f5', // update
  chartColor3: '#FFB765',
  chartColor3Tint: '#FFB765', // update
  chartColor4: '#306955',
  chartColor4Tint: '#306955', // update
  chartColor5: '#ff3d71',
  chartColor5Tint: '#ff3d71', // update
};

export const darkColorsTheme: ITheme = {
  primary: '#E21AFF',
  primary1: '#7568f6',
  primaryGradient: 'linear-gradient(211.49deg, #dc88f5 15.89%, #339CFD 48.97%)',
  light: '#696969',
  secondary: '#a32eb4',
  error: '#FF5252',
  warning: '#FFB765',
  success: '#57D682',
  background: '#25284B',
  secondaryBackground: '#1c2137',
  secondaryBackgroundSelected: '#1c2137',
  additionalBackground: '#1D203E',
  collapseBackground: '#1D203E',
  timelineBackground: '#f5f5f5',
  siderBackground: '#121430',
  spinnerBase: '#339CFD',
  scroll: '#797C9A',
  border: '#ffffff',
  borderNft: '#797C9A',
  textMain: '#ffffff',
  textLight: '#9A9B9F',
  textSuperLight: '#444',
  textSecondary: '#ffffff',
  textDark: '#404040',
  textNftLight: '#797C9A',
  textSiderPrimary: '#339CFD',
  textSiderSecondary: '#797C9A',
  subText: '#a9a9a9',
  shadow: 'rgba(0, 0, 0, 0.07)',
  boxShadow: 'none',
  boxShadowHover: 'none',
  boxShadowNft:
    '0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
  boxShadowNftSecondary:
    '0px 10px 20px rgba(0, 0, 0, 0.04), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)',
  dashboardMapBackground: '#25284b',
  dashboardMapCircleColor: '#ACAEC1',
  dashboardMapControlDisabledBackground: '#7e7e7e',
  notificationSuccess: '#EFFFF4',
  notificationPrimary: '#D7EBFF',
  notificationWarning: '#FFF4E7',
  notificationError: '#FFE2E2',
  heading: BASE_COLORS.white,
  borderBase: '#a9a9a9',
  disable: '#7e7e7e',
  disabledBg: '#1c2137',
  layoutBodyBg: '#0f0f0f',
  layoutHeaderBg: '#0f0f0f',
  layoutSiderBg: '#121212',
  inputPlaceholder: 'rgba(255, 255, 255, 0.5)',
  itemHoverBg: '#1c2137',
  backgroundColorBase: '#1c2137',
  avatarBg: '#1c2137',
  alertTextColor: '#000',
  breadcrumb: '#a9a9a9',
  icon: '#a9a9a9',
  iconHover: '#ffffff',
  paginationActiveBg: BASE_COLORS.white,
  textInvert: BASE_COLORS.black,
  textBase: BASE_COLORS.white,
  ...chartColors,
};

export const antDarkColorsTheme = {
  successBg: '#e6fff2',
  successBorder: '#79fcc4',
};
