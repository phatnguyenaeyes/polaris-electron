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
  const { control, formState, watch } = useFormContext();
  const [activeTab, setActiveTab] = useState(0);
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  const videoLayoutValue = watch(`${parrentFieldname}.layout`);

  return (
    <div
      style={{
        marginBottom: '24px',
      }}
    >
      {fields.map((item, index) => {
        return (
          <div
            key={item.id}
            style={{
              marginBottom: '24px',
            }}
          >
            <div>
              <BaseRow>
                <BaseCol xs={24} lg={24}>
                  {videoLayoutValue === 'layout-2' ? (
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
                  {fields.length > 1 ? (
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <BaseButton
                        htmlType="button"
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
                </BaseCol>
              </BaseRow>
            </div>
          </div>
        );
      })}
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
            setActiveTab(fields.length || 0);
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
