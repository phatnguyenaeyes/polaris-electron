import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import React from 'react';
import * as S from '../Header.styles';
import { HeaderFullscreen } from '../components/HeaderFullscreen/HeaderFullscreen';
import { ProfileDropdown } from '../components/profileDropdown/ProfileDropdown/ProfileDropdown';
import { SettingsDropdown } from '../components/settingsDropdown/SettingsDropdown';

interface DesktopHeaderProps {
  isTwoColumnsLayout: boolean;
}

export const DesktopHeader: React.FC<DesktopHeaderProps> = ({
  isTwoColumnsLayout,
}) => {
  const leftSide = isTwoColumnsLayout ? (
    <S.SearchColumn xl={16} xxl={17}>
      <BaseRow justify="space-between">
        {/* <BaseCol xl={15} xxl={12}>
          <HeaderSearch />
        </BaseCol> */}
        {/* <BaseCol>
          <S.GHButton />
        </BaseCol> */}
      </BaseRow>
    </S.SearchColumn>
  ) : (
    <BaseCol lg={10} xxl={8}>
      {/* <HeaderSearch /> */}
    </BaseCol>
  );

  return (
    <BaseRow justify="space-between" align="middle">
      {leftSide}

      <S.ProfileColumn xl={8} xxl={7} $isTwoColumnsLayout={isTwoColumnsLayout}>
        <BaseRow align="middle" justify="end" gutter={[5, 5]}>
          <BaseCol>
            <BaseRow gutter={[{ xxl: 5 }, { xxl: 5 }]}>
              {/* <BaseCol>
                <HeaderFullscreen />
              </BaseCol> */}

              {/* <BaseCol>
                <NotificationsDropdown />
              </BaseCol> */}

              <BaseCol>
                <SettingsDropdown />
              </BaseCol>
            </BaseRow>
          </BaseCol>

          <BaseCol>
            <ProfileDropdown />
          </BaseCol>
        </BaseRow>
      </S.ProfileColumn>
    </BaseRow>
  );
};
