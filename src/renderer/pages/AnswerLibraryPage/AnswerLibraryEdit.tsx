import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { notificationController } from '@app/controllers/notificationController';
import { topicService } from '@app/services/topic.service';
import { topicGroupService } from '@app/services/topicGroup.service';
import { yupResolver } from '@hookform/resolvers/yup';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { BaseTabs } from '@app/components/common/BaseTabs/BaseTabs';
import { BaseRow } from '@app/components/common/BaseRow/BaseRow';
import { BaseCol } from '@app/components/common/BaseCol/BaseCol';
import LibraryContentField from './components/LibraryContentField';
import QuestionAndAnswerField from './components/QuestionAndAnswerField';
import { useTranslation } from 'react-i18next';
import SelectField from '@app/components/formControl/SelectField';
import RadioGroupField from '@app/components/formControl/RadioGroupField';

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

    layout?: string;
    background?: string;
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

const AnswerLibraryEditPage: React.FC = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [deletedContentTopic, setDeletedContentTopic] = useState<string[]>([]);
  const [deletedGroups, setDeletedGroups] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingUploadArray, setLoadingUploadArray] = useState(false);
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
          _id: yup.string().nullable(),
          video_opening: yup.array().nullable(),
          content_opening: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          video_body: yup.array().nullable(),
          content_body: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          video_conclusion: yup.array().nullable(),
          content_conclusion: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          layout: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
          chart_symbol: yup.string().when('layout', {
            is: (layout: string) => layout === 'layout-1',
            then: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
            otherwise: yup.string().notRequired(),
          }),
          background: yup.array().when('layout', {
            is: (layout: string) => layout === 'layout-2',
            then: yup.array().min(1, 'Tối thiểu 1').required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
            otherwise: yup.array().nullable(),
          }),
        }),
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
          keywords: yup.array().min(1, 'Tối thiểu 1').required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
          answerVideo: yup
            .array()
            .of(
              yup.object().shape({
                video: yup.array().nullable(),
                videoLayout: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
                answerContent: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
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
    async function fetchTopicDetail(_slug: string) {
      try {
        setLoading(true);
        const detailResponse = await topicService.getBySlug(_slug);
        const { _id, slug, link_chart, name, contentTopics: contentTopicsRes, groups: groupsRes } = detailResponse;
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
            layout,
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
            answerVideo: group.answers.map((answer: any, idx: number) => ({
              videoLayout: answer.layout,
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
          link_chart,
          contentTopic:
            contentTopic && contentTopic?.length > 0
              ? contentTopic
              : [
                  {
                    content_opening: '',
                  },
                ],
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
      const { topicName, contentTopic, answerGroup } = values;
      // Update topic
      if (topicId) {
        await topicService.update(topicId, {
          name: topicName,
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
                chart_symbol,
              } = contentTopic[index];

              contentTopicFormData.append('topic_id', topicId);
              if (video_opening?.[0].originFileObj) {
                contentTopicFormData.append('video_opening', video_opening[0].originFileObj);
              }
              contentTopicFormData.append('content_opening', content_opening);

              if (video_body?.[0].originFileObj) {
                contentTopicFormData.append('video_body', video_body[0].originFileObj);
              }
              contentTopicFormData.append('content_body', content_body);

              if (video_conclusion?.[0].originFileObj) {
                contentTopicFormData.append('video_conclusion', video_conclusion[0].originFileObj);
              }
              contentTopicFormData.append('content_conclusion', content_conclusion);
              contentTopicFormData.append('layout', layout as string);
              if (background) {
                contentTopicFormData.append('background', layout as string);
              }
              if (chart_symbol) {
                contentTopicFormData.append('chart_symbol', layout as string);
              }
              try {
                if (_id) {
                  await topicService.updateContentTopic(_id, contentTopicFormData);
                } else {
                  await topicService.createContentTopic(contentTopicFormData);
                }
              } catch (error) {
                notificationController.error({
                  message: `Something wrong with topic content ${index + 1}!!`,
                });
              }
            }
          }

          if (answerGroup && answerGroup.length > 0) {
            for (let index = 0; index < answerGroup.length; index++) {
              const groupFormData = new FormData();
              const { _id, priority, content, keywords, answerVideo } = answerGroup[index];
              groupFormData.append('topic_id', topicId);
              groupFormData.append('group_content', content);
              groupFormData.append('priority', priority);
              (keywords || []).map((kw: string) => {
                groupFormData.append('keywords[]', kw);
              });
              answerVideo.forEach(async (av, index: number) => {
                if (av.video?.[0].originFileObj) {
                  groupFormData.append(`answer_video_${index + 1}`, av.video[0].originFileObj);
                }
                groupFormData.append(`answer_layout_${index + 1}`, av.videoLayout);
                groupFormData.append(`answer_content_${index + 1}`, av.answerContent);
              });
              try {
                if (_id) {
                  await topicGroupService.update(_id, groupFormData);
                } else {
                  await topicGroupService.create(groupFormData);
                }
              } catch (error) {
                notificationController.error({
                  message: `Something wrong with answer ${index + 1}!!`,
                });
              } finally {
                if (index === answerGroup.length - 1) {
                  notificationController.success({
                    message: 'Update successfully',
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

  return (
    <>
      <PageTitle>{t('POLARIS.EDIT_ANSWER')}</PageTitle>
      <BaseFormTitle>{t('POLARIS.EDIT_ANSWER')}</BaseFormTitle>
      <EditTemplate saveButtonProps={{ loading: loading || loadingUploadArray }}>
        <FormProvider {...editFormMethods}>
          <EditTemplate.Form onSubmit={editFormMethods.handleSubmit(onEditSubmitForm)}>
            <BaseTabs>
              <BaseTabs.TabPane tab={t('POLARIS.INFORMATION')} key="1">
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
                      placeholder={t('POLARIS.SELECT_CHART_PLACEHOLDER')}
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
                      setDeletedContentTopic((prevState) => [...prevState, contentTopicId]);
                    }}
                  />
                </div>
              </BaseTabs.TabPane>
              <BaseTabs.TabPane tab={t('POLARIS.Q&A')} key="2">
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
