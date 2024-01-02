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
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';

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
  const { control, getValues, watch } = useFormContext();
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
            <BaseButton type="primary" icon={<PlusOutlined />} size="small">
              <span>{t('POLARIS.ADD_CONTENT')}</span>
            </BaseButton>
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
        const layoutValue = watch(`${fieldName}.${index}.layout`);

        return (
          <S.ActiveTabContainer
            $active={index === activeTab}
            key={item.id}
            style={{
              marginBottom: '24px',
            }}
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
              <BaseCol xs={24} lg={6}>
                <StreamContentTopicDisplayType
                  fieldName={`${fieldName}.${index}`}
                />
              </BaseCol>
              <BaseCol xs={24} lg={18}>
                <RadioGroupField
                  name={`${fieldName}.${index}.layout`}
                  label={t('POLARIS.LAYOUT_SAMPLE')}
                  style={{ width: '50%' }}
                  options={[
                    {
                      label: 'Flexible',
                      value: 'layout-1',
                    },
                    {
                      label: 'Fixed',
                      value: 'layout-2',
                    },
                  ]}
                />
              </BaseCol>
            </BaseRow>
            <div
              style={{
                marginBottom: '24px',
              }}
            >
              <div>
                <>
                  <BaseRow>
                    {layoutValue === 'layout-1' ? (
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
                    ) : null}
                    {layoutValue === 'layout-2' ? (
                      <BaseCol xs={24} lg={18}>
                        <p className="mb-2 after:text-[red] after:ml-2 after:content-['*']">
                          {t('POLARIS.OPENING_VIDEO')}
                        </p>
                        <TextField
                          name={`${fieldName}.${index}.content_opening`}
                          textArea
                        />
                      </BaseCol>
                    ) : null}
                  </BaseRow>
                  {vBee_audio_opening_arr ? (
                    <AudioGroup arr={vBee_audio_opening_arr} slug={slug} />
                  ) : null}
                </>
              </div>
            </div>
            {/*  */}
            <div style={{ marginBottom: '24px' }}>
              <div>
                <>
                  <BaseRow>
                    {layoutValue === 'layout-1' ? (
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
                    ) : null}
                    {layoutValue === 'layout-2' ? (
                      <BaseCol xs={24} lg={18}>
                        <p className="mb-2 after:text-[red] after:ml-2 after:content-['*']">
                          {t('POLARIS.MAIN_CONTENT_VIDEO')}
                        </p>
                        <TextField
                          name={`${fieldName}.${index}.content_body`}
                          textArea
                        />
                      </BaseCol>
                    ) : null}
                  </BaseRow>
                  {vBee_audio_body_arr ? (
                    <AudioGroup arr={vBee_audio_body_arr} slug={slug} />
                  ) : null}
                </>
              </div>
            </div>
            {/*  */}
            <div>
              <div>
                <>
                  <BaseRow>
                    {layoutValue === 'layout-1' ? (
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
                    ) : null}
                    {layoutValue === 'layout-2' ? (
                      <BaseCol xs={24} lg={18}>
                        <p className="mb-2 after:text-[red] after:ml-2 after:content-['*']">
                          {t('POLARIS.CONCLUSION_VIDEO')}
                        </p>
                        <TextField
                          name={`${fieldName}.${index}.content_conclusion`}
                          textArea
                        />
                      </BaseCol>
                    ) : null}
                  </BaseRow>
                  {vBee_audio_conclusion_arr ? (
                    <AudioGroup arr={vBee_audio_conclusion_arr} slug={slug} />
                  ) : null}
                </>
              </div>
            </div>
          </S.ActiveTabContainer>
        );
      })}
    </div>
  );
};

export default LibraryContentField;
