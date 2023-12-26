import { BaseAntdForm } from '@app/components/common/forms/BaseAntdForm/BaseAntdForm';
import { InputPassword } from '@app/components/common/inputs/InputPassword/InputPassword';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const CurrentPasswordItem: React.FC = () => {
  const { t } = useTranslation();

  return (
    <BaseAntdForm.Item
      name="password"
      label={t('profile.nav.securitySettings.currentPassword')}
      rules={[
        {
          required: true,
          message: t('profile.nav.securitySettings.requiredPassword'),
        },
      ]}
    >
      <InputPassword />
    </BaseAntdForm.Item>
  );
};
