import React, { useMemo } from 'react';
import { useResponsive } from '@app/hooks/useResponsive';
import { Overlay } from '../../../../common/Overlay/Overlay';
import * as S from './MainSider.styles';
import { SiderLogo } from '../SiderLogo';
import SiderMenu from '../SiderMenu/SiderMenu';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { CollapseSvgIcon } from '@app/components/svgIcon/collapse';

interface MainSiderProps {
  isCollapsed: boolean;
  setCollapsed: (isCollapsed: boolean) => void;
}

const MainSider: React.FC<MainSiderProps> = ({
  isCollapsed,
  setCollapsed,
  ...props
}) => {
  const { isDesktop, mobileOnly, tabletOnly } = useResponsive();

  const isCollapsible = useMemo(
    () => mobileOnly && tabletOnly,
    [mobileOnly, tabletOnly],
  );

  const toggleSider = () => setCollapsed(!isCollapsed);

  return (
    <>
      <S.Sider
        trigger={null}
        collapsed={isCollapsed}
        collapsedWidth={80}
        collapsible={isCollapsible}
        width={300}
        {...props}
      >
        <div>
          <div>
            <SiderLogo />
            <S.SiderContent>
              <SiderMenu setCollapsed={setCollapsed} />
            </S.SiderContent>
          </div>
          <div className="absolute bottom-0 left-0 w-full px-3 py-2">
            <div className="flex justify-between items-center w-full">
              {!isCollapsed && (
                <span className="text-[#9A9A9A]">Collapse Sidebar</span>
              )}
              <BaseButton
                type="link"
                size="small"
                icon={<CollapseSvgIcon />}
                onClick={toggleSider}
              />
            </div>
          </div>
        </div>
      </S.Sider>
    </>
  );
};

export default MainSider;
