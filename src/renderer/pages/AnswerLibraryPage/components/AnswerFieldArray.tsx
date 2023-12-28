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
}

const AnswerFieldArray: React.FC<Props> = ({ fieldName }) => {
  const { t } = useTranslation();
  const { control, formState } = useFormContext();
  const [activeTab, setActiveTab] = useState(0);
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <div
      style={{
        marginBottom: '24px',
      }}
    >
      {fields.map((item, index) => (
        <div
          key={item.id}
          style={{
            marginBottom: '24px',
          }}
        >
          <CardContent>
            <BaseRow>
              <BaseCol xs={24} lg={6}>
                <UploadListField
                  required
                  videoOnly
                  placeholder={t('POLARIS.UPLOAD_VIDEO')}
                  label={t('POLARIS.ANSWER')}
                  suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                  name={`${fieldName}.${index}.video`}
                  maxLength={1}
                />
                <RadioGroupField
                  name={`${fieldName}.${index}.videoLayout`}
                  label={t('POLARIS.LAYOUT_SAMPLE')}
                  radioPerRow={2}
                  style={{ width: '100%' }}
                  options={[
                    {
                      label: 'Layout 1',
                      value: 'layout-1',
                    },
                    {
                      label: 'Layout 2',
                      value: 'layout-2',
                    },
                  ]}
                />
              </BaseCol>
              <BaseCol xs={24} lg={18}>
                <TextField
                  name={`${fieldName}.${index}.answerContent`}
                  textArea
                />
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
          </CardContent>
        </div>
      ))}
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
