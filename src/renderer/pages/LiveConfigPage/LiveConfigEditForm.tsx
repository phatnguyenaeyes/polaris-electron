import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import UploadListField from '@app/components/formControl/UploadListField';
import { S3_DOMAIN_URL } from '@app/constants/url';
import { notificationController } from '@app/controllers/notificationController';
import { liveDevSettingService } from '@app/services/liveDevSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { isEmpty } from 'lodash';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { LiveDevSettingsInterface } from './interface';

const LiveConfigEditForm: React.FC<{
  liveDevSettings: LiveDevSettingsInterface;
  onSuccess: () => void;
}> = ({ liveDevSettings, onSuccess }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [liveDevSettingId, setLiveDevSettingId] = useState<string>();
  const uploadContainerRef = useRef<any>();
  const [uploadFieldHeight, setUploadFieldHeight] = useState<string>();

  const formSchema = yup.object().shape({
    videoStart: yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
    videoEnd: yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một tuỳ chọn')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
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

  useLayoutEffect(() => {
    const heightt = uploadContainerRef?.current?.offsetHeight;
    setUploadFieldHeight(heightt || 0);
  }, []);

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
      <PageTitle>{t('POLARIS.LIVE_SESSION_CONFIGURATION')}</PageTitle>

      <div className="grid place-items-center h-[calc(100vh_-_130px)] w-full">
        <div className="flex flex-col bg-white w-[921px] rounded-[32px] items-center justify-center h-[70vh] py-[36px] px-[48px] border-solid border-[1px] border-[rgba(57,_43,_43,_0.10)]">
          <p className="self-start text-black text-[28px] font-normal">
            {t('POLARIS.LIVE_SESSION_CONFIGURATION')}
          </p>
          {/*  */}
          <form
            id="basic-edit"
            className="w-full h-full flex-1 flex flex-col gap-y-6 mt-[36px] mb-[20px]"
            onSubmit={formMethods.handleSubmit(onSubmitForm)}
          >
            <FormProvider {...formMethods}>
              <div
                ref={uploadContainerRef}
                className="grid grid-cols-2 self-center h-full w-full gap-x-[16px]"
              >
                <div
                  className="upload-list-file-custom"
                  style={{
                    maxHeight: uploadFieldHeight,
                    minHeight: uploadFieldHeight,
                  }}
                >
                  <UploadListField
                    showDownloadIcon
                    required
                    videoOnly
                    placeholder={t('POLARIS.UPLOAD_VIDEO')}
                    label={t('POLARIS.START_LIVE')}
                    suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                    name="videoStart"
                    maxLength={1}
                  />
                </div>
                <div
                  className="upload-list-file-custom"
                  style={{
                    maxHeight: uploadFieldHeight,
                    minHeight: uploadFieldHeight,
                  }}
                >
                  <UploadListField
                    showDownloadIcon
                    required
                    videoOnly
                    placeholder={t('POLARIS.UPLOAD_VIDEO')}
                    label={t('POLARIS.END_LIVE')}
                    suffixHelpText={t('POLARIS.FORMAT_SUGGESTION_01')}
                    name="videoEnd"
                    maxLength={1}
                  />
                </div>
              </div>
              <br />
            </FormProvider>
            {/* update */}
            <BaseButton
              htmlType="submit"
              type="primary"
              className="w-1/2 self-center"
              loading={loading}
              onClick={() => {}}
            >
              {t('POLARIS.UPDATE')}
            </BaseButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default LiveConfigEditForm;
