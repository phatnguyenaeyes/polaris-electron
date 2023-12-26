import { useTranslation } from 'react-i18next';
import { CopyOutlined } from '@ant-design/icons';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { notificationController } from '@app/controllers/notificationController';
import { liveSettingService } from '@app/services/liveSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'antd';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import * as yup from 'yup';
import { secondsToMoment } from './LivestreamCreate';
import AnswerLibraryField from './components/AnswerLibraryField';
import ModalUpdateFlatform from './components/ModalUpdateFlatform';
import { LiveStreamFormInterface } from './livestream.interface';

const BASE_URL = 'https://staging.polarista.ai';

const LivestreamEditPage: React.FC = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string }>();
  const [modalUpdateFlatformVisible, setModalUpdateFlatformVisible] =
    useState(false);
  const [livestreamData, setLivestreamData] = useState<any>();
  const [loading, setLoading] = useState(false);

  const createFormSchema = yup.object().shape({
    answerSubject: yup
      .array()
      .of(
        yup.object().shape({
          topicId: yup
            .string()
            .required(t('POLARIS.REQUIRED_ERROR_MSG'))
            .nullable(),
          // linkChart: yup
          //   .string()
          //   .matches(urlPattern, 'Điền vào đường dẫn hợp lệ')
          //   .required(t('POLARIS.REQUIRED_ERROR_MSG'))
          //   .nullable(),
          // durationLive: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
        }),
      )
      .min(1, 'Tối thiểu 1')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    // commentFilterTime: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
    youtubeLink: yup.string().nullable(),
    twitterLink: yup.string().nullable(),
    telegramLink: yup.string().nullable(),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      answerSubject: [
        {
          answer: '',
          livestreamTime: '',
        },
      ],
    },
  });

  async function fetchLiveStreamDetail(_liveId: string) {
    try {
      setLoading(true);
      const detailResponse = await liveSettingService.getById(_liveId);
      setLivestreamData(detailResponse);
      const {
        _id,
        fullLinkTwitter,
        fullLinkYoutube,
        fullLinkTelegram,
        topics,
        end_stream_code,
        commentFilterTime,
      } = detailResponse;

      if (!fullLinkTwitter && !fullLinkYoutube && !fullLinkTelegram) {
        setModalUpdateFlatformVisible(true);
      }
      const answerSubject = topics.map((subject: any) => {
        const durationLive = secondsToMoment(subject.durationLive);
        return {
          topicId: subject.topicId,
          linkChart: subject.linkChart,
          durationLive: durationLive,
        };
      });

      // const commentFilterTimeFormated = secondsToMoment(commentFilterTime);

      const mappingDetail = {
        answerSubject,
        youtubeLink: fullLinkYoutube,
        twitterLink: fullLinkTwitter,
        telegramLink: fullLinkTelegram,
        end_stream_code: end_stream_code || '',
        // commentFilterTime: commentFilterTimeFormated,
        liveUrl: `${BASE_URL}/render?live_setting=${_id || ''}`,
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

  useEffect(() => {
    if (id) {
      fetchLiveStreamDetail(id);
    }
  }, [id]);

  const onSubmitForm = async (values: LiveStreamFormInterface) => {
    try {
      const {
        answerSubject,
        youtubeLink,
        twitterLink,
        telegramLink,
        commentFilterTime,
      } = values;
      const answerSubjectFormated = answerSubject.map((item) => {
        const durationLiveBySeconds = moment
          .duration(moment(item.durationLive).format('HH:mm:ss'))
          .asSeconds();
        return {
          ...item,
          durationLive: durationLiveBySeconds,
        };
      });
      // const commentFilterTimeFormated = moment.duration(moment(commentFilterTime).format('HH:mm:ss')).asSeconds();

      const resquestBody = {
        linkYoutube: youtubeLink,
        linkTwitter: twitterLink,
        linkTelegram: telegramLink,
        // commentFilterTime: commentFilterTimeFormated,
        topics: answerSubjectFormated,
      };

      if (id) {
        await liveSettingService.update(id, resquestBody);
      }

      notificationController.success({
        message: 'Cập nhật thành công',
      });
    } catch (error) {}
  };

  return (
    <>
      <PageTitle>{t('POLARIS.START_A_NEW_LIVE_STREAM_SESSION')}</PageTitle>
      <BaseFormTitle>
        {t('POLARIS.START_A_NEW_LIVE_STREAM_SESSION')}
      </BaseFormTitle>
      <EditTemplate hideButton>
        <FormProvider {...formMethods}>
          <EditTemplate.Form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
            <Row>
              <Col span={24}>
                <AnswerLibraryField
                  fieldName="answerSubject"
                  allowAdd={false}
                />
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={24} lg={24}>
                <TextField
                  readOnly
                  label="End Stream Code"
                  name="end_stream_code"
                />
              </Col>
              <Col span={24} lg={24}>
                <TextField
                  readOnly
                  label="Live URL"
                  name="liveUrl"
                  suffix={
                    <CopyOutlined
                      onClick={async () => {
                        try {
                          await window.navigator.clipboard.writeText(
                            `${BASE_URL}/render?live_setting=${
                              livestreamData?._id || ''
                            }`,
                          );
                          notificationController.success({
                            message: 'Đã sao chép',
                          });
                        } catch (error) {
                          console.log('error:', error);
                        }
                      }}
                    />
                  }
                />
              </Col>
              {/* <Col span={24} lg={24}>
                <TimepickerField required label="Thời gian lọc bình luận" name="commentFilterTime" />
              </Col> */}
              <Col span={24} lg={24}>
                <TextField
                  label="Link youtube"
                  name="youtubeLink"
                  placeholder="Nhập link youtube"
                  readOnly
                />
              </Col>
              <Col span={24} lg={24}>
                <TextField
                  label="Link twitter"
                  name="twitterLink"
                  placeholder="Nhập link twitter"
                  readOnly
                />
              </Col>
              <Col span={24} lg={24}>
                <TextField
                  label="Link telegram"
                  name="telegramLink"
                  placeholder="Nhập link telegram"
                  readOnly
                />
              </Col>
            </Row>
          </EditTemplate.Form>
        </FormProvider>
      </EditTemplate>
      <ModalUpdateFlatform
        open={modalUpdateFlatformVisible}
        livestreamData={livestreamData}
        onClose={() => {
          setModalUpdateFlatformVisible(false);
        }}
        onSuccess={() => {
          if (id) {
            fetchLiveStreamDetail(id);
          }
        }}
      />
    </>
  );
};

export default LivestreamEditPage;
