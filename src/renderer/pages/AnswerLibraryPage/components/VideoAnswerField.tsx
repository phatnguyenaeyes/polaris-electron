import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  fieldName: string;
}

const VideoAnswerField: React.FC<Props> = ({ fieldName }) => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const watchVideoAnswerFieldOption = watch(`${fieldName}.videoAnswerOption`);
  const showImageField = watchVideoAnswerFieldOption === 'image';
  return (
    <div>
      <BaseCard style={{ marginBottom: 24 }}>
        <UploadListField
          required
          videoOnly
          placeholder={t('POLARIS.UPLOAD_VIDEO')}
          label="Video trả lời"
          suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
          name={`${fieldName}.video`}
          maxLength={1}
        />
        <RadioGroupField
          name={`${fieldName}.videoAnswerOption`}
          radioPerRow={2}
          options={[
            {
              label: 'Thêm chart',
              value: 'chart',
            },
            {
              label: 'Thêm hình',
              value: 'image',
            },
          ]}
        />
        {showImageField ? (
          <UploadListField
            required
            placeholder="Tải ảnh lên"
            label="Hình đính kèm"
            suffixHelpText={'Định dạng .jpg, .png hoặc file .avi'}
            name={`${fieldName}.videoAnswerImage`}
            maxLength={1}
          />
        ) : null}
        {!showImageField ? (
          <TextField label="Link Chart" name={`${fieldName}.videoAnswerLinkChart`} placeholder="Nhập đường dẫn" />
        ) : null}
      </BaseCard>
    </div>
  );
};

export default VideoAnswerField;
