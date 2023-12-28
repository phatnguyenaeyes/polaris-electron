import { MinusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import TextField from '@app/components/formControl/TextField';
import { Col, Row } from 'antd';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface ContentQuestionFieldProps {
  fieldName: string;
}

const ContentQuestionField: React.FC<ContentQuestionFieldProps> = ({
  fieldName,
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <div>
      {fields.map((item, index) => (
        <div key={item.id}>
          <Row>
            <Col xs={24} lg={24}>
              <TextField
                label={`${t('POLARIS.QUESTION_CONTENT')} ${index + 1}`}
                name={`${fieldName}.${index}.question`}
                placeholder={t('POLARIS.INPUT_URL')}
              />
            </Col>
          </Row>
          {fields.length > 1 ? (
            <BaseButton
              htmlType="button"
              type="ghost"
              danger
              onClick={() => {
                remove(index);
              }}
            >
              <MinusOutlined />
              <span>{t('POLARIS.DELETE_QUESTION')}</span>
            </BaseButton>
          ) : null}
        </div>
      ))}
      <br />
      <BaseButton
        htmlType="button"
        onClick={() => {
          append({
            answerVideo: [
              {
                video: '',
              },
            ],
            content: '',
            keyword: '',
          });
        }}
      >
        <PlusCircleOutlined className="" />
        <span className="">{t('POLARIS.ADD_CONTENT')}</span>
      </BaseButton>
      <br />
    </div>
  );
};

export default ContentQuestionField;
