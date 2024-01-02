import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React from 'react';
import { useTranslation } from 'react-i18next';

const VideoStartField: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
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
                name="videoStart"
                maxLength={1}
              />
              <RadioGroupField
                name="videoLayout"
                label={t('POLARIS.LAYOUT_SAMPLE')}
                style={{ width: '100%' }}
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
            <BaseCol xs={24} lg={18}>
              <TextField name="videoStartIntro" textArea />
            </BaseCol>
          </BaseRow>
        </>
      </CardContent>
    </div>
  );
};

export default VideoStartField;
