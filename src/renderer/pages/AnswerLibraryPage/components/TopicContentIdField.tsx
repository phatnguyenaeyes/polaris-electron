import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  fieldName: string;
  fieldLength: number;
  fieldIndex: number;
  onDelete: (contentTopicId: string) => void;
}

const TopicContentIdField: React.FC<Props> = ({ fieldLength, fieldIndex, fieldName, onDelete }) => {
  const { t } = useTranslation();
  const { watch, register } = useFormContext();
  const watchTopicContentIdField = watch(`${fieldName}`);
  return (
    <>
      {fieldLength > 1 ? (
        <BaseButton
          type="primary"
          ghost
          htmlType="button"
          onClick={() => {
            onDelete(watchTopicContentIdField);
          }}
        >
          {t('POLARIS.DELETE_CONTENT')} {fieldIndex + 1}
        </BaseButton>
      ) : null}
      <input type="hidden" {...register(`${fieldName}`)} />
    </>
  );
};

export default TopicContentIdField;
