import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { BasicTableRow, Pagination } from '@app/api/table.api';
import { BaseButton } from '@app/components/common/BaseButton/BaseButton';
import { BaseSortPaginationTable } from '@app/components/common/BaseSortPaginationTable/BaseSortPaginationTable';
import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { BaseFormTitle } from '@app/components/common/forms/components/BaseFormTitle/BaseFormTitle';
import SelectField from '@app/components/formControl/SelectField';
import * as PS from '@app/pages/Pages.styles';
import { liveSettingService } from '@app/services/liveSetting.service';
import { ColumnsType } from 'antd/lib/table';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Drawer } from 'antd';
const initialPagination = {
  total: 0,
};

const LivestreamPage: React.FC = () => {
  const [visible, setVisible] = useState(false);

  const { t } = useTranslation();
  const { id } = useParams();
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

  async function fetchCommentList(params: { [key: string]: any }) {
    if (!id) return;
    try {
      setTableData({ ...tableData, loading: true });
      const res = await liveSettingService.getComments(id, {
        ...params,
        page: params.page || 1,
        pageSize: 10,
      });
      const data = res.data;
      const pagination = {
        total: res.total_data,
      };
      setTableData({ data: data, pagination, loading: false });
    } catch (error) {}
  }

  useEffect(() => {
    if (id) {
      fetchCommentList({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const tableHandler = (params: Record<string, unknown>) => {
    const page = params?.page || 1;
    const platform = params?.platform || '';
    const is_replied = params?.is_replied
      ? params?.is_replied === 'true'
        ? true
        : false
      : '';
    fetchCommentList({
      page,
      ...(platform && { platform }),
      ...(is_replied && { is_replied }),
    });
  };

  const columns: ColumnsType<BasicTableRow> = [
    {
      title: t('POLARIS.NAME'),
      dataIndex: 'nickname',
      render: (nickname: string, record: any) => {
        return nickname || record.username || '-';
      },
    },
    {
      title: t('POLARIS.COMMENT'),
      dataIndex: 'content',
      render: (content: string, record: any) => {
        return content || record.message || '-';
      },
    },
    {
      title: t('POLARIS.PLATFORM'),
      dataIndex: 'platform',
      render: (platform: string) => {
        return (
          <div
            style={{
              textTransform: 'capitalize',
            }}
          >
            {platform}
          </div>
        );
      },
    },
    {
      title: t('POLARIS.TIME'),
      dataIndex: 'commented_at',
      render: (commentedAt: string) => (
        <span>{moment(commentedAt).format('DD-MM-YYYY HH:mm:ss')}</span>
      ),
    },
  ];

  const advanceFilter = () => {
    return (
      <>
        <SelectField
          label={t('POLARIS.PLATFORM')}
          placeholder={t('POLARIS.CHOOSE_YOUR_PLATFORM')}
          name="platform"
          options={[
            { label: 'Tất cả', value: '' },
            { label: 'Telegram', value: 'telegram' },
            { label: 'Youtube', value: 'youtube' },
            { label: 'Tiktok', value: 'tiktok' },
          ]}
        />
        <SelectField
          label={t('POLARIS.STATUS')}
          placeholder={t('POLARIS.CHOOSE_YOUR_STATUS')}
          name="is_replied"
          options={[
            { label: 'Tất cả', value: '' },
            { label: 'Đã trả lời', value: 'true' },
            { label: 'Chưa trả lời', value: 'false' },
          ]}
        />
      </>
    );
  };

  return (
    <>
      <PageTitle>{t('POLARIS.LIVE_STREAM_COMMENT_LIST')}</PageTitle>
      <PS.PageHeaderWrapper>
        <BaseFormTitle>{t('POLARIS.LIVE_STREAM_COMMENT_LIST')}</BaseFormTitle>

        {/* <BaseButton htmlType="button" type="primary">
          Kết thúc
        </BaseButton> */}
      </PS.PageHeaderWrapper>
      <div>
        <BaseButton
          htmlType="button"
          type="primary"
          onClick={() => {
            navigate(`/livestream/edit/${id}`);
          }}
        >
          {t('POLARIS.LIVESTREAM_CONFIGURATOR')}
        </BaseButton>
      </div>
      <div>
        <BaseButton className="mt-5" onClick={() => setVisible(true)}>
          Show Live Stream
        </BaseButton>
        {visible ? (
          <Drawer
            open={visible}
            onClose={() => setVisible(false)}
            width="100VW"
          >
            <webview
              id="foo"
              src={`https://staging.polarista.ai/render?live_setting=${
                id || ''
              }`}
              style={{
                display: 'flex',
                margin: 'auto',
                width: '1080px',
                height: '1920px',
              }}
            ></webview>
          </Drawer>
        ) : null}
      </div>
      <div style={{ overflow: 'scroll' }}>
        <BaseSortPaginationTable
          columns={columns}
          dataSource={tableData.data}
          pagination={false}
          loading={tableData.loading}
          total={tableData.pagination.total || 0}
          tableHandler={tableHandler}
          scroll={{ x: 800 }}
          hideAdvancedFilter={false}
          rowKey="_id"
          advanceFilter={advanceFilter()}
        />
      </div>
    </>
  );
};

export default LivestreamPage;
