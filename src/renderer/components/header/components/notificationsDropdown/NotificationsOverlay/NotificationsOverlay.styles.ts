import styled from 'styled-components';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { media } from '@app/styles/themes/constants';
import { BaseDivider } from '@app/components/common/BaseDivider/BaseDivider';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';

export const NoticesOverlayMenu = styled.div`
  max-width: 15rem;

  @media ${media.md} {
    max-width: 25rem;
  }
`;

export const SplitDivider = styled(BaseDivider)`
  margin: 0 0.5rem;
`;

export const LinkBtn = styled(BaseButton)`
  &.ant-btn {
    height: unset;
    padding: 0;
    font-size: 0.875rem;
    line-height: unset;
  }
`;

export const Btn = styled(BaseButton)`
  width: 100%;
`;

export const Text = styled(BaseTypography.Text)`
  display: block;
  text-align: center;
`;
