import { DownOutlined } from '@ant-design/icons';
import { media } from '@app/styles/themes/constants';
import styled from 'styled-components';
import { HeaderActionWrapper } from '../../../Header.styles';

export const ProfileDropdownHeader = styled(HeaderActionWrapper)`
  cursor: pointer;
  background: linear-gradient(180deg, rgb(255 255 255 / 0.04) 0%, rgb(255 255 255 / 0) 100%);
  border-radius: 12px;

  @media ${media.md} {
    padding: 0.3125rem 0.2rem;
    border: 1px solid rgb(255 255 255 / 0.1);
  }
`;

export const DownArrow = styled(DownOutlined)`
  color: var(--text-secondary-color);

  @media ${media.md} {
    color: var(--text-main-color);
  }
`;
