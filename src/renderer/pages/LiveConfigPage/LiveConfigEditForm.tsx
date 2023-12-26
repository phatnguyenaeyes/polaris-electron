import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import UploadListField from '@app/components/formControl/UploadListField';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { notificationController } from '@app/controllers/notificationController';
import { liveDevSettingService } from '@app/services/liveDevSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'antd';
import { isEmpty } from 'lodash';
import React, { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { LiveDevSettingsInterface } from './interface';
import { useTranslation } from 'react-i18next';

const LiveConfigEditForm: React.FC<{ liveDevSettings: LiveDevSettingsInterface; onSuccess: () => void }> = ({
  liveDevSettings,
  onSuccess,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [liveDevSettingId, setLiveDevSettingId] = useState<string>();

  const formSchema = yup.object().shape({
    videoStart: yup.array().min(1, 'Vui lòng chọn ít nhất một tuỳ chọn').required(t('POLARIS.REQUIRED_ERROR_MSG')),
    videoEnd: yup.array().min(1, 'Vui lòng chọn ít nhất một tuỳ chọn').required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      answerSubject: [
        {
          answer: '',
          livestreamTime: '',
        },
      ],
    },
  });

  useEffect(() => {
    if (!isEmpty(liveDevSettings)) {
      try {
        const { _id, video_end_links, video_start_links } = liveDevSettings;
        setLiveDevSettingId(_id);
        if (video_end_links?.length > 0) {
          formMethods.setValue('videoStart', [
            {
              uid: 1,
              name: `${video_start_links[0]}`,
              originPath: `${video_start_links[0]}`,
              videoPath: `${S3_DOMAIN_URL}/live-dev-setting/${video_start_links[0]}`,
            },
          ]);
        }

        if (video_end_links?.length > 0) {
          formMethods.setValue('videoEnd', [
            {
              uid: 1,
              name: `${video_end_links[0]}`,
              originPath: `${video_end_links[0]}`,
              videoPath: `${S3_DOMAIN_URL}/live-dev-setting/${video_end_links[0]}`,
            },
          ]);
        }
      } catch (error) {}
    }
  }, [liveDevSettings]);

  const onSubmitForm = async (values: any) => {
    try {
      setLoading(true);
      const { videoStart, videoEnd } = values;

      const formData = new FormData();
      if (videoStart[0].originFileObj) {
        formData.append('video_start_links', videoStart[0].originFileObj);
      } else if (videoStart[0].originPath) {
        formData.append('video_start_links', videoStart[0].originPath);
      }

      if (videoEnd[0].originFileObj) {
        formData.append('video_end_links', videoEnd[0].originFileObj);
      } else if (videoEnd[0].originPath) {
        formData.append('video_end_links', videoEnd[0].originPath);
      }
      if (liveDevSettingId) {
        await liveDevSettingService.update(liveDevSettingId, formData);
      }

      if (typeof onSuccess === 'function') {
        onSuccess();
      }

      notificationController.success({
        message: 'Cập nhật thành công',
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <PageTitle>{t('POLARIS.START_A_LIVE_STREAM_SESSION')}</PageTitle>
      <BaseFormTitle>{t('POLARIS.START_A_LIVE_STREAM_SESSION')}</BaseFormTitle>
      <EditTemplate
        saveButtonProps={{
          loading: loading,
        }}
        okBtnText={t('POLARIS.START')}
      >
        <FormProvider {...formMethods}>
          <EditTemplate.Form onSubmit={formMethods.handleSubmit(onSubmitForm)}>
            <Row>
              <Col lg={24} xs={24}>
                <UploadListField
                  showDownloadIcon
                  required
                  videoOnly
                  placeholder={t('POLARIS.UPLOAD_VIDEO')}
                  label={t('POLARIS.OPENING_VIDEO')}
                  suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                  name="videoStart"
                  maxLength={1}
                />
              </Col>
              <Col lg={24} xs={24}>
                <UploadListField
                  showDownloadIcon
                  required
                  videoOnly
                  placeholder={t('POLARIS.UPLOAD_VIDEO')}
                  label={t('POLARIS.CONCLUSION_VIDEO')}
                  suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                  name="videoEnd"
                  maxLength={1}
                />
              </Col>
            </Row>
            <br />
          </EditTemplate.Form>
        </FormProvider>
      </EditTemplate>
    </>
  );
};

export default LiveConfigEditForm;
