import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import { MoreIcon } from '@app/components/common/icons/MoreIcon';

import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import * as PS from '@app/pages/Pages.styles';
import { promptTopicService } from '@app/services/promptTopic.service';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Dropdown,
  message,
  Modal,
  Row,
  Space,
  Tooltip,
  Typography,
} from 'antd';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const initialPagination = {
  total: 0,
};

const PromptTopicPage: React.FC = () => {
  const { t } = useTranslation();
  const pageNumRef = useRef<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [isModalOpen02, setModalOpen02] = useState(false);
  const [currentPromptTopic, setCurrentPromptTopic] = useState({});

  const [tableData, setTableData] = useState<{
    data: BasicTableRow[];
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  const schema = yup.object().shape({
    title: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    prompt: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    samplefile: yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một file')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      questionInput: '',
    },
  });

  async function getPromptTopicList(page?: number) {
    try {
      try {
        setTableData({ ...tableData, loading: true });
        const res = await promptTopicService.getAll({
          page: page || 1,
          pageSize: 10,
        });

        pageNumRef.current = page;
        const data = res.data;

        const pagination = {
          total: res.total_data,
        };
        setTableData({ data: data, pagination, loading: false });
      } catch (error) {}
    } catch (error) {}
  }

  // TODO:
  const handleDeleteScript = async ({ id }: any) => {
    // try {
    //   await promptTopicService.delete(id);
    //   getPromptTopicList(pageNumRef.current);
    //   message.success('Xoá kịch bản thành công');
    // } catch (error) {
    //   message.error('Xoá kịch bản thất bại');
    // }
  };

  useEffect(() => {
    getPromptTopicList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    pageNumRef.current = page;
    getPromptTopicList(page as number);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.TOPIC'),
      width: 200,
      dataIndex: 'topic',
      render: (_, record: any) => {
        return <span>{record?.title || '  '}</span>;
      },
    },
    {
      title: t('POLARIS.PROMPT'),
      dataIndex: 'promt',
      render: (_, record: any) => {
        return <span>{record?.prompt || ''}</span>;
      },
    },
    {
      title: t('POLARIS.DATE_CREATED'),
      width: 200,
      dataIndex: 'date_created',
      render: (_, record: any) => (
        <span>{moment(record?.create_at).format('DD/MM/YYYY')}</span>
      ),
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      render: (_, record: any) => {
        return (
          <>
            <Dropdown
              placement="bottom"
              className=""
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <div
                        className="w-[100px] cursor-pointer text-[15px] font-normal opacity-60"
                        onClick={() => {
                          setModalOpen02(true);
                          setCurrentPromptTopic(record);
                          console.log(
                            '🚀 ~ file: index.tsx:154 ~ record:',
                            record,
                          );
                        }}
                      >
                        {t('POLARIS.EDIT')}
                      </div>
                    ),
                  },
                  {
                    type: 'divider',
                  },
                  {
                    key: '2',
                    label: (
                      <div
                        className="w-[100px] cursor-pointer text-[15px] font-normal opacity-60"
                        onClick={() => handleDeleteScript({ id: record?._id })}
                      >
                        {t('POLARIS.DELETE')}
                      </div>
                    ),
                  },
                ],
              }}
            >
              <BaseButton
                type="default"
                danger
                size="small"
                disabled
                className="w-[73px] !rounded-[69px] bg-[#B6B6B6] shadow-[2px_2px_4px_0px_rgba(0,_0,_0,_0.25)] py-[4px] px-[6px] border-none"
                onClick={() => handleDeleteScript({ id: record?._id })}
              >
                <MoreIcon />
                <span className="text-[15px] font-normal text-white">more</span>
              </BaseButton>
            </Dropdown>
          </>
        );
      },
    },
  ];

  return (
    <>
      <>
        <PromptTopicCreateModal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}
          t={t}
          getPromptTopicList={getPromptTopicList}
        />
        <PromptTopicEditModal
          isModalOpen={isModalOpen02}
          setModalOpen={setModalOpen02}
          t={t}
          currentPromptTopic={currentPromptTopic}
        />
      </>

      <PageTitle>{t('POLARIS.CONFIGURE_TOPIC_GROUP')}</PageTitle>
      <div className="">
        <div className="flex flex-row items-center">
          <p className="text-black text-[28px] font-normal">
            {t('POLARIS.CONFIGURE_TOPIC_GROUP')}
          </p>
          <div className="mt-[4px] flex flex-1 flex-row justify-end gap-x-[23px]">
            <BaseInput
              prefix={<SearchOutlined />}
              className="w-[477px] !bg-white"
              placeholder={t('POLARIS.SEARCH_TOPICS')}
              bordered={false}
            />

            <BaseButton
              htmlType="button"
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => {
                setModalOpen(true);
              }}
            >
              {t('POLARIS.CREATE_NEW')}
            </BaseButton>
          </div>
        </div>
        <div>
          <BaseSortPaginationTable
            columns={columns}
            dataSource={tableData.data}
            pagination={false}
            loading={tableData.loading}
            total={tableData.pagination.total || 0}
            tableHandler={tableHandler}
            scroll={{ x: 800 }}
            rowKey="_id"
            hideAdvancedFilter={true}
          />
        </div>
      </div>
    </>
  );
};

