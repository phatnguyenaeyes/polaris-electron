import { css } from 'styled-components';
import { BASE_COLORS } from './themes/constants';

export const lightTheme = {
  primary: '#161E5C',
  body: '#FFF',
  text: '#363537',
  background: '#363537',
  gradientPrimary: 'linear-gradient(90deg, #161E5C 0%, #0B1880 100%)',
};
export const darkTheme = {
  primary: '#161E5C',
  body: '#363537',
  text: '#FAFAFA',
  background: '#999',
  gradientPrimary: 'linear-gradient(90deg, #161E5C 0%, #0B1880 100%)',
};

export const commonThemeVariables = css`
  color-scheme: light dark;
  --primary-color: ${BASE_COLORS.primary};
  --white: ${BASE_COLORS.white};
  --black: ${BASE_COLORS.black};
  --green: ${BASE_COLORS.green};
  --orange: ${BASE_COLORS.orange};
  --gray: ${BASE_COLORS.gray};
  --lightgrey: ${BASE_COLORS.lightgrey};
  --violet: ${BASE_COLORS.violet};
  --lightgreen: ${BASE_COLORS.lightgreen};
  --pink: ${BASE_COLORS.pink};
  --blue: ${BASE_COLORS.blue};
  --skyblue: ${BASE_COLORS.skyblue};
  --red: ${BASE_COLORS.red};
`;
