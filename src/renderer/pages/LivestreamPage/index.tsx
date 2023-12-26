import { EyeOutlined, PlusOutlined } from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { BaseSpace } from '@app/components/common/BaseSpace/BaseSpace';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import * as PS from '@app/pages/Pages.styles';
import { liveSettingService } from '@app/services/liveSetting.service';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const initialPagination = {
  total: 0,
};

const LivestreamPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<{ data: BasicTableRow[]; pagination: Pagination; loading: boolean }>({
    data: [],
    pagination: initialPagination,
    loading: false,
  });

  async function fetchLivestream(page?: number) {
    try {
      try {
        setTableData({ ...tableData, loading: true });
        const res = await liveSettingService.getAll({
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
    fetchLivestream();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    fetchLivestream(page as number);
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.LIVE_DATE'),
      dataIndex: 'create_at',
      render: (create_at: string) => <span>{moment(create_at).format('DD-MM-YYYY HH:mm:ss')}</span>,
    },
    {
      title: t('POLARIS.PLATFORM'),
      dataIndex: 'linkTelegram',
      render: (linkTelegram: string, record: any) => {
        const flatforms = [];
        if (linkTelegram) {
          flatforms.push('Telegram');
        }
        if (record?.linkTwitter) {
          flatforms.push('Twitter');
        }
        if (record?.linkYoutube) {
          flatforms.push('Youtube');
        }
        return <div>{flatforms.join(', ')}</div>;
      },
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      width: '10%',
      render: (_, record: any) => {
        return (
          <BaseSpace>
            <BaseButton
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => {
                navigate(`/livestream/view/${record._id}`);
              }}
            >
              {t('POLARIS.VIEW_DETAIL')}
            </BaseButton>
            {/* <BaseButton type="default" danger>
              {t('tables.delete')}
            </BaseButton> */}
          </BaseSpace>
        );
      },
    },
  ];

  return (
    <>
      <PageTitle>{t('POLARIS.LIVE_STREAM_SESSIONS')}</PageTitle>
      <CardContent>
        <PS.PageHeaderWrapper>
          <BaseFormTitle>{t('POLARIS.LIVE_STREAM_SESSIONS')}</BaseFormTitle>
          <BaseButton
            htmlType="button"
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={() => {
              navigate('/livestream/create');
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
      </CardContent>
    </>
  );
};

export default LivestreamPage;
