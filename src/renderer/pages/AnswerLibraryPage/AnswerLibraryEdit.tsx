import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { notificationController } from '@app/controllers/notificationController';
import { topicService } from '@app/services/topic.service';
import { topicGroupService } from '@app/services/topicGroup.service';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import * as yup from 'yup';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import LibraryContentField from './components/LibraryContentField';
import QuestionAndAnswerField from './components/QuestionAndAnswerField';
import { useTranslation } from 'react-i18next';
import { TopicInfoField } from './components/TopicInfoField';

interface EditTemplateFormInterface {
  topicName: string;
  videoLayout: string;
  videoContentLayout: string;
  videoEndLayout: string;
  libraryContent: any[];
  link_chart: string;
  chart_symbol: string;
  type?: string;
  videoLoopOption: string;
  contentTopic?: {
    _id: string;
    video_opening: any;
    content_opening: string;

    video_body: any;
    content_body: string;

    video_conclusion: any;
    content_conclusion: string;

    layout?: string;
    background?: any;
    chart_symbol?: string;
    link_chart?: string;
    type?: string;
  }[];
  answerGroup?: {
    _id: string;
    priority: string;
    content: string;
    keywords: string[];
    layout: string;
    answerVideo: {
      video: any;
      videoLayout: string;
      answerContent: string;
    }[];
  }[];
}

const AnswerLibraryEditPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [deletedContentTopic, setDeletedContentTopic] = useState<string[]>([]);
  const [deletedGroups, setDeletedGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUploadArray, setLoadingUploadArray] = useState(false);
  const [topicId, setTopicId] = useState<string>();
  const navigate = useNavigate();

  const editFormSchema = yup.object().shape({
    topicName: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    type: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    chart_symbol: yup.string().when('layout', (layout, schema) => {
      if (layout === 'layout-2') {
        return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
      }
      return schema.nullable().notRequired();
    }),
    contentTopic: yup
      .array()
      .of(
        yup.object().shape({
          type: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          url: yup.string().when('type', (type, schema) => {
            if (type === 'ai') {
              return schema
                .required(t('POLARIS.REQUIRED_ERROR_MSG'))
                .matches(
                  /^(https?):\/\/[^\s$.?#].[^\s]*$/,
                  'Please enter valid url',
                );
            }
            return schema.notRequired();
          }),
          prompt: yup.string().when('type', (type, schema) => {
            if (type === 'ai') {
              return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
            }
            return schema.notRequired();
          }),
          video_opening: yup
            .array()
            .nullable()
            .when('layout', (layout, schema) => {
              if (layout === 'FIXED') {
                return schema
                  .min(1, 'Tối thiểu 1')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'));
              }
              return schema;
            }),
          content_opening: yup.string().when('layout', (layout, schema) => {
            if (layout === 'FLEXIBLE') {
              return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
            }
            return schema;
          }),
          video_body: yup
            .array()
            .nullable()
            .when('layout', (layout, schema) => {
              if (layout === 'FIXED') {
                return schema
                  .min(1, 'Tối thiểu 1')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'));
              }
              return schema;
            }),
          content_body: yup.string().when('layout', (layout, schema) => {
            if (layout === 'FLEXIBLE') {
              return schema.required(t('POLARIS.REQUIRED_ERROR_MSG'));
            }
            return schema;
          }),
          video_conclusion: yup
            .array()
            .nullable()
            .when('layout', (layout, schema) => {
              if (layout === 'FIXED') {
                return schema
                  .min(1, 'Tối thiểu 1')
                  .required(t('POLARIS.REQUIRED_ERROR_MSG'));
              }
              return schema;
            }),
          content_conclusion: yup.string().when('layout', (layout, schema) => {
            if (layout === 'FLEXIBLE') {
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
          answerVideo: yup
            .array()
            .of(
              yup.object().shape({
                video: yup.array(),
                // .test(
                //   'requireVideo',
                //   'Please choose video.',
                //   function validateBg(currentValue) {
                //     console.log('this.path:', this.path);
                //     console.log('this:', this);

                //     if (
                //       this.parent.layout === 'FIXED' &&
                //       (!currentValue ||
                //         (currentValue && !currentValue.length))
                //     ) {
                //       return this.createError({
                //         path: `${this.path}`,
                //         message: 'Please choose video',
                //       });
                //     }
                //     return true;
                //   },
                // ),
                answerContent: yup
                  .string()
                  .required(t('POLARIS.REQUIRED_ERROR_MSG')),
              }),
            )
            .test(
              'requireVideo',
              'Please choose video.',
              function validateBg(currentAnswers) {
                const errorVideoIdxs = [];
                if (
                  this.parent.layout === 'FIXED' &&
                  currentAnswers &&
                  currentAnswers?.length > 0
                ) {
                  for (let i = 0; i < currentAnswers.length; i++) {
                    if (
                      !currentAnswers[i].video ||
                      currentAnswers[i].video?.length === 0
                    ) {
                      errorVideoIdxs.push(i);
                    }
                  }
                  if (errorVideoIdxs.length > 0) {
                    return this.createError({
                      path: `${this.path}`,
                      message: 'Please choose video.',
                    });
                  }
                }
                return true;
              },
            )
            .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
            .required(t('POLARIS.REQUIRED_ERROR_MSG')),
        }),
      )
      .min(1, 'Tối thiểu 1')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<EditTemplateFormInterface>({
    resolver: yupResolver(editFormSchema),
    defaultValues: {},
  });

  useEffect(() => {
    async function fetchTopicDetail(_slug: string) {
      try {
        setLoading(true);
        const detailResponse = await topicService.getBySlug(_slug);
        const {
          _id,
          chart_symbol,
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
            content_name,
            type: contentTopicType,
          } = ct;
          return {
            _id: ct._id,
            type: contentTopicType || 'manual',
            content_name: content_name || '',
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
            content_conclusion,
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
            content: group.question,
            keywords: keywords,
            priority: `${group.priority || 1}`,
            layout: `${group.group_content_type || 'FIXED'}`,
            answerVideo: group.answers.map((answer: any, idx: number) => ({
              answerContent: answer.answer_content,
              ...(answer?.video?.length > 0 && {
                video: [
                  {
                    uid: idx,
                    name: answer.video[0],
                    // url: `${S3_DOMAIN_URL}/${slug}/answers/${videoPath}`,
                    originPath: `${answer.video[0]}`,
                    videoPath: `${S3_DOMAIN_URL}/${slugTopic}/${answer.video[0]}`,
                  },
                ],
              }),
            })),
          };
        });

        const mappingDetail = {
          topicName: name,
          chart_symbol,
          type,
          contentTopic:
            contentTopic && contentTopic?.length > 0
              ? contentTopic
              : [
                  {
                    type: 'manual',
                    layout: 'layout-1',
                  },
                ],
          answerGroup:
            answerGroup && answerGroup?.length > 0
              ? answerGroup
              : [
                  {
                    priority: '1',
                    layout: 'layout-1',
                  },
                ],
        };

        type FormKey = keyof typeof mappingDetail;
        Object.keys(mappingDetail).map((key) => {
          const fieldKey: FormKey = `${key}` as FormKey;
          formMethods.setValue(fieldKey as any, mappingDetail[fieldKey]);
        });
      } catch (error) {
      } finally {
        setLoading(false);
      }
    }
    if (slug) {
      fetchTopicDetail(slug);
    }
  }, [slug]);

  async function handleDeleteContentTopics(topicIds: string[]) {
    try {
      const promiseListDeleteTopics = topicIds.map(async (tId) => {
        return await topicService.deleteContentTopic(tId);
      });
      await Promise.all(promiseListDeleteTopics);
    } catch (error) {
      console.log('error:', error);
    }
  }

  async function handleDeleteGroupIds(groupIds: string[]) {
    try {
      const promiseListDeleteTopics = groupIds.map(async (gId) => {
        return await topicGroupService.deleteTopicGroup(gId);
      });
      await Promise.all(promiseListDeleteTopics);
    } catch (error) {
      console.log('error:', error);
    }
  }

  const onEditSubmitForm = async (values: EditTemplateFormInterface) => {
    try {
      console.log('edit form values:', values);
      setLoading(true);
      const { topicName, type, chart_symbol, contentTopic, answerGroup } =
        values;
      // Update topic
      if (topicId) {
        await topicService.update(topicId, {
          name: topicName,
          type,
          ...(chart_symbol && {
            chart_symbol: chart_symbol,
          }),
        });
        // Delete content topic ids
        if (deletedContentTopic.length > 0) {
          handleDeleteContentTopics(deletedContentTopic);
        }
        // Delete group ids
        if (deletedGroups.length > 0) {
          handleDeleteGroupIds(deletedGroups);
        }

        (async function loop() {
          setLoadingUploadArray(true);

          if (contentTopic && contentTopic?.length > 0) {
            const contentTopicLength = contentTopic?.length || 0;
            const contentErr = [];
            const contentSuccess = [];
            for (let index = 0; index < contentTopicLength; index++) {
              const contentTopicFormData = new FormData();
              const {
                _id,
                video_opening,
                content_opening,
                video_body,
                content_body,
                video_conclusion,
                content_conclusion,
                layout,
                background,
              } = contentTopic[index];

              contentTopicFormData.append('topic_id', topicId);
              if (video_opening?.[0]?.originFileObj) {
                contentTopicFormData.append(
                  'video_opening',
                  video_opening[0]?.originFileObj,
                );
              }
              contentTopicFormData.append('content_opening', content_opening);

              if (video_body?.[0]?.originFileObj) {
                contentTopicFormData.append(
                  'video_body',
                  video_body[0]?.originFileObj,
                );
              }
              contentTopicFormData.append('content_body', content_body);

              if (video_conclusion?.[0]?.originFileObj) {
                contentTopicFormData.append(
                  'video_conclusion',
                  video_conclusion[0]?.originFileObj,
                );
              }
              contentTopicFormData.append(
                'content_conclusion',
                content_conclusion,
              );
              contentTopicFormData.append(
                'group_content_type',
                layout as string,
              );
              if (background?.[0]?.originFileObj) {
                contentTopicFormData.append(
                  'background',
                  background[0]?.originFileObj,
                );
              }
              try {
                if (_id) {
                  await topicService.updateContentTopic(
                    _id,
                    contentTopicFormData,
                  );
                } else {
                  await topicService.createContentTopic(contentTopicFormData);
                }
                contentSuccess.push(
                  `Success to update topic content ${index + 1}!`,
                );
              } catch (error) {
                contentErr.push(`Fail to update topic content ${index + 1}!`);
              } finally {
                if (index === contentTopic.length - 1) {
                  contentSuccess.length > 0 &&
                    notificationController.success({
                      message: 'SUCCESS',
                      description: (
                        <div className="flex f">
                          {contentSuccess.map((success, idx) => (
                            <p key={idx}>{success}</p>
                          ))}
                        </div>
                      ),
                    });
                  contentErr.length > 0 &&
                    notificationController.error({
                      message: 'ERROR',
                      description: (
                        <div className="flex flex-col">
                          {contentErr.map((err, idx) => (
                            <p key={idx}>{err}ll</p>
                          ))}
                        </div>
                      ),
                    });
                }
              }
            }
          }

          if (answerGroup && answerGroup.length > 0) {
            const answerErr = [];
            const answerSuccess = [];
            for (let index = 0; index < answerGroup.length; index++) {
              const groupFormData = new FormData();
              const { _id, priority, content, layout, keywords, answerVideo } =
                answerGroup[index];
              groupFormData.append('topic_id', topicId);
              groupFormData.append('question', content);
              groupFormData.append('priority', priority);
              groupFormData.append('group_content_type', layout);
              (keywords || []).map((kw: string) => {
                groupFormData.append('keywords[]', kw);
              });
              answerVideo.forEach(async (av, idx: number) => {
                if (av.video?.[0]?.originFileObj) {
                  groupFormData.append(
                    `answer_video_${idx + 1}`,
                    av.video[0]?.originFileObj,
                  );
                }
                groupFormData.append(
                  `answer_content_${idx + 1}`,
                  av.answerContent,
                );
              });
              try {
                if (_id) {
                  await topicGroupService.update(_id, groupFormData);
                } else {
                  await topicGroupService.create(groupFormData);
                }
                answerSuccess.push(
                  `Success to update answer group ${index + 1}!!`,
                );
              } catch (error) {
                answerErr.push(`Fail to update answer group ${index + 1}!!`);
              } finally {
                if (index === answerGroup.length - 1) {
                  answerSuccess.length > 0 &&
                    notificationController.success({
                      message: 'SUCCESS',
                      description: (
                        <div className="flex flex-col">
                          {answerSuccess.map((success, idx) => (
                            <p key={idx}>{success}</p>
                          ))}
                        </div>
                      ),
                    });
                  answerErr.length > 0 &&
                    notificationController.error({
                      message: 'ERROR',
                      description: (
                        <div className="flex flex-col">
                          {answerErr.map((err, idx) => (
                            <p key={idx}>{err}</p>
                          ))}
                        </div>
                      ),
                    });
                }
              }
            }

            setLoadingUploadArray(false);
          }
        })();
      }
    } catch (error) {
      notificationController.error({
        message: 'Something wrong!!',
      });
    } finally {
      setLoading(false);
    }
  };

  console.log('formMethods.formState.errors:', formMethods.formState.errors);

  return (
    <>
      <PageTitle>{`${t('POLARIS.EDIT_ANSWER')}`}</PageTitle>
      <BaseFormTitle>{`${t('POLARIS.EDIT_ANSWER')}`}</BaseFormTitle>
      <EditTemplate
        showCancel
        onCancel={() => navigate('/answer-library')}
        saveButtonProps={{ loading: loading || loadingUploadArray }}
      >
        <FormProvider {...formMethods}>
          <EditTemplate.Form
            onSubmit={formMethods.handleSubmit(onEditSubmitForm)}
          >
            <TopicInfoField />
            <BaseTabs>
              <BaseTabs.TabPane tab={`${t('POLARIS.INFORMATION')}`} key="1">
                <div className="bg-white p-4 mb-4">
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

export default AnswerLibraryEditPage;
