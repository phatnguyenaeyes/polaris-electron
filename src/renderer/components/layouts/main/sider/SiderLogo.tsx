import { RightOutlined } from '@ant-design/icons';
import { useAppSelector } from '@app/hooks/reduxHooks';
// import logoDark from 'assets/logo-dark.png';
import logo from '@app/assets/polaris-logo.png';
import logoText from '@app/assets/logo-text.png';
import { useResponsive } from '@app/hooks/useResponsive';
import React from 'react';
import * as S from './MainSider/MainSider.styles';

interface SiderLogoProps {
  isSiderCollapsed: boolean;
  toggleSider: () => void;
}
export const SiderLogo: React.FC<SiderLogoProps> = ({
  isSiderCollapsed,
  toggleSider,
}) => {
  const { tabletOnly } = useResponsive();

  const theme = useAppSelector((state) => state.theme.theme);

  // const img = theme === 'dark' ? logoDark : logo;

  return (
    <S.SiderLogoDiv>
      <S.SiderLogoCenter>
        <S.SiderLogoLink to="/">
          <img src={logo} alt="Logo" width={45} height={45} />
          <S.BrandSpan>
            <img src={logoText} alt="Logo Text" width={129} height={15} />
          </S.BrandSpan>
        </S.SiderLogoLink>
      </S.SiderLogoCenter>
      {tabletOnly && (
        <S.CollapseButton
          shape="circle"
          size="small"
          $isCollapsed={isSiderCollapsed}
          icon={<RightOutlined rotate={isSiderCollapsed ? 0 : 180} />}
          onClick={toggleSider}
        />
      )}
    </S.SiderLogoDiv>
  );
};
