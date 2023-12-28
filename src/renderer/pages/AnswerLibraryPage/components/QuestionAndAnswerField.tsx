import { PlusOutlined } from '@ant-design/icons';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import React, { useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../AnswerLibrary.styles';
import InputTagField from '@app/components/formControl/InputTagField';
import AnswerFieldArray from './AnswerFieldArray';
import GroupIdField from './GroupIdField';
import { useTranslation } from 'react-i18next';

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
    <div
      style={{
        marginBottom: '24px',
      }}
    >
      <div className="d-flex">
        <S.FieldInfoContentTabContainer className="justify-content-between w-100">
          <div
            className="d-flex"
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
          <S.FieldInfoContentTab
            onClick={() => {
              append({
                content: '',
                priority: '1',
                answerVideo: [
                  {
                    video: '',
                    answerContent: '123',
                    videoLayout: 'layout-2',
                  },
                ],
              });
              const nextFieldLength = fields.length + 1;
              setActiveTab(nextFieldLength - 1 || 0);
            }}
          >
            <S.FieldInfoContentTabItem>
              <PlusOutlined className="" />
              <span
                style={{
                  display: 'inline-block',
                  paddingLeft: '8px',
                }}
              >
                {t('POLARIS.ADD_KEYWORD_GROUP')}
              </span>
            </S.FieldInfoContentTabItem>
          </S.FieldInfoContentTab>
        </S.FieldInfoContentTabContainer>
      </div>
      {fields.map((field, index) => (
        <div
          key={field.id}
          style={{
            marginBottom: '25px',
            display: index === activeTab ? 'block' : 'none',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              marginBottom: '10px',
            }}
          >
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
          <BaseRow style={{ marginBottom: 24 }}>
            <BaseCol xs={12} lg={10}>
              <RadioGroupField
                name={`${fieldName}.${index}.priority`}
                radioPerRow={2}
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
            <BaseCol xs={12} lg={14}>
              <TextField
                name={`${fieldName}.${index}.content`}
                label={t('POLARIS.CONTENT')}
                placeholder={t('POLARIS.PLEASE_INPUT_CONTENT')}
              />
              <InputTagField
                label={t('POLARIS.KEYWORD')}
                name={`${fieldName}.${index}.keywords`}
                placeHolder={t('POLARIS.INPUT_KEYWORD')}
              />
            </BaseCol>
          </BaseRow>
          <AnswerFieldArray fieldName={`${fieldName}.${index}.answerVideo`} />
        </div>
      ))}
    </div>
  );
};

export default QuestionAndAnswerField;
