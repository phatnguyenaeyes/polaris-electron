import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { notificationController } from '@app/controllers/notificationController';
import { topicService } from '@app/services/topic.service';
import { topicGroupService } from '@app/services/topicGroup.service';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import SelectField from '@app/components/formControl/SelectField';
import { useTranslation } from 'react-i18next';
import RadioGroupField from '@app/components/formControl/RadioGroupField';
import LibraryContentField from './components/LibraryContentField';
import QuestionAndAnswerField from './components/QuestionAndAnswerField';

interface CreateTemplateFormInterface {
  topicName: string;
  videoLayout: string;
  videoContentLayout: string;
  videoEndLayout: string;
  libraryContent: any[];
  videoLoopOption: string;
  type: string;
  chart_symbol: string;
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

const AnswerLibraryCreatePage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingUploadArray, setLoadingUploadArray] = useState(false);
  const navigate = useNavigate();

  const createFormSchema = yup.object().shape({
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

              // errorBgFieldIdxs.forEach((eBgIdx) => {
              //   const convertIdx = `${eBgIdx}`;
              //   const fieldPath = `${this.path}[0].background`;
              //   console.log('fieldPath:', fieldPath);
              //   return this.createError({
              //     path: fieldPath,
              //     message: 'Please choose background',
              //   });
              // });
              // return this.createError({ path: `${this.path}[0].background`, message: 'Please choose background' });
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
                video: yup.array().nullable(),
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

  const createFormMethods = useForm<CreateTemplateFormInterface>({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      type: 'chart',
      videoLayout: 'layout1',
      videoContentLayout: 'layout1',
      videoEndLayout: 'layout2',
      contentTopic: [
        {
          video_opening: '',
          content_opening: '',
          layout: 'layout-1',
          background: '',
        },
      ],
      answerGroup: [
        {
          priority: '1',
          content: 'content1',
          answerVideo: [
            {
              video: '',
              answerContent: '',
              videoLayout: 'layout-2',
            },
          ],
        },
      ],
    },
  });

  const onCreateSubmitForm = async (values: CreateTemplateFormInterface) => {
    try {
      console.log('create form values:', values);
      setLoading(true);
      const { topicName, link_chart, contentTopic, answerGroup } = values;
      const createData = {
        name: topicName,
        ...(link_chart && {
          link_chart: link_chart,
        }),
      };
      const createTopicRes = await topicService.create(createData);
      (async function loop() {
        setLoadingUploadArray(true);
        // Content topic
        if (contentTopic && contentTopic?.length > 0) {
          const contentTopicLenght = contentTopic?.length || 0;
          for (let index = 0; index < contentTopicLenght; index++) {
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
            } = contentTopic[index];
            contentTopicFormData.append('topic_id', createTopicRes?._id);
            if (video_opening?.length > 0) {
              contentTopicFormData.append(
                'video_opening',
                video_opening[0].originFileObj,
              );
            }
            contentTopicFormData.append('content_opening', content_opening);
            if (video_body?.length > 0) {
              contentTopicFormData.append(
                'video_body',
                video_body[0].originFileObj,
              );
            }
            contentTopicFormData.append('content_body', content_body);
            if (video_conclusion?.length > 0) {
              contentTopicFormData.append(
                'video_conclusion',
                video_conclusion[0].originFileObj,
              );
            }
            contentTopicFormData.append(
              'content_conclusion',
              content_conclusion,
            );
            contentTopicFormData.append('layout', layout as string);
            if (background && background?.length > 0) {
              contentTopicFormData.append(
                'background',
                background[0]?.originFileObj,
              );
            }
            await topicService.createContentTopic(contentTopicFormData);
          }
          notificationController.success({
            message: 'Update successfully',
          });
        }
        // Content group anwser
        if (answerGroup && answerGroup.length > 0) {
          for (let index = 0; index < answerGroup.length; index++) {
            const groupFormData = new FormData();
            const { priority, content, keywords, answerVideo } =
              answerGroup[index];
            groupFormData.append('topic_id', createTopicRes?._id);
            groupFormData.append('group_content', content);
            groupFormData.append('priority', priority);
            (keywords || []).map((kw: string) => {
              groupFormData.append('keywords[]', kw);
            });
            answerVideo.forEach(async (av, idx: number) => {
              if (av.video?.length > 0) {
                groupFormData.append(
                  `answer_video_${idx + 1}`,
                  av.video[0].originFileObj,
                );
              }
              groupFormData.append(`answer_layout_${idx + 1}`, av.videoLayout);
              groupFormData.append(
                `answer_content_${idx + 1}`,
                av.answerContent,
              );
            });
            await topicGroupService.create(groupFormData);
          }
          notificationController.success({
            message: 'Update successfully',
          });
          setLoadingUploadArray(false);
        }
      })();

      setLoading(false);
      notificationController.success({ message: 'Tạo chủ đề thành công' });
      navigate('/answer-library');
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  console.log(
    'createFormMethods.formState.errors:',
    createFormMethods.formState.errors,
  );

  return (
    <>
      <PageTitle>{`${t('POLARIS.ADD_TOPIC')}`}</PageTitle>
      <BaseFormTitle>{`${t('POLARIS.ADD_TOPIC')}`}</BaseFormTitle>
      <CreateTemplate
        saveButtonProps={{ loading: loading || loadingUploadArray }}
      >
        <FormProvider {...createFormMethods}>
          <CreateTemplate.Form
            onSubmit={createFormMethods.handleSubmit(onCreateSubmitForm)}
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
                  <LibraryContentField fieldName="contentTopic" />
                </div>
              </BaseTabs.TabPane>
              <BaseTabs.TabPane tab={`${t('POLARIS.Q&A')}`} key="2">
                <QuestionAndAnswerField fieldName="answerGroup" />
              </BaseTabs.TabPane>
            </BaseTabs>
          </CreateTemplate.Form>
        </FormProvider>
      </CreateTemplate>
    </>
  );
};

export default AnswerLibraryCreatePage;
