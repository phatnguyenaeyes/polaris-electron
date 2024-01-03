import {
  CloseOutlined,
  PlusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  fieldName: string;
  parrentFieldname: string;
}

const AnswerFieldArray: React.FC<Props> = ({ fieldName, parrentFieldname }) => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  const videoLayoutValue = watch(`${parrentFieldname}.layout`);

  return (
    <div className="mb-4">
      <BaseRow gutter={24}>
        {fields.map((item, index) => {
          return (
            <BaseCol xs={24} lg={12} key={item.id} className="mb-4">
              {fields.length > 1 ? (
                <div className="flex justify-end mb-2">
                  <BaseButton
                    htmlType="button"
                    size="small"
                    type="dashed"
                    danger
                    onClick={() => {
                      remove(index);
                    }}
                  >
                    {t('POLARIS.DELETE')}
                  </BaseButton>
                </div>
              ) : null}
              {videoLayoutValue === 'FLEXIBLE' ? (
                <TextField
                  name={`${fieldName}.${index}.answerContent`}
                  textArea
                />
              ) : (
                <UploadListField
                  required
                  videoOnly
                  placeholder={t('POLARIS.UPLOAD_VIDEO')}
                  label={t('POLARIS.ANSWER')}
                  suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                  name={`${fieldName}.${index}.video`}
                  maxLength={1}
                />
              )}
            </BaseCol>
          );
        })}
      </BaseRow>

      <br />
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
        }}
      >
        <BaseButton
          className="flex w-full items-center justify-center rounded-[12px] normal-case"
          htmlType="button"
          onClick={() => {
            append({ video: '', name: '', videoLayout: 'layout1' });
          }}
        >
          <PlusCircleOutlined className="" />
          <span className="inline-flex pl-2 text-[15px]">
            {t('POLARIS.ADD_ANSWER')}
          </span>
        </BaseButton>
      </div>
    </div>
  );
};

export default AnswerFieldArray;
