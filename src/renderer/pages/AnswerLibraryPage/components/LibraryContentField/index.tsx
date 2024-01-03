import { PlusOutlined } from '@ant-design/icons';
import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React, { useState, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../../AnswerLibrary.styles';
import TopicContentIdField from '../TopicContentIdField';
import { useTranslation } from 'react-i18next';
import { SimpleAudioPlayerButton } from '@app/components/audio-player/AudioPlayer';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { useParams } from 'react-router-dom';
import { StreamContentTopicDisplayType } from '../StreamContentTopicDisplayType';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { VisibilityContent } from '@app/components/visibilityContent';
import { TopicContentManual } from './TopicContentManual';
import { TopicContentByAI } from './TopicContentByAI';

interface Props {
  fieldName: string;
  onDelete?: (contentTopicId: string) => void;
}

const AudioGroup = ({ arr, slug }: { arr: any; slug: any }) => {
  const humanAudioListRef = useRef<any>([]);
  const onAudioPlay = (audioIdx: number) => {
    arr.map((item: any, idx: number) => {
      if (audioIdx !== idx) {
        if (humanAudioListRef.current[idx]) {
          humanAudioListRef.current[idx]?.stopAndReset();
        }
      }
    });
  };
  return (
    <div className="flex flex-row flex-wrap" style={{ gap: '20px' }}>
      {arr?.map((url: string, idx: number) => (
        <SimpleAudioPlayerButton
          key={idx}
          src={`${S3_DOMAIN_URL}/${slug}/${url}`}
          ref={(el) => (humanAudioListRef.current[idx] = el)}
          onPlay={() => onAudioPlay(idx)}
        />
      ))}
    </div>
  );
};

const LibraryContentField: React.FC<Props> = ({ fieldName, onDelete }) => {
  const { t } = useTranslation();
  const { slug } = useParams<any>();
  const { control, watch } = useFormContext();
  const [activeTab, setActiveTab] = useState(0);
  const { fields, append, remove } = useFieldArray({
    name: fieldName,
    control,
  });

  return (
    <div>
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
                  {t('POLARIS.CONTENT')} {idx + 1}
                </S.FieldInfoContentTabItem>
              </S.FieldInfoContentTab>
            ))}
          </div>
          <S.FieldInfoContentTab>
            <BaseButton
              type="primary"
              icon={<PlusOutlined />}
              size="small"
              onClick={() => {
                append({
                  video_opening: '',
                  content_opening: '',
                  layout: 'layout-1',
                });
                setActiveTab(fields.length || 0);
              }}
            >
              <span>{t('POLARIS.ADD_CONTENT')}</span>
            </BaseButton>
          </S.FieldInfoContentTab>
        </S.FieldInfoContentTabContainer>
      </div>
      {fields.map((item, index) => {
        const methodValue = watch(`${fieldName}.${index}.type`);

        return (
          <S.ActiveTabContainer
            $active={index === activeTab}
            key={item.id}
            className="mb-4"
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px',
              }}
            >
              <TopicContentIdField
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
            <BaseRow gutter={24}>
              <BaseCol xs={24} lg={12}>
                <TextField
                  name={`${fieldName}.${index}.content_name`}
                  label="Content name"
                  placeholder="Enter content name"
                />
              </BaseCol>
            </BaseRow>
            <RadioGroupField
              name={`${fieldName}.${index}.type`}
              buttonStyle="solid"
              displayAsTab
              style={{ width: '100%' }}
              options={[
                {
                  label: 'Manual',
                  value: 'manual',
                },
                {
                  label: 'Create with AI',
                  value: 'ai',
                },
              ]}
            />
            <VisibilityContent visible={methodValue === 'manual'}>
              <TopicContentManual
                fieldName={fieldName}
                fieldIndex={index}
                slug={slug}
              />
            </VisibilityContent>
            <VisibilityContent visible={methodValue === 'ai'}>
              <TopicContentByAI fieldName={fieldName} fieldIndex={index} />
            </VisibilityContent>
          </S.ActiveTabContainer>
        );
      })}
    </div>
  );
};

export default LibraryContentField;
