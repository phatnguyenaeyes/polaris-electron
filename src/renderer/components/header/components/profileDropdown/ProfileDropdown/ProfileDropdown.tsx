import { BaseAvatar } from '@app/components/common/BaseAvatar/BaseAvatar';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BasePopover } from '@app/components/common/BasePopover/BasePopover';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { useAppSelector } from '@app/hooks/reduxHooks';
import { useResponsive } from '@app/hooks/useResponsive';
import React from 'react';
import { ProfileOverlay } from '../ProfileOverlay/ProfileOverlay';
import * as S from './ProfileDropdown.styles';

export const ProfileDropdown: React.FC = () => {
  const { isTablet } = useResponsive();

  const user = useAppSelector((state) => state.user.user);

  return user ? (
    <BasePopover content={<ProfileOverlay />} trigger="click">
      <S.ProfileDropdownHeader as={BaseRow} gutter={[10, 10]} align="middle">
        {isTablet && (
          <BaseCol>
            <span
              style={{ fontWeight: 500, fontSize: 15 }}
            >{`${user.firstName}`}</span>
          </BaseCol>
        )}
        <BaseCol>
          <BaseAvatar
            src="/default-avatar.png"
            alt="User"
            shape="circle"
            size={32}
          />
        </BaseCol>
      </S.ProfileDropdownHeader>
    </BasePopover>
  ) : null;
};
