import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import * as PS from '@app/pages/Pages.styles';
import { topicService } from '@app/services/topic.service';
import { ColumnsType } from 'antd/es/table';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import ModalImportAnswer from './components/ModalImportAnswer';
import { CardContent } from '@app/components/cardContent/CardContent';

const initialPagination = {
  total: 0,
};

const AnswerLibraryPage: React.FC = () => {
  const navigate = useNavigate();
  const [modalImportVisible, setModalImportVisible] = useState(false);
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

  async function fetchAnswerLibrary(page?: number) {
    try {
      try {
        setTableData({ ...tableData, loading: true });
        const res = await topicService.getAll({
          page: page || 1,
          pageSize: 10,
        });
        const data = res.data;
        const pagination = {
          total: res.total_data,
        };
        setTableData({ data: data, pagination, loading: false });
      } catch (error) {}
    } catch (error) {}
  }

  useEffect(() => {
    fetchAnswerLibrary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    fetchAnswerLibrary(page as number);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.TITLE'),
      dataIndex: 'code',
      render: (text: string) => <span>{text}</span>,
    },
    {
      title: t('POLARIS.TOPIC'),
      dataIndex: 'name',
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      width: '15%',
      render: (_, record: any) => {
        return (
          <BaseSpace>
            <BaseButton
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                navigate(`/answer-library/edit/${record.slug}`);
              }}
            >
              {t('POLARIS.VIEW_DETAIL')}
            </BaseButton>
          </BaseSpace>
        );
      },
    },
  ];

  return (
    <>
      <PageTitle>{t('POLARIS.CONTENT_LIBRARY')}</PageTitle>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            maxWidth: '946px',
          }}
        >
          <CardContent>
            <PS.PageHeaderWrapper>
              <BaseFormTitle>{t('POLARIS.CONTENT_LIBRARY')}</BaseFormTitle>
              <PS.ButtonGroup>
                {/* <BaseButton
            htmlType="button"
            type="primary"
            shape="circle"
            icon={<UploadOutlined />}
            onClick={() => {
              setModalImportVisible(true);
            }}
          /> */}
                <BaseButton
                  htmlType="button"
                  type="primary"
                  shape="circle"
                  icon={<PlusOutlined />}
                  onClick={() => {
                    navigate('/answer-library/create');
                  }}
                />
              </PS.ButtonGroup>
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
          </CardContent>
        </div>
      </div>

      <ModalImportAnswer
        open={modalImportVisible}
        onClose={() => {
          setModalImportVisible(false);
        }}
      />
    </>
  );
};

export default AnswerLibraryPage;
