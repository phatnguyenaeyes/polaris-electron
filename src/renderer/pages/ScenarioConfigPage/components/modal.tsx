/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { Col, Row, Typography, Alert, Modal } from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import { ReloadOutlined } from '@ant-design/icons';
import TypingText from '@app/components/common/TypingText/TypingText';
import ThreeDotsTyping from '@app/components/common/ThreeDotsTyping/ThreeDotsTyping';
import _isNull from 'lodash/isNull';
import { promptTopicService } from '@app/services/promptTopic.service';
import SelectField from '@app/components/formControl/SelectField';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { topicService } from '@app/services/topic.service';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface IScenarioModal {
  isModalOpen?: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleSave?: () => void;
  handleCreate?: () => void;
}

export const CreateTopicConfirmModal = React.memo<IScenarioModal>(
  ({ isModalOpen, handleOk, handleCancel, handleSave, handleCreate }) => {
    const { t } = useTranslation();
    return (
      <>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} destroyOnClose footer={null}>
          <Row justify="center" style={{ paddingTop: '50px', paddingBottom: '20px' }}>
            <Typography.Title level={5}>{t('POLARIS.CREATE_NEW_TOPIC_CONFIRM')}</Typography.Title>
          </Row>
          <div key="a" style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0px' }}>
            <BaseButton size="middle" onClick={handleSave}>
              {t('POLARIS.SAVE_TO_CREATED_TOPIC')}
            </BaseButton>
            <BaseButton size="middle" onClick={handleCreate}>
              {t('POLARIS.CREATE_NEW')}
            </BaseButton>
          </div>
        </Modal>
      </>
    );
  },
);

export const AddScriptToTopicConfirmModal = React.memo<IScenarioModal>(({ isModalOpen, handleOk, handleCancel }) => {
  const [promptTopicOptions, setPromptTopicOptions] = useState([]);
  const { id: scriptId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const schema = yup.object().shape({
    promptTopic: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      questionInput: '',
    },
  });

  // API - get prompt topic
  useEffect(() => {
    (async () => {
      const res = await topicService.getAll({});
      const data = res?.data?.map((item: any) => ({ label: item?.name || '', value: item?.slug || '' })) || [];
      setPromptTopicOptions(data);
    })();
  }, []);

  const onSubmit = async (values: any) => {
    const selectedTopicSlug = values.promptTopic;
    navigate(`/answer-library/existing-topic/${selectedTopicSlug}/script/${scriptId}`);
  };

  return (
    <>
      <>
        <Modal open={isModalOpen} onOk={handleOk} onCancel={handleCancel} footer={null} destroyOnClose>
          <FormProvider {...formMethods}>
            <CreateTemplate.Form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Row justify="center" style={{ paddingTop: '50px', paddingBottom: '20px' }}>
                <Typography.Title level={5}>{t('POLARIS.TOPIC_TO_ADD_SCRIPT_CONFIRM')}</Typography.Title>
              </Row>
              <SelectField
                required
                label={t('POLARIS.TOPIC')}
                placeholder={t('POLARIS.CHOOSE_PROMPT_TOPIC_PLACEHOLDER')}
                name="promptTopic"
                options={promptTopicOptions}
              />
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0px' }}>
                <BaseButton size="middle" htmlType="submit">
                  {t('POLARIS.APPLY')}
                </BaseButton>
              </div>
            </CreateTemplate.Form>
          </FormProvider>
        </Modal>
      </>
    </>
  );
});
