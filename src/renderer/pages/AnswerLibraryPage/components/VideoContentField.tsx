import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import React from 'react';
import { useTranslation } from 'react-i18next';

const VideoContentField: React.FC = () => {
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
                label="Video nội dung"
                suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                name="videoContent"
                maxLength={1}
              />
              <RadioGroupField
                name="videoContentLayout"
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
              <TextField name="videoContentIntro" textArea />
            </BaseCol>
          </BaseRow>
        </>
      </CardContent>
    </div>
  );
};

export default VideoContentField;
