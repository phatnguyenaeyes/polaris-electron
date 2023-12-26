import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import React from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  fieldName: string;
  fieldLength: number;
  fieldIndex: number;
  onDelete: (contentTopicId: string) => void;
}

const GroupIdField: React.FC<Props> = ({ fieldLength, fieldIndex, fieldName, onDelete }) => {
  const { watch, register } = useFormContext();
  const watchGroupIdField = watch(`${fieldName}`);
  return (
    <>
      {fieldLength > 1 ? (
        <BaseButton
          type="primary"
          ghost
          htmlType="button"
          onClick={() => {
            onDelete(watchGroupIdField);
          }}
        >
          Xoá nhóm từ khoá {fieldIndex + 1}
        </BaseButton>
      ) : null}
      <input type="hidden" {...register(`${fieldName}`)} />
    </>
  );
};

export default GroupIdField;
