import { PlusOutlined } from '@ant-design/icons';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import TextField from '@app/components/formControl/TextField';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../AnswerLibrary.styles';
import AnswerFieldArray from './AnswerFieldArray';
import GroupIdField from './GroupIdField';
import { useTranslation } from 'react-i18next';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import SelectField from '@app/components/formControl/SelectField';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import AutocompleteField from '@app/components/formControl/AutocompleteField';

interface Props {
  fieldName: string;
  onDelete?: (groupId: string) => void;
}

const QuestionAndAnswerField: React.FC<Props> = ({ fieldName, onDelete }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const [activeTab, setActiveTab] = useState(0);
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });
  return (
    <div className="bg-white p-4 rounded-sm mb-4">
      <div className="flex">
        <S.FieldInfoContentTabContainer className="justify-between w-full">
          <div
            className="flex"
            style={{ maxWidth: 'calc(100% - 210px)', overflowX: 'auto' }}
          >
            {fields.map((item, idx) => (
              <S.FieldInfoContentTab
                $active={idx === activeTab}
                key={item.id}
                onClick={() => {
                  setActiveTab(idx);
                }}
              >
                <S.FieldInfoContentTabItem>
                  {t('POLARIS.GROUP')} {idx + 1}
                </S.FieldInfoContentTabItem>
              </S.FieldInfoContentTab>
            ))}
          </div>
          <S.FieldInfoContentTab className="!mr-0">
            <BaseButton
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => {
                append({
                  content: '',
                  priority: '1',
                  layout: 'FLEXIBLE',
                  answerVideo: [
                    {
                      video: '',
                      answerContent: '',
                    },
                  ],
                });
                const nextFieldLength = fields.length + 1;
                setActiveTab(nextFieldLength - 1 || 0);
              }}
            >
              <span>{t('POLARIS.ADD_KEYWORD_GROUP')}</span>
            </BaseButton>
          </S.FieldInfoContentTab>
        </S.FieldInfoContentTabContainer>
      </div>
      {fields.map((field, index) => (
        <S.ActiveTabContainer
          $active={index === activeTab}
          key={field.id}
          style={{
            marginBottom: '24px',
          }}
        >
          <div className="pt-2 flex justify-end mb-4">
            <GroupIdField
              fieldIndex={index}
              fieldLength={fields.length}
              fieldName={`${fieldName}.${index}._id`}
              onDelete={(contentTopicId) => {
                if (contentTopicId) {
                  onDelete?.(contentTopicId);
                }
                remove(index);
                const nextFieldLength = fields.length - 1;
                setActiveTab(nextFieldLength - 1);
              }}
            />
          </div>
          <BaseRow gutter={24} style={{ marginBottom: 24 }}>
            <BaseCol xs={24} lg={12}>
              <SelectField options={[]} name="123" label="Category" />
            </BaseCol>
            <BaseCol xs={24} lg={12}>
              <AutocompleteField
                name={`${fieldName}.${index}.content`}
                options={[
                  {
                    label: 'Options 1',
                    value: 'Options 1',
                  },
                  {
                    label: 'Options 2',
                    value: 'Options 2',
                  },
                ]}
                label="Question"
                placeholder={t('POLARIS.PLEASE_INPUT_CONTENT')}
              />
            </BaseCol>
            <BaseCol xs={24} lg={12}>
              <RadioGroupField
                name={`${fieldName}.${index}.priority`}
                label="Priority"
                options={[
                  {
                    label: `${t('POLARIS.LEVEL')} 1`,
                    value: '1',
                  },
                  {
                    label: `${t('POLARIS.LEVEL')} 2`,
                    value: '2',
                  },
                  {
                    label: `${t('POLARIS.LEVEL')} 3`,
                    value: '3',
                  },
                ]}
              />
            </BaseCol>
            <BaseCol xs={24} lg={12}>
              <RadioGroupField
                name={`${fieldName}.${index}.layout`}
                label={t('POLARIS.LAYOUT_SAMPLE')}
                style={{ width: '100%' }}
                options={[
                  {
                    label: 'Flexible',
                    value: 'FLEXIBLE',
                  },
                  {
                    label: 'Fixed',
                    value: 'FIXED',
                  },
                ]}
              />
            </BaseCol>
          </BaseRow>
          <AnswerFieldArray
            parrentFieldname={`${fieldName}.${index}`}
            fieldName={`${fieldName}.${index}.answerVideo`}
          />
        </S.ActiveTabContainer>
      ))}
    </div>
  );
};

export default QuestionAndAnswerField;
