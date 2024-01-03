import { ReloadOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import ReactSelectField from '@app/components/formControl/ReactSelectField';
import SelectField from '@app/components/formControl/SelectField';
import TextField from '@app/components/formControl/TextField';
import { Input } from 'antd';
import React from 'react';

interface Props {
  fieldName: string;
  fieldIndex: number;
}

export const TopicContentByAI: React.FC<Props> = ({
  fieldName,
  fieldIndex,
}) => {
  return (
    <div>
      <BaseRow gutter={24}>
        <BaseCol xs={24} lg={12}>
          <TextField
            name={`${fieldName}.${fieldIndex}.url`}
            label="Original content"
            placeholder="Enter URL"
          />
        </BaseCol>
        <BaseCol xs={24} lg={12}>
          <SelectField
            name={`${fieldName}.${fieldIndex}.prompt`}
            label="Prompt topic"
            placeholder="Select prompt topic"
          />
        </BaseCol>
        <BaseCol xs={24} lg={12}>
          <ReactSelectField
            name={`${fieldName}.${fieldIndex}.category`}
            label="Categories"
          />
        </BaseCol>
      </BaseRow>
      <div className="flex justify-between mt-4">
        <BaseTypography.Text strong>RESULT</BaseTypography.Text>
        <BaseButton htmlType="button" type="link" icon={<ReloadOutlined />}>
          Recreate
        </BaseButton>
      </div>
      <div className="bg-[#F4F4F4] rounded-lg p-4">
        <div>Opening*</div>
        <Input.TextArea />
        <div className="mt-2">Main content*</div>
        <Input.TextArea />
        <div className="mt-2">Conclusion*</div>
        <Input.TextArea />
      </div>
    </div>
  );
};
