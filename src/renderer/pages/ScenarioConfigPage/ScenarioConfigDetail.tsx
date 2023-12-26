import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import TextField from '@app/components/formControl/TextField';
import { Col, Row, Space, message, Typography, Drawer } from 'antd';
import moment from 'moment';
import React, { useState, useMemo, useEffect } from 'react';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  RightOutlined,
  FormOutlined,
  LeftOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { scriptService } from '@app/services/script.service';
import { useNavigate, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import QuestionListBox from './components/QuestionListBox';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { CreateTopicConfirmModal, AddScriptToTopicConfirmModal } from './components/modal';
import { useTranslation } from 'react-i18next';

export function secondsToMoment(secs: number) {
  return moment.utc(secs * 1000);
}

enum SCENARIO_DETAIL_STEP {
  DETAIL,
  QUESTION,
}

const ScenarioConfigDetail: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [scriptDetail, setScriptDetail] = useState<any>({});
  const questions = useMemo(() => scriptDetail?.questions || [], [scriptDetail?.questions]);
  const [step, setStep] = useState(SCENARIO_DETAIL_STEP.DETAIL);

  const [isOpenCreateTopicConfirm, setOpenCreateTopicConfirm] = useState(false);
  const [isOpenAddScriptToTopicConfirm, setOpenAddScriptToTopicConfirm] = useState(false);

  const step3Schema = yup.object().shape({
    questionInput: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(step3Schema),
    defaultValues: {
      questionInput: '',
    },
  });

  const TITLE: { [key: number]: string } = useMemo(
    () => ({ 0: t('POLARIS.SCRIPT'), 1: t('POLARIS.MAKE_QUESTIONS') }),
    [],
  );

  const SCRIPT_DETAIL_ARR = useMemo(
    () => [
      {
        label: t('POLARIS.TITLE'),
        value: scriptDetail?.data?.title,
        handle: () => handleUpdateScriptPart({ part: 'title' }),
      },
      {
        label: t('POLARIS.INTRODUCTION'),
        value: scriptDetail?.data?.openings[scriptDetail?.data?.opening_index],
        handle: () => handleUpdateScriptPart({ part: 'opening' }),
      },
      {
        label: t('POLARIS.CONTENT'),
        value: scriptDetail?.data?.bodies[scriptDetail?.data?.body_index],
        handle: () => handleUpdateScriptPart({ part: 'body' }),
      },
      {
        label: t('POLARIS.CONCLUSION'),
        value: scriptDetail?.data?.conclusions[scriptDetail?.data?.conclusion_index],
        handle: () => handleUpdateScriptPart({ part: 'conclusion' }),
      },
    ],
    [
      scriptDetail?.data?.bodies,
      scriptDetail?.data?.body_index,
      scriptDetail?.data?.conclusion_index,
      scriptDetail?.data?.conclusions,
      scriptDetail?.data?.opening_index,
      scriptDetail?.data?.openings,
      scriptDetail?.data?.title,
    ],
  );

  const handleReCreateScript = async () => {
    try {
      setIsLoading(true);
      await scriptService.updateTheContentOfScript({ id: scriptDetail?._id || '' });
      const res = await scriptService.getByID(scriptDetail?._id || '');
      setScriptDetail(res);
      message.success('Tạo lại kịch bản thành công!');
    } catch (error) {
      message.error('Có lỗi! Vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateAnswer = React.useCallback(
    async (questionId = '') => {
      try {
        setIsLoading(true);

        // fake data
        const newQuestions =
          scriptDetail?.questions?.map((q: any, index: number) => {
            return { ...q, isLoading: q?._id === questionId ? true : false, isNew: false };
          }) || [];
        const fakeRes = {
          ...scriptDetail,
          questions: newQuestions,
        };
        setScriptDetail(fakeRes);

        // real data
        await scriptService.updateAnswerOfQuestion({ id: scriptDetail?._id, questionId });
        const res = await scriptService.getByID(scriptDetail?._id || '');
        setScriptDetail(res);
        message.success('Thành công!');
      } catch (error) {
        message.error('Có lỗi! Vui lòng thử lại');
      } finally {
        setIsLoading(false);
      }
    },
    [scriptDetail],
  );

  const handleUpdateScriptPart = async ({ part = '' }) => {
    try {
      setIsLoading(true);
      await scriptService.updateThePartOfScript({ id: scriptDetail?._id || '', data: { part } });
      const res = await scriptService.getByID(scriptDetail?._id || '');
      setScriptDetail(res);
      message.success('Thành công!');
    } catch (error) {
      message.error('Có lỗi! Vui lòng thử lại');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddQuestion = async (value = '') => {
    if (value?.trim() === '') return;
    formMethods?.setValue('questionInput', value);

    try {
      setIsLoading(true);

      // fake data
      const fakeRes = {
        ...scriptDetail,
        questions: [
          ...(scriptDetail?.questions?.map((q: any) => ({ ...q, isNew: false })) || []),
          {
            _id: uuidv4(),
            question: value,
            answers: [undefined],
            isLoading: true,
            isFakeNew: true,
            is_reply: true,
            index: 0,
            deleted_at: false,
          },
        ],
      };
      setScriptDetail(fakeRes);

      // real data
      await scriptService.addQuestion({ id: scriptDetail?._id, data: { question: value } });
      const res = await scriptService.getByID(scriptDetail?._id || '');
      const newRes = {
        ...res,
        questions: res?.questions.map((q: any, idx: number) => {
          if (idx === res?.questions?.length - 1) {
            return { ...q, isNew: true };
          }
          return { ...q };
        }),
      };
      setScriptDetail(newRes);

      formMethods?.setValue('questionInput', '');
      message.success('Thành công!');
    } catch (error) {
      message.error('Có lỗi! Vui lòng thử lại');
      setScriptDetail({ ...scriptDetail });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoQuestionTab = async () => {
    if (scriptDetail?.status === 'GENERATED_SCRIPT') {
      try {
        setIsLoading(true);
        await scriptService.save({ id: scriptDetail?._id });
        message.success('Kịch bản được lưu thành công');
        const res = await scriptService.getByID(id || '');
        setScriptDetail(res);
      } catch (error) {
        message.error('Lưu kịch bản thất bại');
      } finally {
        setIsLoading(false);
      }
    }

    setStep(SCENARIO_DETAIL_STEP.QUESTION);
  };

  // API - get prompt topic
  useEffect(() => {
    (async () => {
      const res = await scriptService.getByID(id || '');
      setScriptDetail(res);
    })();
  }, []);

  // Scroll to bottom of list when adding new question
  useEffect(() => {
    (async () => {
      const el: any = document?.querySelector('#questions-container');
      if (el && questions?.some((q: any) => q?.isFakeNew)) {
        el.scrollTop = el?.scrollHeight;
      }
    })();
  }, [scriptDetail]);

  // Scroll to bottom of list when the tab is question
  useEffect(() => {
    (async () => {
      const el: any = document?.querySelector('#questions-container');

      if (step === SCENARIO_DETAIL_STEP.QUESTION) {
        el.scrollTop = el?.scrollHeight;
      }
    })();
  }, [step]);

  return (
    <>
      {isOpenCreateTopicConfirm ? (
        <CreateTopicConfirmModal
          isModalOpen={isOpenCreateTopicConfirm}
          handleCancel={() => setOpenCreateTopicConfirm(false)}
          handleOk={() => setOpenCreateTopicConfirm(false)}
          handleSave={() => {
            setOpenAddScriptToTopicConfirm(true);
            setOpenCreateTopicConfirm(false);
          }}
          handleCreate={() => {
            navigate(`/answer-library/script/${scriptDetail._id}`);
          }}
        />
      ) : null}
      {isOpenAddScriptToTopicConfirm ? (
        <AddScriptToTopicConfirmModal
          isModalOpen={isOpenAddScriptToTopicConfirm}
          handleCancel={() => setOpenAddScriptToTopicConfirm(false)}
          handleOk={() => setOpenAddScriptToTopicConfirm(false)}
        />
      ) : null}
      <PageTitle>{TITLE[step]}</PageTitle>
      <BaseFormTitle style={{ marginBottom: '20px' }}>{TITLE[step]}</BaseFormTitle>
      <div style={{ padding: '25px 0px', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        {step === SCENARIO_DETAIL_STEP.DETAIL ? (
          <>
            <Row align="middle" justify="space-between">
              <Row align="middle" gutter={[10, 0]}>
                <Col>
                  <BaseButton
                    size="small"
                    disabled={isLoading}
                    icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
                    onClick={() => {
                      navigate('/scenario');
                    }}
                  />
                </Col>
                <Col>
                  <Typography.Text>{t('POLARIS.BACK')}</Typography.Text>
                </Col>
              </Row>
              <BaseButton htmlType="button" onClick={handleReCreateScript} loading={isLoading} disabled={isLoading}>
                {t('POLARIS.RECREATE')}
              </BaseButton>
            </Row>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              {SCRIPT_DETAIL_ARR?.map((s, idx) => {
                return (
                  <Row gutter={[24, 24]} align="middle" key={idx}>
                    <Col xs={4} lg={4}>
                      <Typography.Title level={4}>{s.label}</Typography.Title>
                    </Col>
                    <Col xs={4} lg={14}>
                      {s.value ? <div dangerouslySetInnerHTML={{ __html: s.value || '' }} /> : <p>---</p>}
                    </Col>
                    <Col xs={4} lg={4}>
                      <BaseButton
                        size="small"
                        icon={<ReloadOutlined />}
                        onClick={s.handle}
                        loading={isLoading}
                        disabled={isLoading}
                      />
                    </Col>
                  </Row>
                );
              })}
            </Space>
            <Row justify="end">
              <BaseButton htmlType="button" onClick={handleGoQuestionTab} disabled={isLoading} loading={isLoading}>
                {t('POLARIS.MAKE_QUESTIONS')}
              </BaseButton>
            </Row>
          </>
        ) : null}
        {step === SCENARIO_DETAIL_STEP.QUESTION ? (
          <>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <Row justify="space-between">
                <BaseButton
                  htmlType="button"
                  onClick={() => {
                    setOpenCreateTopicConfirm(true);
                  }}
                >
                  {t('POLARIS.SAVE_TO_LIBRARY')}
                </BaseButton>
                <BaseButton
                  htmlType="button"
                  icon={<LeftOutlined />}
                  onClick={() => {
                    setOpenDrawer(true);
                  }}
                />
              </Row>

              <div
                id="questions-container"
                style={{
                  width: '100%',
                  height: 'calc(100vh - 400px)',
                  overflowY: 'scroll',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '80px',
                }}
              >
                {questions?.length === 0 ? (
                  <Row style={{ height: '100%', display: 'grid', placeContent: 'center' }}>
                    {t('POLARIS.NO_ANSWERS_YET')})
                  </Row>
                ) : null}
                <QuestionListBox questions={questions} isLoading={isLoading} handleUpdateAnswer={handleUpdateAnswer} />
              </div>
              <Row>
                <Space style={{ width: '100%' }} direction="vertical">
                  <FormProvider {...formMethods}>
                    {/* eslint-disable-next-line @typescript-eslint/no-empty-function */}
                    <CreateTemplate.Form onSubmit={formMethods.handleSubmit(() => {})}>
                      <TextField
                        name="questionInput"
                        placeholder="Nhập nội dung câu hỏi"
                        suffix={<SendOutlined />}
                        disabled={isLoading}
                        onKeyDown={(e: any) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            formMethods.trigger();
                            const trunText = e?.target?.value?.slice(0, 2000) || '';
                            handleAddQuestion(trunText as string);
                          }
                        }}
                      />
                    </CreateTemplate.Form>
                  </FormProvider>
                </Space>
              </Row>
            </Space>

            <Drawer placement="right" closable={false} open={openDrawer} key="right" width={600}>
              <Row justify="space-between">
                <BaseButton
                  htmlType="button"
                  icon={<RightOutlined />}
                  onClick={() => {
                    setOpenDrawer(false);
                  }}
                />
                <BaseButton
                  htmlType="button"
                  icon={<FormOutlined />}
                  onClick={() => {
                    setStep(SCENARIO_DETAIL_STEP.DETAIL);
                    setOpenDrawer(false);
                  }}
                />
              </Row>
              <Space direction="vertical" size="large" style={{ width: '100%', marginTop: '30px' }}>
                {SCRIPT_DETAIL_ARR?.map((s, idx) => {
                  return (
                    <Space align="start" direction="vertical" key={idx}>
                      <Typography.Title level={5}>{s.label}</Typography.Title>
                      {s.value ? <div dangerouslySetInnerHTML={{ __html: s.value || '' }} /> : <p>---</p>}
                    </Space>
                  );
                })}
              </Space>
            </Drawer>
          </>
        ) : null}
      </div>
    </>
  );
};

export default ScenarioConfigDetail;
