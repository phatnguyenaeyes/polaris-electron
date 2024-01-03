import React, { useState, useRef, useLayoutEffect } from 'react';
import UploadListField from '@app/components/formControl/UploadListField';
import { notificationController } from '@app/controllers/notificationController';
import { liveDevSettingService } from '@app/services/liveDevSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';

const LiveConfigCreateForm: React.FC<{ onCreated: () => void }> = ({
  onCreated,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
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

  useLayoutEffect(() => {
    const heightt = uploadContainerRef?.current?.offsetHeight;
    setUploadFieldHeight(heightt || 0);
  }, []);

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
            onSubmit={createFormMethods.handleSubmit(onSubmitForm)}
          >
            <FormProvider {...createFormMethods}>
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
                    notAllowDelete={true}
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
                    notAllowDelete={true}
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
              {t('POLARIS.SAVE')}
            </BaseButton>
          </form>
        </div>
      </div>
    </>
  );
};

export default LiveConfigCreateForm;