const PromptTopicCreateModal: React.FC<any> = ({
  isModalOpen,
  setModalOpen,
  t,
  getPromptTopicList,
}) => {
  const schema = yup.object().shape({
    title: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    prompt: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    samplefile: yup
      .array()
      .min(1, 'Vui lòng chọn ít nhất một file')
      .required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      questionInput: '',
    },
  });

  const onSubmit = async () => {
    const { title, prompt, samplefile } = formMethods.getValues();
    try {
      const formData = new FormData();
      samplefile?.map((item: any) =>
        formData.append(
          'files',
          new Blob([item?.originFileObj], { type: 'text/plain' }),
        ),
      );
      formData.append('title', title);
      formData.append('prompt', prompt);
      // formData.append('prompt_topic_id', values?.promptTopic);
      await promptTopicService.create(formData);
      message.success('Tạo nhóm chủ đề thành công!');
      getPromptTopicList();
      setModalOpen(false);
    } catch (error) {
      message.error('Tạo nhóm chủ đề không thành công!');
    } finally {
      formMethods.reset();
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setModalOpen(false);
          formMethods.reset();
        }}
        footer={null}
        destroyOnClose
        centered
      >
        <FormProvider {...formMethods}>
          <CreateTemplate.Form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Typography.Title level={5}>
                {t('POLARIS.CREATE_PROMPT_TOPIC')}
              </Typography.Title>
            </Row>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <TextField
                label={t('POLARIS.GROUP_NAME')}
                required={true}
                name="title"
                placeholder={t('POLARIS.INPUT_GROUP_NAME')}
              />
              <TextField
                label={t('POLARIS.COMMAND')}
                required={true}
                name="prompt"
                placeholder={t('POLARIS.INPUT_COMMAND')}
              />
              <div className="upload-list-file-custom-doc">
                <UploadListField
                  docsOnly
                  required
                  multiple
                  placeholder={t('POLARIS.UPLOAD_DOCUMENT')}
                  suffixHelpText={'Định dạng .doc hoặc .docx'}
                  name="samplefile"
                  maxLength={5}
                  listType="text"
                />
              </div>
            </Space>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '10px 0px',
              }}
            >
              <BaseButton size="middle" htmlType="submit">
                {t('POLARIS.START')}
              </BaseButton>
            </div>
          </CreateTemplate.Form>
        </FormProvider>
      </Modal>
    </>
  );
};

const PromptTopicEditModal: React.FC<any> = ({
  isModalOpen,
  setModalOpen,
  t,
  currentPromptTopic,
}) => {
  const schema = yup.object().shape({
    title: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    prompt: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
  });

  const formMethods = useForm<any>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      prompt: '',
      samplefile: null,
    },
  });

  useEffect(() => {
    formMethods.setValue('title', currentPromptTopic?.title || '');
    formMethods.setValue('prompt', currentPromptTopic?.prompt || '');
    formMethods.setValue('samplefile', null);
  }, [currentPromptTopic]);

  const onSubmit = () => {};

  return (
    <>
      <Modal
        open={isModalOpen}
        onCancel={() => {
          setModalOpen(false);
          formMethods.reset();
        }}
        footer={null}
        destroyOnClose
        centered
      >
        <FormProvider {...formMethods}>
          <CreateTemplate.Form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <Row style={{ paddingTop: '20px', paddingBottom: '20px' }}>
              <Typography.Title level={5}>
                {t('POLARIS.EDIT_PROMPT_TOPIC')}
              </Typography.Title>
            </Row>
            <Space direction="vertical" size="large" style={{ width: '100%' }}>
              <TextField
                label={t('POLARIS.GROUP_NAME')}
                required={true}
                name="title"
                placeholder={t('POLARIS.INPUT_GROUP_NAME')}
              />
              <TextField
                label={t('POLARIS.COMMAND')}
                required={true}
                name="prompt"
                placeholder={t('POLARIS.INPUT_COMMAND')}
              />
              <div className="upload-list-file-custom-doc">
                <UploadListField
                  docsOnly
                  multiple
                  placeholder={t('POLARIS.UPLOAD_DOCUMENT')}
                  suffixHelpText={'Định dạng .doc hoặc .docx'}
                  name="samplefile"
                  maxLength={5}
                  listType="text"
                />
              </div>
            </Space>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                padding: '10px 0px',
              }}
            >
              <BaseButton size="middle" htmlType="submit">
                {t('POLARIS.UPDATE')}
              </BaseButton>
            </div>
          </CreateTemplate.Form>
        </FormProvider>
      </Modal>
    </>
  );
};

export default PromptTopicPage;
