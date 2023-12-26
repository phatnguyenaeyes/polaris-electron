import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TimepickerField from '@app/components/formControl/TimepickerField';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { urlPattern } from '@app/constants/patterns';
import { notificationController } from '@app/controllers/notificationController';
import { liveSettingService } from '@app/services/liveSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Modal as AntModal, Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import AnswerLibraryField from './components/AnswerLibraryField';
import { LiveStreamFormInterface } from './livestream.interface';
import { useTranslation } from 'react-i18next';

const { confirm } = AntModal;

export function secondsToMoment(secs: number) {
  return moment.utc(secs * 1000);
}

const LivestreamCreatePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const createFormSchema = yup.object().shape({
    answerSubject: yup
      .array()
      .of(
        yup.object().shape({
          topicId: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
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
  });

  const createFormMethods = useForm<LiveStreamFormInterface>({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      answerSubject: [
        {
          topicId: '',
          linkChart: '',
        },
      ],
    },
  });

  const onCreateSubmitForm = async (values: LiveStreamFormInterface) => {
    try {
      const { answerSubject, youtubeLink, twitterLink, telegramLink, commentFilterTime } = values;
      const answerSubjectFormated = answerSubject.map((item) => {
        const durationLiveBySeconds = moment.duration(moment(item.durationLive).format('HH:mm:ss')).asSeconds();
        const { topicId, linkChart } = item;
        return {
          topicId,
          linkChart,
          durationLive: durationLiveBySeconds,
        };
      });
      // const commentFilterTimeFormated = moment.duration(moment(commentFilterTime).format('HH:mm:ss')).asSeconds();

      const resquestBody = {
        linkYoutube: youtubeLink,
        linkTwitter: twitterLink,
        linkTelegram: telegramLink,
        // commentFilterTime: commentFilterTimeFormated,
        status: 'START',
        topics: answerSubjectFormated,
      };

      const createLiveRes = await liveSettingService.create(resquestBody);
      notificationController.success({
        message: 'Cập nhật thành công',
      });
      if (createLiveRes?._id) {
        navigate(`/livestream/edit/${createLiveRes?._id}`);
      }
    } catch (error) {}
  };

  return (
    <>
      <PageTitle>{t('POLARIS.START_A_NEW_LIVE_STREAM_SESSION')}</PageTitle>
      <BaseFormTitle>{t('POLARIS.START_A_NEW_LIVE_STREAM_SESSION')}</BaseFormTitle>
      <CreateTemplate okBtnText={t('POLARIS.CONTINUE')}>
        <FormProvider {...createFormMethods}>
          <CreateTemplate.Form onSubmit={createFormMethods.handleSubmit(onCreateSubmitForm)}>
            <Row>
              <Col span={24}>
                <AnswerLibraryField fieldName="answerSubject" />
              </Col>
            </Row>
            {/* <Row gutter={24}>
              <Col span={24} lg={24}>
                <TimepickerField required label="Thời gian lọc bình luận" name="commentFilterTime" />
              </Col>
            </Row> */}
          </CreateTemplate.Form>
        </FormProvider>
      </CreateTemplate>
    </>
  );
};

export default LivestreamCreatePage;
