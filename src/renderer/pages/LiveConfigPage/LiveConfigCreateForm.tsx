import UploadListField from '@app/components/formControl/UploadListField';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { notificationController } from '@app/controllers/notificationController';
import { liveDevSettingService } from '@app/services/liveDevSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'antd';
import React, { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

const LiveConfigCreateForm: React.FC<{ onCreated: () => void }> = ({ onCreated }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  const formSchema = yup.object().shape({
    videoStart: yup.array().min(1, 'Vui lòng chọn ít nhất một tuỳ chọn').required(t('POLARIS.REQUIRED_ERROR_MSG')),
    videoEnd: yup.array().min(1, 'Vui lòng chọn ít nhất một tuỳ chọn').required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const createFormMethods = useForm<any>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      answerSubject: [
        {
          topicId: '',
          linkChart: '',
        },
      ],
    },
  });

  const onSubmitForm = async (values: any) => {
    try {
      setLoading(true);
      const { videoStart, videoEnd } = values;

      const formData = new FormData();
      formData.append('video_start_links', videoStart[0].originFileObj);
      formData.append('video_end_links', videoEnd[0].originFileObj);

      await liveDevSettingService.create(formData);

      if (typeof onCreated === 'function') {
        onCreated();
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
      <CreateTemplate
        saveButtonProps={{
          loading: loading,
        }}
      >
        <FormProvider {...createFormMethods}>
          <CreateTemplate.Form onSubmit={createFormMethods.handleSubmit(onSubmitForm)}>
            <Row>
              <Col lg={24} xs={24}>
                <UploadListField
                  showDownloadIcon
                  required
                  videoOnly
                  placeholder={t('POLARIS.UPLOAD_VIDEO')}
                  notAllowDelete={true}
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
                  notAllowDelete={true}
                  label={t('POLARIS.CONCLUSION_VIDEO')}
                  suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                  name="videoEnd"
                  maxLength={1}
                />
              </Col>
            </Row>
            <br />
          </CreateTemplate.Form>
        </FormProvider>
      </CreateTemplate>
    </>
  );
};

export default LiveConfigCreateForm;
