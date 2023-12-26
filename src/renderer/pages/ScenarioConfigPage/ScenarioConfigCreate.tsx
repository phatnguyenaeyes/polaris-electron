import { useTranslation } from 'react-i18next';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import SelectField from '@app/components/formControl/SelectField';
import TextField from '@app/components/formControl/TextField';
import { Col, Row, Space, message, Typography, Drawer } from 'antd';
import moment from 'moment';
import React, { useRef, useState, useMemo, useEffect } from 'react';
import * as yup from 'yup';
import { RHFStep } from '@app/components/forms/RHFStep';
import RHFStepper from '@app/components/forms/RHFStepper';
import {
  ArrowLeftOutlined,
  ReloadOutlined,
  RightOutlined,
  FormOutlined,
  LeftOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import { promptTopicService } from '@app/services/promptTopic.service';
import { scriptService } from '@app/services/script.service';
import { useNavigate } from 'react-router-dom';
import QuestionListBox from './components/QuestionListBox';
import { CreateTopicConfirmModal, AddScriptToTopicConfirmModal } from './components/modal';

export function secondsToMoment(secs: number) {
  return moment.utc(secs * 1000);
}

const ScenarioConfigCreate: React.FC = () => {
  const { t } = useTranslation();
  const formRef = useRef<any>();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [scriptDetail, setScriptDetail] = useState<any>({});
  const [promptTopicOptions, setPromptTopicOptions] = useState([]);
  const [isOpenCreateTopicConfirm, setOpenCreateTopicConfirm] = useState(false);
  const [isOpenAddScriptToTopicConfirm, setOpenAddScriptToTopicConfirm] = useState(false);

  const step1Schema = yup.object().shape({
    url: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    // reloadTime: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    promptTopic: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    // samplefile: yup.array().min(1, 'Vui lòng chọn ít nhất một file').required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });
  const step2Schema = yup.object().shape({
    //
  });

  const step3Schema = yup.object().shape({
    questionInput: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const questions = useMemo(() => scriptDetail?.questions || [], [scriptDetail?.questions]);

  const TITLE: { [key: number]: string } = useMemo(
    () => ({ 0: t('POLARIS.CREATE_SCRIPT'), 1: t('POLARIS.SCRIPT'), 2: 'Đặt câu hỏi' }),
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

  const handleCreateScript = async () => {
    formRef?.current?.trigger();
    const { isValid } = formRef?.current?.getErrors();
    const values = formRef?.current?.getValues();

    if (isValid) {
      try {
        setIsLoading(true);
        // const formData = new FormData();
        // values?.samplefile?.map((item: any) =>
        //   formData.append('files', new Blob([item?.originFileObj], { type: 'text/plain' })),
        // );
        // formData.append('content', values?.content);
        // formData.append('prompt_topic_id', values?.promptTopic);
        const res = await scriptService.create({
          url: values?.url || '',
          prompt_topic_id: values?.promptTopic || '',
        });
        const scriptDetail = await scriptService.getByID(res?.data?._id || '');
        setScriptDetail(scriptDetail);
        message.success('Tạo kịch bản thành công!');
        formRef?.current?.nextStep();

        navigate(`/scenario/${res?.data?._id}`);
      } catch (error) {
        message.error('Có lỗi khi tạo kịch bản! Vui lòng thử lại');
      } finally {
        setIsLoading(false);
      }
    }
  };

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

  const handleSaveScript = async () => {
    try {
      setIsLoading(true);
      await scriptService.save({ id: scriptDetail?._id });
      message.success('Kịch bản được lưu thành công');
      formRef?.current?.nextStep();
    } catch (error) {
      message.error('Lưu kịch bản thất bại');
    } finally {
      setIsLoading(false);
    }
  };

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
    formRef?.current?.setValue('questionInput', value);

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

      formRef?.current?.setValue('questionInput', '');
      message.success('Thành công!');
    } catch (error) {
      message.error('Có lỗi! Vui lòng thử lại');
      setScriptDetail({ ...scriptDetail });
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

  // API - get prompt topic
  useEffect(() => {
    (async () => {
      const res = await promptTopicService.getAll({});
      const data = res?.data?.map((item: any) => ({ label: item?.title || '', value: item?._id || '' })) || [];
      setPromptTopicOptions(data);
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
      <PageTitle>{TITLE[currentStep]}</PageTitle>
      <BaseFormTitle style={{ marginBottom: '20px' }}>{TITLE[currentStep]}</BaseFormTitle>
      <RHFStepper
        ref={formRef}
        hideBackBtn
        isShowNavigateBtn={false}
        isShowNextBtn={false}
        onStepChange={(step: number) => {
          setCurrentStep(step);
        }}
        defaultStep={0}
        name="valuation-nested-form"
        onSubmit={(values: any) => {
          //
        }}
        initialValues={{
          url: '',
          promptTopic: '',
          reloadTime: false,
          samplefile: [],
        }}
      >
        {/* STEP 01 : ADD SCRIPT --------------------------------------------------------------------------  */}
        <RHFStep validationSchema={step1Schema}>
          <Space direction="vertical" style={{ width: '100%' }} size="large">
            <TextField label={'URL'} required={true} name="url" placeholder={t('POLARIS.INPUT_URL')} />
            {/* <Space align="center">
              <SwitchField required={true} name="reloadTime" desc="Reload Every 5h" />
            </Space> */}
            <SelectField
              required
              label={t('POLARIS.PROMPT_TOPIC')}
              placeholder={t('POLARIS.CHOOSE_PROMPT_TOPIC_PLACEHOLDER')}
              name="promptTopic"
              options={promptTopicOptions}
            />
            {/* <UploadListField
              docsOnly
              required
              multiple
              placeholder="Tải tài liệu lên"
              label="Tài liệu mẫu"
              suffixHelpText={'Định dạng .doc hoặc .docx'}
              name="samplefile"
              maxLength={5}
              listType="text"
              disabled={isLoading}
            /> */}
          </Space>
          <BaseButton
            htmlType="button"
            style={{ marginTop: '20px' }}
            onClick={handleCreateScript}
            loading={isLoading}
            disabled={isLoading}
          >
            {t('POLARIS.START')}
          </BaseButton>
        </RHFStep>
        {/* STEP 02 : SCRIPT DETAIL --------------------------------------------------------------------------  */}
        <RHFStep validationSchema={step2Schema}>
          <Row align="middle" justify="space-between">
            <Row align="middle" gutter={[10, 0]}>
              <Col>
                <BaseButton
                  size="small"
                  disabled={isLoading}
                  icon={<ArrowLeftOutlined style={{ fontSize: '20px' }} />}
                  onClick={() => {
                    formRef?.current?.prevStep();
                  }}
                />
              </Col>
              <Col>
                <Typography.Text>Quay lại</Typography.Text>
              </Col>
            </Row>

            <BaseButton htmlType="button" onClick={handleReCreateScript} loading={isLoading} disabled={isLoading}>
              Tạo lại kịch bản
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
            <BaseButton htmlType="button" onClick={handleSaveScript} disabled={isLoading} loading={isLoading}>
              Tiếp theo
            </BaseButton>
          </Row>
        </RHFStep>
        {/* STEP 03 : ADD QUESTION --------------------------------------------------------------------------  */}
        <RHFStep validationSchema={step3Schema}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <Row justify="space-between">
              <BaseButton
                htmlType="button"
                onClick={() => {
                  setOpenCreateTopicConfirm(true);
                }}
              >
                Lưu vào thư viện
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
                <Row style={{ height: '100%', display: 'grid', placeContent: 'center' }}>Chưa có câu trả lời nào</Row>
              ) : null}
              <QuestionListBox questions={questions} isLoading={isLoading} handleUpdateAnswer={handleUpdateAnswer} />
            </div>
            <Row>
              <Space style={{ width: '100%' }} direction="vertical">
                <TextField
                  name="questionInput"
                  placeholder="Nhập nội dung câu hỏi"
                  suffix={<SendOutlined />}
                  disabled={isLoading}
                  onKeyDown={(e: any) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      formRef.current?.trigger();
                      const trunText = e?.target?.value?.slice(0, 2000) || '';
                      handleAddQuestion(trunText as string);
                    }
                  }}
                />
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
                  navigate(`/scenario/${scriptDetail._id}`);
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
        </RHFStep>
      </RHFStepper>
    </>
  );
};

export default ScenarioConfigCreate;
