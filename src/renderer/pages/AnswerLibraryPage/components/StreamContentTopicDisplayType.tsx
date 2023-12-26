import React from 'react';
import { useFormContext } from 'react-hook-form';
import UploadListField from '@app/components/formControl/UploadListField';

interface Props {
  fieldName: string;
}

export const StreamContentTopicDisplayType: React.FC<Props> = ({ fieldName }) => {
  const { formState } = useFormContext();

  return (
    <div>
      {/* <UploadCropField label="Hình nền" name={`${fieldName}.background`} maxLength={1} /> */}
      <UploadListField label="Hình nền" name={`${fieldName}.background`} maxLength={1} />

      {formState.errors?.contentTopic?.type === 'shouldRequireContentBg' && formState?.errors?.contentTopic && (
        <div style={{ color: '#ff4d4f' }}>{formState.errors.contentTopic.message as string}</div>
      )}
    </div>
  );
};
