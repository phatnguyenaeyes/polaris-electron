import { MinusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import InputTagField from '@app/components/formControl/InputTagField';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import { Col, Row } from 'antd';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../AnswerLibrary.styles';
import AnswerVideoField from './AnswerVideoField';

interface AnswerGroupFieldProps {
  fieldName: string;
}

const AnswerGroupField: React.FC<AnswerGroupFieldProps> = ({ fieldName }) => {
  const { control, formState, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <div>
      <br />
      <div>
        Nhóm keyword <span>*</span>
      </div>
      {fields.map((item, index) => (
        <S.AnswerGroupWrapper key={item.id}>
          <Row>
            <Col xs={24} lg={24}>
              <div className="pt-2">
                <input
                  type="hidden"
                  {...register(`${fieldName}.${index}._id`)}
                />
                <RadioGroupField
                  required
                  label="Độ ưu tiên"
                  name={`${fieldName}.${index}.priority`}
                  options={[
                    {
                      label: 'Mức độ 1',
                      value: '1',
                    },
                    {
                      label: 'Mức độ 2',
                      value: '2',
                    },
                    {
                      label: 'Mức độ 3',
                      value: '3',
                    },
                  ]}
                />
              </div>
            </Col>
            <Col xs={24} lg={24}>
              <div className="pt-2">
                <div className="form-label mb-2 text-[13px] font-medium text-black/[.5]">
                  Nội dung <span>*</span>
                </div>
                <TextField
                  name={`${fieldName}.${index}.content`}
                  placeholder="Nhập nội dung"
                />
              </div>
            </Col>
            <Col xs={24} lg={24}>
              <div className="pt-2">
                <div className="form-label mb-2 text-[13px] font-medium text-black/[.5]">
                  Keyword <span>*</span>
                </div>
                <InputTagField
                  name={`${fieldName}.${index}.keyword`}
                  placeHolder="Nhập từ khoá"
                />
                <br />
              </div>
            </Col>
            <Col xs={24} lg={24}>
              <AnswerVideoField
                fieldName={`${fieldName}.${index}.answerVideo`}
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
              <MinusOutlined className="" />
              <span className="inline-flex pl-2 text-[15px] text-black">
                Xoá nhóm keyword
              </span>
            </BaseButton>
          ) : null}
        </S.AnswerGroupWrapper>
      ))}

      {formState?.errors?.answerGroup &&
      !Array.isArray(formState?.errors?.answerGroup) ? (
        <div className="" style={{ color: '#ff4d4f' }}>
          *{(formState?.errors?.answerGroup as any)?.message}
        </div>
      ) : null}

      <BaseButton
        className="flex w-full items-center justify-center rounded-[12px] bg-[#F6F6F6] normal-case"
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
        <span className="inline-flex pl-2 text-[15px] text-black">
          Thêm nhóm keyword
        </span>
      </BaseButton>
      <br />
    </div>
  );
};

export default AnswerGroupField;
