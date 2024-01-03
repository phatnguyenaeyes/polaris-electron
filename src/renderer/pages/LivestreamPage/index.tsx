import React, { useEffect, useState } from 'react';
import {
  EyeOutlined,
  PlusOutlined,
  EyeTwoTone,
  SearchOutlined,
} from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { CardContent } from '@app/components/cardContent/CardContent';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseInput } from '@app/components/common/inputs/BaseInput/BaseInput';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { NewStreamIcon } from '@app/components/common/icons/StreamIcon';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import * as PS from '@app/pages/Pages.styles';
import { liveSettingService } from '@app/services/liveSetting.service';
import { ColumnsType } from 'antd/es/table';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { showConfirm } from '@app/contexts/confirmation/ConfirmationProvider';

import {
  EndLiveStatusIcon,
  StartLiveStatusIcon,
} from '@app/components/common/icons/LiveStatusIcon';

const initialPagination = {
  total: 0,
};

const LivestreamPage: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<{
    data: BasicTableRow[];
    pagination: Pagination;
    loading: boolean;
  }>({
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
      title: 'Livestream name',
      dataIndex: 'name',
      render: (_: any, record: any) => <span>{record?.name || ''}</span>,
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
      title: t('POLARIS.LIVE_DATE'),
      dataIndex: 'create_at',
      render: (_: any, record: any) => (
        <span>{moment(record?.create_at).format('hh:mm A DD/MM/YYYY')}</span>
      ),
    },
    {
      title: t('POLARIS.STATUS'),
      dataIndex: 'status',
      render: (_: any, record: any) => (
        <div className="flex flex-row items-center gap-x-[10px]">
          {record?.status === 'START' ? <StartLiveStatusIcon /> : null}
          {record?.status === 'START' ? (
            <span className="text-[#38BA18]">Đang live</span>
          ) : null}

          {record?.status === 'END' ? <EndLiveStatusIcon /> : null}
          {record?.status === 'END' ? (
            <span className="text-[#FF5A53]">Đã kết thúc</span>
          ) : null}
        </div>
      ),
    },
    {
      title: 'Script duration',
      dataIndex: 'create_at',
      render: (_: any, record: any) => <span>{record?.scriptDuration}</span>,
    },
    {
      title: 'Live duration',
      dataIndex: 'create_at',
      render: (_: any, record: any) => <span>{record?.liveDuration}</span>,
    },
    {
      title: t('POLARIS.ACTION'),
      dataIndex: 'actions',
      width: '10%',
      render: (_, record: any) => {
        return (
          <div>
            <BaseButton
              type="text"
              size="small"
              icon={<EyeTwoTone twoToneColor="#0085FF" />}
              onClick={() => {
                navigate(`/livestream/view/${record._id}`);
              }}
            >
              <span className="underline text-[#0085FF] text-[17px] font-normal">
                {t('POLARIS.VIEW_DETAIL')}
              </span>
            </BaseButton>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <PageTitle>{t('POLARIS.LIVE_STREAM_SESSIONS')}</PageTitle>
      <div>
        <div className="mt-[4px] flex flex-row justify-end gap-x-[23px]">
          <BaseInput
            prefix={<SearchOutlined />}
            className="w-[477px] !bg-white"
            placeholder="Search Answer"
            bordered={false}
          />
          <BaseButton
            htmlType="button"
            type="primary"
            icon={<NewStreamIcon />}
            onClick={() => {
              navigate('/livestream/create');
            }}
            className="rounded-[12px]"
          >
            New Stream
          </BaseButton>
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

export default LivestreamPage;
