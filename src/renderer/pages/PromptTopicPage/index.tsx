import { PlusOutlined } from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import * as PS from '@app/pages/Pages.styles';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState, useRef } from 'react';
import { promptTopicService } from '@app/services/promptTopic.service';
import { FormProvider, useForm } from 'react-hook-form';
import { CreateTemplate } from '@app/components/templates/FormTemplate/CreateTemplate';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Row, Typography, Modal, Space, message } from 'antd';
import TextField from '@app/components/formControl/TextField';
import UploadListField from '@app/components/formControl/UploadListField';
import { useTranslation } from 'react-i18next';

const initialPagination = {
  total: 0,
};

const PromptTopicPage: React.FC = () => {
  const { t } = useTranslation();
  const pageNumRef = useRef<any>();
  const [isModalOpen, setModalOpen] = useState(false);
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  const schema = yup.object().shape({
    title: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    prompt: yup.string().required(t('POLARIS.REQUIRED_ERROR_MSG')),
    samplefile: yup.array().min(1, 'Vui lòng chọn ít nhất một file').required(t('POLARIS.REQUIRED_ERROR_MSG')),
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
      title: t('POLARIS.PROMPT_TOPIC'),
      dataIndex: 'create_at',
      width: '20%',
      render: (_, record: any) => {
        return <span>{record?.title || '  '}</span>;
      },
    },
    {
      title: t('POLARIS.COMMAND'),
      dataIndex: 'create_at',
      render: (_, record: any) => {
        return <span>{record?.prompt || ''}</span>;
      },
    },
    {
      title: t('POLARIS.CREATED_DATE'),
      width: '10%',
      dataIndex: 'create_at',
      render: (_, record: any) => <span>{moment(record?.created_at).format('DD-MM-YYYY HH:mm:ss')}</span>,
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      width: '10%',
      render: (_, record: any) => {
        return (
          <BaseSpace>
            <BaseButton
              type="default"
              danger
              size="small"
              disabled
              onClick={() => handleDeleteScript({ id: record?._id })}
            >
              {t('POLARIS.DELETE')}
            </BaseButton>
          </BaseSpace>
        );
      },
    },
  ];

  const onSubmit = async () => {
    const { title, prompt, samplefile } = formMethods.getValues();
    try {
      const formData = new FormData();
      samplefile?.map((item: any) => formData.append('files', new Blob([item?.originFileObj], { type: 'text/plain' })));
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
                <Typography.Title level={5}>{t('POLARIS.CREATE_PROMPT_TOPIC')}</Typography.Title>
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
                <UploadListField
                  docsOnly
                  required
                  multiple
                  placeholder={t('POLARIS.UPLOAD_DOCUMENT')}
                  label={t('POLARIS.DOC_SAMPLE')}
                  suffixHelpText={'Định dạng .doc hoặc .docx'}
                  name="samplefile"
                  maxLength={5}
                  listType="text"
                />
              </Space>
              <div style={{ display: 'flex', justifyContent: 'space-around', padding: '10px 0px' }}>
                <BaseButton size="middle" htmlType="submit">
                  {t('POLARIS.START')}
                </BaseButton>
              </div>
            </CreateTemplate.Form>
          </FormProvider>
        </Modal>
      </>
      <PageTitle>{t('POLARIS.PROMPT_TOPIC_LIST')}</PageTitle>
      <PS.PageHeaderWrapper>
        <BaseFormTitle>{t('POLARIS.PROMPT_TOPIC_LIST')}</BaseFormTitle>
        <BaseButton
          htmlType="button"
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => {
            setModalOpen(true);
          }}
        />
      </PS.PageHeaderWrapper>
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
    </>
  );
};

export default PromptTopicPage;
