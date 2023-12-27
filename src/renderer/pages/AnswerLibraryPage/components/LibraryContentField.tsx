import { PlusOutlined } from '@ant-design/icons';
import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React, { useState, useRef } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import * as S from '../AnswerLibrary.styles';
import TopicContentIdField from './TopicContentIdField';
import { useTranslation } from 'react-i18next';
import { SimpleAudioPlayerButton } from '@app/components/audio-player/AudioPlayer';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { useParams } from 'react-router-dom';
import { StreamContentTopicDisplayType } from './StreamContentTopicDisplayType';

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
    <div className="d-flex flex-row flex-wrap" style={{ gap: '20px' }}>
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
  const { control, getValues } = useFormContext();
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
                  {t('POLARIS.CONTENT')} {idx + 1}
                </S.FieldInfoContentTabItem>
              </S.FieldInfoContentTab>
            ))}
          </div>
          <S.FieldInfoContentTab
            onClick={() => {
              append({
                video_opening: '',
                content_opening: '',
                layout: 'layout-1',
              });
              setActiveTab(fields.length || 0);
            }}
          >
            <S.FieldInfoContentTabItem>
              <PlusOutlined className="h-6 w-6 text-black" />
              <span
                style={{
                  display: 'inline-block',
                  paddingLeft: '8px',
                }}
              >
                {t('POLARIS.ADD_CONTENT')}
              </span>
            </S.FieldInfoContentTabItem>
          </S.FieldInfoContentTab>
        </S.FieldInfoContentTabContainer>
      </div>
      {fields.map((item, index) => {
        const vBee_audio_body_arr = getValues(
          `${fieldName}.${index}.vBee_audio_body`,
        );
        const vBee_audio_conclusion_arr = getValues(
          `${fieldName}.${index}.vBee_audio_conclusion`,
        );
        const vBee_audio_opening_arr = getValues(
          `${fieldName}.${index}.vBee_audio_opening`,
        );

        return (
          <div
            key={item.id}
            className="relative mb-3 rounded-[12px] bg-[#F5F5F5] p-[12px]"
            style={{
              marginBottom: '24px',
              display: index === activeTab ? 'block' : 'none',
            }}
          >
            {/*  */}
            <RadioGroupField
              name={`${fieldName}.${index}.layout`}
              label={t('POLARIS.LAYOUT_SAMPLE')}
              radioPerRow={2}
              style={{ width: '50%' }}
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
            {/*  */}
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
            {/*  */}
            <StreamContentTopicDisplayType
              fieldName={`${fieldName}.${index}`}
            />
            <div
              style={{
                marginBottom: '24px',
              }}
            >
              <CardContent>
                <>
                  <BaseRow>
                    <BaseCol xs={24} lg={6}>
                      <UploadListField
                        required
                        videoOnly
                        placeholder={t('POLARIS.UPLOAD_VIDEO')}
                        label={t('POLARIS.OPENING_VIDEO')}
                        suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                        name={`${fieldName}.${index}.video_opening`}
                        maxLength={1}
                      />
                    </BaseCol>
                    <BaseCol xs={24} lg={18}>
                      <TextField
                        name={`${fieldName}.${index}.content_opening`}
                        textArea
                      />
                    </BaseCol>
                  </BaseRow>
                  {vBee_audio_opening_arr ? (
                    <AudioGroup arr={vBee_audio_opening_arr} slug={slug} />
                  ) : null}
                </>
              </CardContent>
            </div>
            {/*  */}
            <div style={{ marginBottom: '24px' }}>
              <CardContent>
                <>
                  <BaseRow>
                    <BaseCol xs={24} lg={6}>
                      <UploadListField
                        required
                        videoOnly
                        placeholder={t('POLARIS.UPLOAD_VIDEO')}
                        label={t('POLARIS.MAIN_CONTENT_VIDEO')}
                        suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                        name={`${fieldName}.${index}.video_body`}
                        maxLength={1}
                      />
                    </BaseCol>
                    <BaseCol xs={24} lg={18}>
                      <TextField
                        name={`${fieldName}.${index}.content_body`}
                        textArea
                      />
                    </BaseCol>
                  </BaseRow>
                  {vBee_audio_body_arr ? (
                    <AudioGroup arr={vBee_audio_body_arr} slug={slug} />
                  ) : null}
                </>
              </CardContent>
            </div>
            {/*  */}
            <div>
              <CardContent>
                <>
                  <BaseRow>
                    <BaseCol xs={24} lg={6}>
                      <UploadListField
                        required
                        videoOnly
                        placeholder={t('POLARIS.UPLOAD_VIDEO')}
                        label={t('POLARIS.CONCLUSION_VIDEO')}
                        suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                        name={`${fieldName}.${index}.video_conclusion`}
                        maxLength={1}
                      />
                    </BaseCol>
                    <BaseCol xs={24} lg={18}>
                      <TextField
                        name={`${fieldName}.${index}.content_conclusion`}
                        textArea
                      />
                    </BaseCol>
                  </BaseRow>
                  {vBee_audio_conclusion_arr ? (
                    <AudioGroup arr={vBee_audio_conclusion_arr} slug={slug} />
                  ) : null}
                </>
              </CardContent>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default LibraryContentField;
