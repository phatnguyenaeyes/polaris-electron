import { MinusOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import SelectField from '@app/components/formControl/SelectField';
import TextField from '@app/components/formControl/TextField';
import TimepickerField from '@app/components/formControl/TimepickerField';
import { topicService } from '@app/services/topic.service';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../Livestream.styles';
import { useTranslation } from 'react-i18next';

interface AnswerLibraryFieldProps {
  fieldName: string;
  allowAdd?: boolean;
}

const AnswerLibraryField: React.FC<AnswerLibraryFieldProps> = ({ fieldName, allowAdd = true }) => {
  const { t } = useTranslation();
  const { control } = useFormContext();
  const [topicList, setTopicList] = useState([]);

  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  useEffect(() => {
    (async () => {
      const res = await topicService.getAll({
        page: 1,
        pageSize: 100,
      });
      const data = res.data;
      setTopicList(
        (data || []).map((topic: any) => ({
          label: topic.name,
          value: topic._id,
        })),
      );
    })();
  }, []);

  return (
    <div>
      {fields.map((item, index) => (
        <S.LivestreamWrapper key={item.id}>
          <Row>
            <Col xs={24} lg={24}>
              <SelectField
                required
                label={`${t('POLARIS.TOPIC')} ${index + 1}`}
                placeholder={`${t('POLARIS.CHOOSE_TOPIC')}`}
                name={`${fieldName}.${index}.topicId`}
                options={topicList}
              />
            </Col>
            {/* <Col xs={24} lg={24}>
              <TextField label="Link" name={`${fieldName}.${index}.linkChart`} placeholder="Nhập đường dẫn liên kết" />
            </Col> */}
            {/* <Col xs={24} lg={24}>
              <TimepickerField required label="Thời lượng live" name={`${fieldName}.${index}.durationLive`} />
            </Col> */}
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
              <span>{t('POLARIS.DELETE')}</span>
            </BaseButton>
          ) : null}
        </S.LivestreamWrapper>
      ))}
      {allowAdd && (
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
          <PlusCircleOutlined className="h-6 w-6 text-black" />
          <span className="inline-flex pl-2 text-[15px] text-black">{t('POLARIS.ADD_TOPIC')}</span>
        </BaseButton>
      )}

      <br />
    </div>
  );
};

export default AnswerLibraryField;
