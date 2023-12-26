import styled from 'styled-components';
import { CloseOutlined } from '@ant-design/icons';
import { FONT_SIZE } from '@app/styles/themes/constants';

export const RemoveTagWrapper = styled.span`
  display: flex;
  align-items: center;
  padding-top: 1px;
  padding-left: 0.3125rem;
`;

export const RemoveTagIcon = styled(CloseOutlined)`
  font-size: ${FONT_SIZE.xxs};
  color: #fff;
  cursor: pointer;
`;

export const TagWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.3125rem 0.625rem;
  margin: 0;
  font-size: ${FONT_SIZE.xs};
  border-radius: 0.5rem;
`;
