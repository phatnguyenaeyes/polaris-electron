import { CloseOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { Col, Row } from 'antd';
import React from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../AnswerLibrary.styles';
import VideoAnswerField from './VideoAnswerField';

interface AnswerVideoFieldProps {
  fieldName: string;
}

const AnswerVideoField: React.FC<AnswerVideoFieldProps> = ({ fieldName }) => {
  const { control } = useFormContext();
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
        <div key={item.id} className="relative mb-3 rounded-[12px] bg-[#F5F5F5] p-[12px]">
          <Row>
            <Col xs={24} lg={24}>
              <S.UploadVideoGroup>
                <div style={{ width: '100%' }}>
                  <VideoAnswerField fieldName={`${fieldName}.${index}`} />
                </div>
                <S.RemoveVideoIcon>
                  {fields.length > 1 ? (
                    <BaseButton
                      htmlType="button"
                      type="dashed"
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => {
                        remove(index);
                      }}
                    />
                  ) : null}
                </S.RemoveVideoIcon>
              </S.UploadVideoGroup>
            </Col>
          </Row>
          {/* {(formState?.errors?.partnerList as any)?.[index]?.logo ? (
            <div>
              *{(formState?.errors?.partnerList as any)?.[index]?.logo?.message}
            </div>
          ) : null} */}
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
          className="flex w-full items-center justify-center rounded-[12px] bg-[#F6F6F6] normal-case"
          htmlType="button"
          onClick={() => {
            append({ video: '', name: '', videoAnswerOption: 'image' });
          }}
        >
          <PlusCircleOutlined className="h-6 w-6 text-black" />
          <span className="inline-flex pl-2 text-[15px] text-black">Thêm câu trả lời</span>
        </BaseButton>
      </div>
    </div>
  );
};

export default AnswerVideoField;
