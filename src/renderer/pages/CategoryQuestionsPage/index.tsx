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
import { notificationController } from '@app/controllers/notificationController';
import * as PS from '@app/pages/Pages.styles';
import { categoryQuestionsService } from '@app/services/categoryQuetions.service';
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
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

const initialPagination = {
  total: 0,
};

const CategoryQuestionsPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const pageNumRef = useRef<any>();

  const [tableData, setTableData] = useState<{
    data: BasicTableRow[];
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  async function getList(page?: number) {
    try {
      try {
        setTableData({ ...tableData, loading: true });
        const res = await categoryQuestionsService.getList({
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

  const handleDelete = async ({ id }: any) => {
    try {
      await categoryQuestionsService.delete({ id });
      notificationController.success({ message: 'Success to delete!' });
    } catch (error) {
      notificationController.error({ message: 'Fail to delete!' });
    }
  };

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    pageNumRef.current = page;
    getList(page as number);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.QUESTION_TOPIC'),
      width: 200,
      dataIndex: 'questionTopic',
      render: (_, record: any) => <span>{record?.name}</span>,
    },
    {
      title: t('POLARIS.GENERAL_QUESTIONS'),
      width: 200,
      dataIndex: 'generalQuestions',
      render: (_, record: any) => <span>{record?.questions?.length}</span>,
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
      title: t('POLARIS.UPDATER'),
      width: 200,
      dataIndex: 'generalQuestions',
      render: (_, record: any) => <span>{''}</span>,
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      width: 90,
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
                          navigate('/category-questions/edit');
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
                        onClick={() => {
                          handleDelete({ id: record?._id || '' });
                        }}
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
                onClick={() => {}}
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

  useEffect(() => {
    getList();
  }, []);

  return (
    <>
      <></>

      <PageTitle>{t('POLARIS.CATEGORY_QUESTIONS')}</PageTitle>
      <div className="">
        <div className="flex flex-row items-center">
          <p className="text-black text-[28px] font-normal">
            {t('POLARIS.CATEGORY_QUESTIONS')}
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
                navigate('/category-questions/create');
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

export default CategoryQuestionsPage;
