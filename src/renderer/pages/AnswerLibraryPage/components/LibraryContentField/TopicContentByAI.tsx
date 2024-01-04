import { ReloadOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseTypography } from '@app/components/common/BaseTypography/BaseTypography';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import ReactSelectField from '@app/components/formControl/ReactSelectField';
import SelectField from '@app/components/formControl/SelectField';
import TextField from '@app/components/formControl/TextField';
import { promptTopicService } from '@app/services/promptTopic.service';
import { topicService } from '@app/services/topic.service';
import { Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface Props {
  fieldName: string;
  fieldIndex: number;
}

export const TopicContentByAI: React.FC<Props> = ({
  fieldName,
  fieldIndex,
}) => {
  const [loading, setLoading] = useState(false);
  const [created, setCreated] = useState(false);
  const { getValues, setValue, watch } = useFormContext();
  const [promptOptions, setPromptOptions] = useState([]);
  const watchedUrl = watch(`${fieldName}.${fieldIndex}.url`);
  const watchedPrompt = watch(`${fieldName}.${fieldIndex}.prompt`);

  useEffect(() => {
    (async () => {
      try {
        // setLoading(true);

        const res = await promptTopicService.getAll({
          page: 1,
          pageSize: 100,
        });
        setPromptOptions(
          (res.data || []).map((item: any) => ({
            label: item.title,
            value: item._id,
          })),
        );
      } catch (error) {
        setLoading(false);
      }
    })();
  }, []);

  const generateTopicContent = async () => {
    try {
      // const prompt = getValues(`${fieldName}.${fieldIndex}.prompt`);
      // const url = getValues(`${fieldName}.${fieldIndex}.url`);
      // const generateData = {
      //   url: url,
      //   prompt_topic_id: prompt,
      // };
      // const resGenerateContent =
      //   await topicService.createContentTopicAi(generateData);
      // console.log('resGenerateContent:', resGenerateContent);
      // const { content_opening, content_body, content_conclusion, groups } =
      //   resGenerateContent.data;
      const fakeGroups = [
        {
          answers: ['answers 1'],
          content: 'question 1',
        },
      ];
      setValue(`${fieldName}.${fieldIndex}.content_opening_ai`, '123');
      setValue(`${fieldName}.${fieldIndex}.content_body_ai`, '456');
      setValue(`${fieldName}.${fieldIndex}.content_conclusion_ai`, '789');
      const currentAnswerGroup = getValues(`answerGroup`);
      const generateAnswerGroup: any[] = [];
      (fakeGroups || []).forEach((group: any, idx: number) => {
        const answersContent = group.answers.map((answer: any) => ({
          answerContent: answer,
        }));
        generateAnswerGroup.push({
          content: group.content,
          layout: 'FLEXIBLE',
          priority: '3',
          answerVideo: answersContent,
        });
        setValue(`answerGroup`, [
          ...currentAnswerGroup,
          ...generateAnswerGroup,
        ]);
      });
      setCreated(true);
    } catch (error) {
      console.log('error:', error);
    }
  };

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
            options={promptOptions}
          />
        </BaseCol>
        <BaseCol xs={24} lg={12}>
          <ReactSelectField
            name={`${fieldName}.${fieldIndex}.category`}
            label="Categories"
          />
        </BaseCol>
      </BaseRow>
      {!created && (
        <div className="mt-4 mb-2">
          <BaseButton
            htmlType="button"
            type="primary"
            onClick={generateTopicContent}
            disabled={!watchedUrl && !watchedPrompt}
            loading={loading}
            style={{ minWidth: 218 }}
          >
            Create
          </BaseButton>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <BaseTypography.Text strong>RESULT</BaseTypography.Text>
        <BaseButton
          htmlType="button"
          type="link"
          icon={<ReloadOutlined />}
          loading={loading}
        >
          Recreate
        </BaseButton>
      </div>
      <div className="bg-[#F4F4F4] rounded-lg p-4">
        <div>Opening*</div>
        <TextField
          name={`${fieldName}.${fieldIndex}.content_opening_ai`}
          disabled
          textArea
        />
        <div className="mt-2">Main content*</div>
        <TextField
          name={`${fieldName}.${fieldIndex}.content_body_ai`}
          disabled
          textArea
        />
        <div className="mt-2">Conclusion*</div>
        <TextField
          name={`${fieldName}.${fieldIndex}.content_conclusion_ai`}
          disabled
          textArea
        />
      </div>
    </div>
  );
};
