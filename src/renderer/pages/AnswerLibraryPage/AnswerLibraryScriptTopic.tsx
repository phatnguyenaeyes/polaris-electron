import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { notificationController } from '@app/controllers/notificationController';
import { topicService } from '@app/services/topic.service';
import { topicGroupService } from '@app/services/topicGroup.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import AnswerGroupField from './components/AnswerGroupField';
import VideoLoopField from './components/VideoContentField';
import VideoStartField from './components/VideoStartField';
import VideoContentField from './components/VideoContentField';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import LibraryContentField from './components/LibraryContentField';
import QuestionAndAnswerField from './components/QuestionAndAnswerField';
import { scriptService } from '@app/services/script.service';
import { useTranslation } from 'react-i18next';
import SelectField from '@app/components/formControl/SelectField';
import RadioGroupField from '@app/components/formControl/RadioGroupField';

const DEFAULT_LAYOUT = 'layout-1';

interface EditTemplateFormInterface {
  topicName: string;
  videoLayout: string;
  videoContentLayout: string;
  videoEndLayout: string;
  libraryContent: any[];
  link_chart: string;
  videoLoopOption: string;
  type?: string;
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

const AnswerLibraryScriptTopicPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug, scriptId } = useParams();
  console.log('slug:', slug);
  console.log('scriptId:', scriptId);
  const navigate = useNavigate();
  const [deletedContentTopic, setDeletedContentTopic] = useState<string[]>([]);
  const [deletedGroups, setDeletedGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [topicId, setTopicId] = useState<string>();

  const editFormSchema = yup.object().shape({
    topicName: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    // type: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    link_chart: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    contentTopic: yup
      .array()
      .of(
        yup.object().shape({
          video_opening: yup
            .array()
            .nullable()
            .when('layout', (layout, schema) => {
              if (layout === 'layout-1') {
                return schema
                  .min(1, 'Tối thiểu 1')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'));
              }
              return schema;
            }),
          content_opening: yup.string().when('layout', (layout, schema) => {
            if (layout === 'layout-2') {
              return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
            }
            return schema;
          }),
          video_body: yup
            .array()
            .nullable()
            .when('layout', (layout, schema) => {
              if (layout === 'layout-1') {
                return schema
                  .min(1, 'Tối thiểu 1')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'));
              }
              return schema;
            }),
          content_body: yup.string().when('layout', (layout, schema) => {
            if (layout === 'layout-2') {
              return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
            }
            return schema;
          }),
          video_conclusion: yup
            .array()
            .nullable()
            .when('layout', (layout, schema) => {
              if (layout === 'layout-1') {
                return schema
                  .min(1, 'Tối thiểu 1')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'));
              }
              return schema;
            }),
          content_conclusion: yup.string().when('layout', (layout, schema) => {
            if (layout === 'layout-2') {
              return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
            }
            return schema;
          }),
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
    // answerGroup: yup
    //   .array()
    //   .of(
    //     yup.object().shape({
    //       _id: yup.string().nullable().notRequired(),
    //       priority: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    //       content: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    //       keywords: yup
    //         .array()
    //         .min(1, 'Tối thiểu 1')
    //         .required(t('POLARIS.REQUIRED_ERROR_MSG'))
    //         .nullable(),
    //       answerVideo: yup
    //         .array()
    //         .of(
    //           yup.object().shape({
    //             video: yup
    //               .array()
    //               .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
    //               .required(t('POLARIS.REQUIRED_ERROR_MSG'))
    //               .nullable(),
    //             videoLayout: yup
    //               .string()
    //               .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    //             answerContent: yup
    //               .string()
    //               .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    //           }),
    //         )
    //         .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
    //         .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    //     }),
    //   )
    //   .min(1, 'Tối thiểu 1')
    //   .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const editFormMethods = useForm<EditTemplateFormInterface>({
    resolver: yupResolver(editFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    async function fetchScriptDetail(_slug: string, _scriptId: string) {
      try {
        setLoading(true);
        const detailResponse = await scriptService.scripFromTopictDetail(
          _scriptId,
          _slug,
        );
        const {
          _id,
          link_chart,
          type,
          name,
          contentTopics: contentTopicsRes,
          groups: groupsRes,
        } = detailResponse;
        setTopicId(_id);
        const contentTopic = (contentTopicsRes || []).map((ct: any) => {
          const {
            video_opening, // video path
            content_opening,
            video_body, // video path
            content_body,
            video_conclusion, // video path
            content_conclusion,
            layout,
            background,
            vBee_audio_body,
            vBee_audio_conclusion,
            vBee_audio_opening,
          } = ct;

          return {
            _id: ct._id,
            ...(video_opening?.length > 0 && {
              video_opening: [
                {
                  uid: '1',
                  name: video_opening[0],
                  originPath: `${video_opening[0]}`,
                  videoPath: `${S3_DOMAIN_URL}/${slug}/${video_opening[0]}`,
                },
              ],
            }),
            content_opening,
            ...(video_body?.length > 0 && {
              video_body: [
                {
                  uid: '1',
                  name: video_body[0],
                  originPath: `${video_body[0]}`,
                  videoPath: `${S3_DOMAIN_URL}/${slug}/${video_body[0]}`,
                },
              ],
            }),
            content_body,
            ...(video_conclusion?.length > 0 && {
              video_conclusion: [
                {
                  uid: '1',
                  name: video_conclusion[0],
                  originPath: `${video_conclusion[0]}`,
                  videoPath: `${S3_DOMAIN_URL}/${slug}/${video_conclusion[0]}`,
                },
              ],
            }),
            content_conclusion,
            ...(background?.length > 0 && {
              background: [
                {
                  uid: '1',
                  name: background[0],
                  originPath: `${background[0]}`,
                  url: `${S3_DOMAIN_URL}/${slug}/${background[0]}`,
                },
              ],
            }),
            layout,
            vBee_audio_body,
            vBee_audio_conclusion,
            vBee_audio_opening,
          };
        });
        const answerGroup = (groupsRes || []).map((group: any) => {
          const keywords = group.keywords || [];
          const slugTopic = group.slug_topic;
          return {
            _id: group._id,
            content: group.content,
            keywords: keywords,
            priority: `${group.priority || 1}`,
            answerVideo:
              group?.answers?.length > 0
                ? (group.answers || []).map((answer: any, idx: number) => ({
                    videoLayout: answer.layout || DEFAULT_LAYOUT,
                    answerContent: answer.answer_content,
                    ...(answer.video
                      ? {
                          video: [
                            {
                              uid: idx,
                              name: answer.video[0],
                              // url: `${S3_DOMAIN_URL}/${slug}/answers/${videoPath}`,
                              originPath: `${answer.video[0]}`,
                              videoPath: `${S3_DOMAIN_URL}/${slugTopic}/${answer.video[0]}`,
                            },
                          ],
                        }
                      : {}),
                  }))
                : [
                    {
                      videoLayout: 'layout-1',
                    },
                  ],
          };
        });

        const mappingDetail = {
          topicName: name,
          type,
          link_chart: link_chart || '',
          contentTopic,
          answerGroup,
        };

        type FormKey = keyof typeof mappingDetail;
        Object.keys(mappingDetail).map((key) => {
          const fieldKey: FormKey = `${key}` as FormKey;
          editFormMethods.setValue(fieldKey as any, mappingDetail[fieldKey]);
        });
      } catch (error) {
        console.log('error:', error);
      } finally {
        setLoading(false);
      }
    }
    if (slug && scriptId) {
      fetchScriptDetail(slug, scriptId);
    }
  }, [slug, scriptId]);

  const onEditSubmitForm = async (values: EditTemplateFormInterface) => {
    try {
      console.log('create form values:', values);
      setLoading(true);
      const { topicName, type, link_chart, contentTopic, answerGroup } = values;

      const createTopicRes = await topicService.create({
        name: topicName,
        type,
        ...(link_chart && {
          link_chart: link_chart,
        }),
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
        } = ct;
        console.log('createTopicRes:', createTopicRes);
        console.log('createTopicRes?._id:', createTopicRes?._id);
        contentTopicFormData.append('topic_id', createTopicRes?._id);
        contentTopicFormData.append(
          'video_opening',
          video_opening[0]?.originFileObj,
        );
        contentTopicFormData.append('content_opening', content_opening);

        contentTopicFormData.append('video_body', video_body[0]?.originFileObj);
        contentTopicFormData.append('content_body', content_body);

        contentTopicFormData.append(
          'video_conclusion',
          video_conclusion[0]?.originFileObj,
        );
        contentTopicFormData.append('content_conclusion', content_conclusion);

        contentTopicFormData.append('layout', layout);
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
            av.video[0]?.originFileObj,
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
                      <SelectField
                        required
                        label={t('POLARIS.CHART')}
                        placeholder={`${t('POLARIS.SELECT_CHART_PLACEHOLDER')}`}
                        name="link_chart"
                        options={[
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
                </div>
                {/* <RadioGroupField
                  name={`type`}
                  label="Select topic type"
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
                /> */}
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

export default AnswerLibraryScriptTopicPage;
