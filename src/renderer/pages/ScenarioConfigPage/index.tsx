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
import { useNavigate } from 'react-router-dom';
import { scriptService } from '@app/services/script.service';
import { message } from 'antd';
import { useTranslation } from 'react-i18next';

const initialPagination = {
  total: 0,
};

const ScenarioConfigPage: React.FC = () => {
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

  async function getScriptList(page?: number) {
    try {
      try {
        setTableData({ ...tableData, loading: true });
        const res = await scriptService.getAll({
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
    try {
      await scriptService.delete(id);
      getScriptList(pageNumRef.current);
      message.success('Xoá kịch bản thành công');
    } catch (error) {
      message.error('Xoá kịch bản thất bại');
    }
  };

  useEffect(() => {
    getScriptList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    pageNumRef.current = page;
    getScriptList(page as number);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.TITLE'),
      dataIndex: 'title',
      width: '20%',
      render: (_, record: any) => {
        return <span>{record?.data?.title || '  '}</span>;
      },
    },
    {
      title: t('POLARIS.LINK'),
      dataIndex: 'create_at',
      render: (_, record: any) => (
        <a href={record?.data?.url || ''} target="_blank" rel="noreferrer">
          {record?.data?.url || ''}
        </a>
      ),
    },
    {
      title: t('POLARIS.CREATED_DATE'),
      dataIndex: 'create_at',
      render: (_, record: any) => (
        <span>{moment(record?.created_at).format('DD-MM-YYYY HH:mm:ss')}</span>
      ),
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      width: '10%',
      render: (_, record: any) => {
        return (
          <BaseSpace>
            <BaseButton
              type="ghost"
              size="small"
              onClick={() => {
                navigate(`/scenario/${record._id}`);
              }}
            >
              {t('POLARIS.VIEW_DETAIL')}
            </BaseButton>
            <BaseButton
              type="default"
              danger
              size="small"
              onClick={() => handleDeleteScript({ id: record?._id })}
            >
              {t('POLARIS.DELETE')}
            </BaseButton>
          </BaseSpace>
        );
      },
    },
  ];

  return (
    <>
      <PageTitle>{t('POLARIS.SCRIPT_LIST')}</PageTitle>
      <PS.PageHeaderWrapper>
        <BaseFormTitle>{t('POLARIS.SCRIPT_LIST')}</BaseFormTitle>
        <BaseButton
          htmlType="button"
          type="primary"
          shape="circle"
          icon={<PlusOutlined />}
          onClick={() => {
            navigate('/scenario/create');
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

export default ScenarioConfigPage;
