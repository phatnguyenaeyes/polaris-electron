import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseCard } from '@app/components/common/BaseCard/BaseCard';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const VideoEndField: React.FC = () => {
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
                label={t('POLARIS.CONCLUSION_VIDEO')}
                suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                name="videoEnd"
                maxLength={1}
              />
              <RadioGroupField
                name="videoEndLayout"
                label={t('POLARIS.LAYOUT_SAMPLE')}
                radioPerRow={2}
                style={{ width: '100%' }}
                options={[
                  {
                    label: 'Layout 1',
                    value: 'layout1',
                  },
                  {
                    label: 'Layout 2',
                    value: 'layout2',
                  },
                ]}
              />
            </BaseCol>
            <BaseCol xs={24} lg={18}>
              <TextField name="videoEndIntro" textArea />
            </BaseCol>
          </BaseRow>
        </>
      </CardContent>
    </div>
  );
};

export default VideoEndField;
