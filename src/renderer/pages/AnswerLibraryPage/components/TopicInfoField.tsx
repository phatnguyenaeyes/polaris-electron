import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import SelectField from '@app/components/formControl/SelectField';
import TextField from '@app/components/formControl/TextField';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export const TopicInfoField = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const watchTopicType = watch('type');
  return (
    <div className="bg-white rounded-lg p-3 mb-3">
      <BaseRow gutter={24}>
        <BaseCol xs={24} lg={12}>
          <TextField
            required={true}
            label={t('POLARIS.TOPIC')}
            name="topicName"
            placeholder={t('POLARIS.INSERT_TOPIC_NAME')}
          />
        </BaseCol>
        <BaseCol xs={24} lg={12}>
          <RadioGroupField
            name={`type`}
            required
            label="Content type"
            options={[
              {
                label: 'Chart',
                value: 'CHART',
              },
              {
                label: 'Image',
                value: 'IMAGE',
              },
            ]}
          />
        </BaseCol>
      </BaseRow>
      {watchTopicType === 'CHART' ? (
        <BaseRow gutter={24}>
          <BaseCol xs={0} lg={12}></BaseCol>
          <BaseCol xs={0} lg={12}>
            <SelectField
              required
              label={t('POLARIS.CHART')}
              placeholder={`${t('POLARIS.SELECT_CHART_PLACEHOLDER')}`}
              name="chart_symbol"
              options={[
                { label: 'Select chart symbol', value: '' },
                // { label: 'DXY', value: 'DXY' },
                { label: 'XAUUSD', value: 'XAUUSD' },
                { label: 'EURUSD', value: 'EURUSD' },
                { label: 'GBPUSD', value: 'GBPUSD' },
                { label: 'USDJPY', value: 'USDJPY' },
                // { label: 'USTEC', value: 'USTEC' },
                // { label: 'USOIL', value: 'USOIL' },
                { label: 'BTCUSDT', value: 'BTCUSDT' },
              ]}
            />
          </BaseCol>
        </BaseRow>
      ) : null}
    </div>
  );
};
