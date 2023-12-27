import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { notificationController } from '@app/controllers/notificationController';
import { topicService } from '@app/services/topic.service';
import { topicGroupService } from '@app/services/topicGroup.service';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import LibraryContentField from './components/LibraryContentField';
import QuestionAndAnswerField from './components/QuestionAndAnswerField';
import { scriptService } from '@app/services/script.service';
import { useTranslation } from 'react-i18next';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import SelectField from '@app/components/formControl/SelectField';

const DEFAULT_LAYOUT = 'layout-1';

interface EditTemplateFormInterface {
  topicName: string;
  videoLayout: string;
  videoContentLayout: string;
  videoEndLayout: string;
  libraryContent: any[];
  videoLoopOption: string;
  type: string;
  link_chart: string;
  contentTopic?: {
    _id: string;
    video_opening: any;
    content_opening: string;

    video_body: any;
    content_body: string;

    video_conclusion: any;
    content_conclusion: string;

    layout: string;
    background?: any;
    chart_symbol?: string;
  }[];
  answerGroup?: {
    _id: string;
    priority: string;
    content: string;
    keywords: string[];
    answerVideo: {
      video: any;
      videoLayout: string;
      answerContent: string;
    }[];
  }[];
}

const AnswerLibraryScriptPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const navigate = useNavigate();
  const [deletedContentTopic, setDeletedContentTopic] = useState<string[]>([]);
  const [deletedGroups, setDeletedGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [topicId, setTopicId] = useState<string>();

  const editFormSchema = yup.object().shape({
    topicName: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    type: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    link_chart: yup.string().when('type', {
      is: (layout: string) => layout === 'chart',
      then: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
      otherwise: yup.string().notRequired(),
    }),
    contentTopic: yup
      .array()
      .of(
        yup.object().shape({
          _id: yup.string().nullable().notRequired(),
          video_opening: yup.array().nullable(),
          content_opening: yup
            .string()
            .required(t('POLARIS.REQUIRED_ERROR_MSG')),
          video_body: yup.array().nullable(),
          content_body: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          video_conclusion: yup.array().nullable(),
          content_conclusion: yup
            .string()
            .required(t('POLARIS.REQUIRED_ERROR_MSG')),
          layout: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          background: yup.array().nullable(),
        }),
      )
      .test(
        'shouldRequireContentBg',
        'Topic content background should be set.',
        function validateTopicContentBg(currentTopicContent) {
          const errorBgFieldIdxs = [];
          if (this.parent?.type === 'image') {
            if (currentTopicContent && currentTopicContent?.length > 0) {
              for (let i = 0; i < currentTopicContent.length; i++) {
                if (
                  !currentTopicContent[i].background ||
                  currentTopicContent[i].background?.length === 0
                ) {
                  errorBgFieldIdxs.push(i);
                }
              }
              if (errorBgFieldIdxs.length > 0) {
                return this.createError({
                  path: `${this.path}`,
                  message: 'Please choose background',
                });
              }
            }
          }

          return true;
        },
      )
      .min(1, 'Tối thiểu 1')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    answerGroup: yup
      .array()
      .of(
        yup.object().shape({
          _id: yup.string().nullable().notRequired(),
          priority: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          content: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          keywords: yup
            .array()
            .min(1, 'Tối thiểu 1')
            .required(t('POLARIS.REQUIRED_ERROR_MSG'))
            .nullable(),
          answerVideo: yup
            .array()
            .of(
              yup.object().shape({
                video: yup
                  .array()
                  .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'))
                  .nullable(),
                videoLayout: yup
                  .string()
                  .required(t('POLARIS.REQUIRED_ERROR_MSG')),
                answerContent: yup
                  .string()
                  .required(t('POLARIS.REQUIRED_ERROR_MSG')),
              }),
            )
            .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
            .required(t('POLARIS.REQUIRED_ERROR_MSG')),
        }),
      )
      .min(1, 'Tối thiểu 1')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const editFormMethods = useForm<EditTemplateFormInterface>({
    resolver: yupResolver(editFormSchema),
    defaultValues: {
      type: 'chart',
    },
  });

  useEffect(() => {
    async function fetchScriptDetail(_slug: string) {
      try {
        setLoading(true);
        const detailResponse = await scriptService.scriptDetail(_slug);
        const { contentTopics: contentTopicsRes, groups: groupsRes } =
          detailResponse;
        const contentTopic = (contentTopicsRes || []).map((ct: any) => {
          const { content_opening, content_body, content_conclusion, layout } =
            ct;
          return {
            content_opening: content_opening || '',
            content_body: content_body || '',
            content_conclusion: content_conclusion || '',
            layout: layout || DEFAULT_LAYOUT,
          };
        });
        const answerGroup = (groupsRes || []).map((group: any) => {
          return {
            content: group.answer_content,
            keywords: [],
            priority: `1`,
            answerVideo: [
              {
                videoLayout: DEFAULT_LAYOUT,
                answerContent: '',
              },
            ],
          };
        });

        const mappingDetail = {
          contentTopic,
          answerGroup,
        };

        type FormKey = keyof typeof mappingDetail;
        Object.keys(mappingDetail).map((key) => {
          const fieldKey: FormKey = `${key}` as FormKey;
          editFormMethods.setValue(fieldKey as any, mappingDetail[fieldKey]);
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchScriptDetail(slug);
    }
  }, [slug]);

  const onEditSubmitForm = async (values: EditTemplateFormInterface) => {
    try {
      console.log('create form values:', values);
      setLoading(true);
      const { topicName, contentTopic, answerGroup } = values;

      const createTopicRes = await topicService.create({
        name: topicName,
      });
      // Content topic
      const promiseListContentTopic = (contentTopic || []).map(async (ct) => {
        const contentTopicFormData = new FormData();
        const {
          video_opening,
          content_opening,
          video_body,
          content_body,
          video_conclusion,
          content_conclusion,
          layout,
          background,
          chart_symbol,
        } = ct;
        contentTopicFormData.append('topic_id', createTopicRes?._id);
        contentTopicFormData.append(
          'video_opening',
          video_opening[0].originFileObj,
        );
        contentTopicFormData.append('content_opening', content_opening);

        contentTopicFormData.append('video_body', video_body[0].originFileObj);
        contentTopicFormData.append('content_body', content_body);

        contentTopicFormData.append(
          'video_conclusion',
          video_conclusion[0].originFileObj,
        );
        contentTopicFormData.append('content_conclusion', content_conclusion);

        contentTopicFormData.append('layout', layout);
        if (background && background?.length > 0) {
          contentTopicFormData.append(
            'background',
            background[0]?.originFileObj,
          );
        }
        return await topicService.createContentTopic(contentTopicFormData);
      });

      await Promise.all(promiseListContentTopic);
      // Content group anwser
      const promiseList = (answerGroup || []).map(async (ag) => {
        const groupFormData = new FormData();
        const { priority, content, keywords, answerVideo } = ag;
        groupFormData.append('topic_id', createTopicRes?._id);
        groupFormData.append('group_content', content);
        groupFormData.append('priority', priority);
        (keywords || []).map((kw: string) => {
          groupFormData.append('keywords[]', kw);
        });
        answerVideo.forEach(async (av, index: number) => {
          groupFormData.append(
            `answer_video_${index + 1}`,
            av.video[0].originFileObj,
          );
          groupFormData.append(`answer_layout_${index + 1}`, av.videoLayout);
          groupFormData.append(`answer_content_${index + 1}`, av.answerContent);
        });
        return await topicGroupService.create(groupFormData);
      });

      await Promise.all(promiseList);

      notificationController.success({ message: 'Tạo chủ đề thành công' });
      setLoading(false);
      navigate('/answer-library');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle>{`${t('POLARIS.ADD_TOPIC')}`}</PageTitle>
      <BaseFormTitle>{`${t('POLARIS.ADD_TOPIC')}`}</BaseFormTitle>
      <EditTemplate saveButtonProps={{ loading: loading }}>
        <FormProvider {...editFormMethods}>
          <EditTemplate.Form
            onSubmit={editFormMethods.handleSubmit(onEditSubmitForm)}
          >
            <BaseTabs>
              <BaseTabs.TabPane tab={`${t('POLARIS.INFORMATION')}`} key="1">
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
                    <SelectField
                      label={t('POLARIS.CHART')}
                      placeholder={`${t('POLARIS.SELECT_CHART_PLACEHOLDER')}`}
                      name="link_chart"
                      options={[
                        { label: 'Select chart symbol', value: '' },
                        { label: 'DXY', value: 'DXY' },
                        { label: 'XAUUSD', value: 'XAUUSD' },
                        { label: 'EURUSD', value: 'EURUSD' },
                        { label: 'GBPUSD', value: 'GBPUSD' },
                        { label: 'USDJPY', value: 'USDJPY' },
                        { label: 'USTEC', value: 'USTEC' },
                        { label: 'USOIL', value: 'USOIL' },
                        { label: 'BTCUSD', value: 'BTCUSD' },
                      ]}
                    />
                  </BaseCol>
                </BaseRow>
                <RadioGroupField
                  name={`type`}
                  label="Select topic type"
                  radioPerRow={2}
                  options={[
                    {
                      label: 'Chart',
                      value: 'chart',
                    },
                    {
                      label: 'Image',
                      value: 'image',
                    },
                  ]}
                />
                <div>
                  <LibraryContentField
                    fieldName="contentTopic"
                    onDelete={(contentTopicId) => {
                      setDeletedContentTopic((prevState) => [
                        ...prevState,
                        contentTopicId,
                      ]);
                    }}
                  />
                </div>
              </BaseTabs.TabPane>
              <BaseTabs.TabPane tab={`${t('POLARIS.Q&A')}`} key="2">
                <QuestionAndAnswerField
                  fieldName="answerGroup"
                  onDelete={(groupId) => {
                    setDeletedGroups((prevState) => [...prevState, groupId]);
                  }}
                />
              </BaseTabs.TabPane>
            </BaseTabs>
          </EditTemplate.Form>
        </FormProvider>
      </EditTemplate>
    </>
  );
};

export default AnswerLibraryScriptPage;
