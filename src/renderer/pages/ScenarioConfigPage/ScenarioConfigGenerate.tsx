import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import { EditTemplate } from '@app/components/templates/FormTemplate/EditTemplate';
import { ScenarioConfigFormInterface } from '@app/interfaces/formInterface';
import { yupResolver } from '@hookform/resolvers/yup';
import { Col, Row } from 'antd';
import moment from 'moment';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';
import ContentQuestionField from './components/ContentQuestionField';
import { useTranslation } from 'react-i18next';

export function secondsToMoment(secs: number) {
  return moment.utc(secs * 1000);
}

const ScenarioConfigGenerate: React.FC = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const createFormSchema = yup.object().shape({
    title: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
    openingStatement: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
    content: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
    closingStatement: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
    contentQuestion: yup
      .array()
      .of(
        yup.object().shape({
          question: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')).nullable(),
        }),
      )
      .min(1, 'Tối thiểu 1')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<ScenarioConfigFormInterface>({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      contentQuestion: [
        {
          question: '',
        },
      ],
    },
  });

  const onCreateSubmitForm = async (values: ScenarioConfigFormInterface) => {
    console.log('values:', values);
  };

  return (
    <>
      <PageTitle>{t('POLARIS.START_A_LIVE_STREAM_SESSION')}</PageTitle>
      <BaseFormTitle>{t('POLARIS.START_A_LIVE_STREAM_SESSION')}</BaseFormTitle>
      <EditTemplate okBtnText="Tạo kịch bản">
        <FormProvider {...formMethods}>
          <EditTemplate.Form onSubmit={formMethods.handleSubmit(onCreateSubmitForm)}>
            <Row>
              <Col xs={24} lg={24}>
                <TextField label="Tiêu đề" name="title" placeholder="Nhập tiêu đề" />
              </Col>
              <Col xs={24} lg={24}>
                <TextField textArea label="Lời mở đầu" name="openingStatement" placeholder="Nhập lời mở đầu" />
              </Col>
              <Col xs={24} lg={24}>
                <TextField textArea label="Nội dung" name="content" placeholder="Nhập nội dung" />
              </Col>
              <Col xs={24} lg={24}>
                <TextField textArea label="Lời kết thúc" name="closingStatement" placeholder="Nhập lời kết thúc" />
              </Col>
              <Col xs={24} lg={24}>
                <ContentQuestionField fieldName="contentQuestion" />
              </Col>
            </Row>
            <Row>
              <Col>
                <BaseButton
                  onClick={() => {
                    navigate('/scenario/generate');
                  }}
                >
                  Lưu vào thư viện
                </BaseButton>
                <br />
              </Col>
            </Row>
          </EditTemplate.Form>
        </FormProvider>
      </EditTemplate>
    </>
  );
};

export default ScenarioConfigGenerate;
