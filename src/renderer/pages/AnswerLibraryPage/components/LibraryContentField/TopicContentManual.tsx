import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React, { useRef } from 'react';
import { StreamContentTopicDisplayType } from '../StreamContentTopicDisplayType';
import { useTranslation } from 'react-i18next';
import { useFormContext } from 'react-hook-form';
import { SimpleAudioPlayerButton } from '@app/components/audio-player/AudioPlayer';
import { S3_DOMAIN_URL } from '@app/constants/url';

interface Props {
  fieldName: string;
  fieldIndex: number;
  slug?: string;
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

export const TopicContentManual: React.FC<Props> = ({
  fieldName,
  fieldIndex,
  slug,
}) => {
  const { getValues, watch } = useFormContext();
  const layoutValue = watch(`${fieldName}.${fieldIndex}.layout`);
  const { t } = useTranslation();
  const vBee_audio_body_arr = getValues(
    `${fieldName}.${fieldIndex}.vBee_audio_body`,
  );
  const vBee_audio_conclusion_arr = getValues(
    `${fieldName}.${fieldIndex}.vBee_audio_conclusion`,
  );
  const vBee_audio_opening_arr = getValues(
    `${fieldName}.${fieldIndex}.vBee_audio_opening`,
  );
  return (
    <>
      <BaseRow gutter={24}>
        <BaseCol xs={24} lg={6}>
          <StreamContentTopicDisplayType
            fieldName={`${fieldName}.${fieldIndex}`}
          />
        </BaseCol>
        <BaseCol xs={24} lg={18}>
          <RadioGroupField
            name={`${fieldName}.${fieldIndex}.layout`}
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
      <div className="mb-4">
        <div>
          <>
            <BaseRow>
              {layoutValue === 'layout-2' ? (
                <BaseCol xs={24} lg={6}>
                  <UploadListField
                    required
                    videoOnly
                    placeholder={t('POLARIS.UPLOAD_VIDEO')}
                    label={t('POLARIS.OPENING_VIDEO')}
                    suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                    name={`${fieldName}.${fieldIndex}.video_opening`}
                    maxLength={1}
                  />
                </BaseCol>
              ) : null}
              {layoutValue === 'layout-1' ? (
                <BaseCol xs={24} lg={18}>
                  <p className="mb-2 after:text-[red] after:ml-2 after:content-['*']">
                    {t('POLARIS.OPENING_VIDEO')}
                  </p>
                  <TextField
                    name={`${fieldName}.${fieldIndex}.content_opening`}
                    textArea
                  />
                </BaseCol>
              ) : null}
            </BaseRow>
            {layoutValue === 'layout-1' && vBee_audio_opening_arr ? (
              <AudioGroup arr={vBee_audio_opening_arr} slug={slug} />
            ) : null}
          </>
        </div>
      </div>
      <div className="mb-4">
        <div>
          <>
            <BaseRow>
              {layoutValue === 'layout-2' ? (
                <BaseCol xs={24} lg={6}>
                  <UploadListField
                    required
                    videoOnly
                    placeholder={t('POLARIS.UPLOAD_VIDEO')}
                    label={t('POLARIS.MAIN_CONTENT_VIDEO')}
                    suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                    name={`${fieldName}.${fieldIndex}.video_body`}
                    maxLength={1}
                  />
                </BaseCol>
              ) : null}
              {layoutValue === 'layout-1' ? (
                <BaseCol xs={24} lg={18}>
                  <p className="mb-2 after:text-[red] after:ml-2 after:content-['*']">
                    {t('POLARIS.MAIN_CONTENT_VIDEO')}
                  </p>
                  <TextField
                    name={`${fieldName}.${fieldIndex}.content_body`}
                    textArea
                  />
                </BaseCol>
              ) : null}
            </BaseRow>
            {layoutValue === 'layout-1' && vBee_audio_body_arr ? (
              <AudioGroup arr={vBee_audio_body_arr} slug={slug} />
            ) : null}
          </>
        </div>
      </div>
      <div>
        <div>
          <>
            <BaseRow>
              {layoutValue === 'layout-2' ? (
                <BaseCol xs={24} lg={6}>
                  <UploadListField
                    required
                    videoOnly
                    placeholder={t('POLARIS.UPLOAD_VIDEO')}
                    label={t('POLARIS.CONCLUSION_VIDEO')}
                    suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                    name={`${fieldName}.${fieldIndex}.video_conclusion`}
                    maxLength={1}
                  />
                </BaseCol>
              ) : null}
              {layoutValue === 'layout-1' ? (
                <BaseCol xs={24} lg={18}>
                  <p className="mb-2 after:text-[red] after:ml-2 after:content-['*']">
                    {t('POLARIS.CONCLUSION_VIDEO')}
                  </p>
                  <TextField
                    name={`${fieldName}.${fieldIndex}.content_conclusion`}
                    textArea
                  />
                </BaseCol>
              ) : null}
            </BaseRow>
            {layoutValue === 'layout-1' && vBee_audio_conclusion_arr ? (
              <AudioGroup arr={vBee_audio_conclusion_arr} slug={slug} />
            ) : null}
          </>
        </div>
      </div>
    </>
  );
};
