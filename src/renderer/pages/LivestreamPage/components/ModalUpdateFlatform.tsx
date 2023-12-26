import { CopyOutlined } from '@ant-design/icons';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseModal } from '@app/components/common/BaseModal/BaseModal';
import TextField from '@app/components/formControl/TextField';
import { notificationController } from '@app/controllers/notificationController';
import { liveSettingService } from '@app/services/liveSetting.service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'antd';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import styled from 'styled-components';
import * as yup from 'yup';
import * as S from '../Livestream.styles';
import { useTranslation } from 'react-i18next';

const BASE_URL = process.env.REACT_APP_BASE_URL;

interface UpdateFlatformFormInterface {
  fullLinkYoutube: string;
  fullLinkTwitter: string;
  fullLinkTelegram: string;
}

interface ModalUpdateFlatformProps {
  open: boolean;
  livestreamData?: any;
  onClose: () => void;
  onSuccess?: () => void;
}

// http://3.1.222.157/render?live_setting=
const ModalUpdateFlatform: React.FC<ModalUpdateFlatformProps> = ({ open, livestreamData, onClose, onSuccess }) => {
  const { t } = useTranslation();

  const formSchema = yup.object().shape(
    {
      fullLinkYoutube: yup.string().when(['fullLinkTwitter', 'fullLinkTelegram'], {
        is: (fullLinkTwitter: string, fullLinkTelegram: string) => !fullLinkTwitter && !fullLinkTelegram,
        then: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
        otherwise: yup.string(),
      }),
      fullLinkTwitter: yup.string().when(['fullLinkYoutube', 'fullLinkTelegram'], {
        is: (fullLinkYoutube: string, fullLinkTelegram: string) => !fullLinkYoutube && !fullLinkTelegram,
        then: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
        otherwise: yup.string(),
      }),
      fullLinkTelegram: yup.string().when(['fullLinkYoutube', 'fullLinkTwitter'], {
        is: (fullLinkYoutube: string, fullLinkTwitter: string) => !fullLinkYoutube && !fullLinkTwitter,
        then: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
        otherwise: yup.string(),
      }),
    },
    [
      ['fullLinkYoutube', 'fullLinkTwitter'],
      ['fullLinkYoutube', 'fullLinkTelegram'],
      ['fullLinkTwitter', 'fullLinkTelegram'],
    ],
  );

  const formMethods = useForm<UpdateFlatformFormInterface>({
    resolver: yupResolver(formSchema),
  });

  const onCreateSubmitForm = async (values: any) => {
    try {
      const { fullLinkYoutube, fullLinkTwitter, fullLinkTelegram } = values;

      const resquestBody = {
        ...(fullLinkYoutube && {
          fullLinkYoutube: fullLinkYoutube,
        }),
        ...(fullLinkTwitter && {
          fullLinkTwitter: fullLinkTwitter,
        }),
        ...(fullLinkTelegram && {
          fullLinkTelegram: fullLinkTelegram,
        }),
      };

      if (livestreamData?._id) {
        await liveSettingService.update(livestreamData?._id, resquestBody);
        onClose?.();
        onSuccess?.();
      }

      notificationController.success({
        message: 'Cập nhật thành công',
      });
    } catch (error) {}
  };
  return (
    <BaseModal title={t('POLARIS.START_LIVE_STREAM')} open={open} onCancel={onClose} footer={null}>
      <FormProvider {...formMethods}>
        <S.LivestreamLinkWrapper>
          <span>
            {BASE_URL}/render?live_setting={livestreamData?._id || ''}
          </span>
          <S.LivestreamLinkIcon
            onClick={async () => {
              try {
                await window.navigator.clipboard.writeText(
                  `${BASE_URL}/render?live_setting=${livestreamData?._id || ''}`,
                );
                notificationController.success({
                  message: 'Đã sao chép',
                });
              } catch (error) {
                console.log('error:', error);
              }
            }}
          >
            <CopyOutlined />
          </S.LivestreamLinkIcon>
        </S.LivestreamLinkWrapper>
        <br />
        <form onSubmit={formMethods.handleSubmit(onCreateSubmitForm)}>
          <Row gutter={24}>
            <Col span={24} lg={24}>
              <TextField label="Link youtube" name="fullLinkYoutube" placeholder="Nhập link youtube" />
            </Col>
            <Col span={24} lg={24}>
              <TextField label="Link twitter" name="fullLinkTwitter" placeholder="Nhập link twitter" />
            </Col>
            <Col span={24} lg={24}>
              <TextField label="Link telegram" name="fullLinkTelegram" placeholder="Nhập link telegram" />
            </Col>
          </Row>
          <ButtonContainer>
            <BaseButton
              htmlType="button"
              onClick={() => {
                onClose();
              }}
            >
              {t('POLARIS.CLOSE')}
            </BaseButton>
            <BaseButton type="primary" htmlType="submit">
              {t('POLARIS.START')}
            </BaseButton>
          </ButtonContainer>
        </form>
      </FormProvider>
    </BaseModal>
  );
};

const ButtonContainer = styled.div`
  display: flex;
  gap: 24px;
  justify-content: center;
`;

export default ModalUpdateFlatform;
