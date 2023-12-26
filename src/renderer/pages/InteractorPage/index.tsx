import { BasicTableRow, Pagination } from '@app/api/table.api';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialPagination = {
  total: 0,
};

const InteractorPage: React.FC = () => {
  const [tableData, setTableData] = useState<{
    data: BasicTableRow[];
    pagination: Pagination;
    loading: boolean;
  }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });
  const { t } = useTranslation();

  async function fetchMovies() {
    try {
      try {
      } catch (error) {}
    } catch (error) {}
  }

  useEffect(() => {
    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHandler = (params: Record<string, unknown>) => {
    fetchMovies(params);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.TITLE'),
      dataIndex: 'title',
      render: (text: string) => <span>{text}</span>,
      sorter: true,
    },
    {
      title: 'Release date',
      dataIndex: 'release_date',
      sorter: true,
    },
    {
      title: 'Vote average',
      dataIndex: 'vote_average',
      sorter: true,
    },
    {
      title: 'Vote count',
      dataIndex: 'vote_count',
      sorter: true,
    },
  ];

  return (
    <>
      <PageTitle>Interactor</PageTitle>
      <BaseFormTitle>Người tương tác</BaseFormTitle>
      <div>
        <BaseSortPaginationTable
          columns={columns}
          dataSource={tableData.data}
          pagination={false}
          loading={tableData.loading}
          total={tableData.pagination.total || 0}
          tableHandler={tableHandler}
          scroll={{ x: 800 }}
          rowKey="id"
          hideAdvancedFilter={true}
          bordered
        />
      </div>
    </>
  );
};

export default InteractorPage;
