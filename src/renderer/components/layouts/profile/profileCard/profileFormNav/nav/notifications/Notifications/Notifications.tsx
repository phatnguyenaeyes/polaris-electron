import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseAntdForm } from '@app/components/common/forms/BaseAntdForm/BaseAntdForm';
import { NotificationsTypes } from '@app/components/profile/profileCard/profileFormNav/nav/notifications/NotificationsTypes/NotificationsTypes';
import React from 'react';
import { useTranslation } from 'react-i18next';
import * as S from './Notifications.styles';

export const Notifications: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseCard>
      <BaseAntdForm.Item>
        <BaseAntdForm.Title>{t('profile.nav.notifications.settings')}</BaseAntdForm.Title>
      </BaseAntdForm.Item>
      <S.Description>{t('profile.nav.notifications.description')}</S.Description>
      <NotificationsTypes />
    </BaseCard>
  );
};
