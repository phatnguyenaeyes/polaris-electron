/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseSquareOutlined, FilterOutlined } from '@ant-design/icons';
import { TablePaginationConfig, TableProps } from 'antd';
import { FilterValue, SorterResult } from 'antd/lib/table/interface';
import React, { MutableRefObject, ReactNode, useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { BaseButton } from '../BaseButton/BaseButton';
import { BasePagination } from '../BasePagination/BasePagination';
import * as S from './BaseSortPaginationTable.styles';
import { BaseTable } from '../BaseTable/BaseTable';
import { useTranslation } from 'react-i18next';

// sorter: SorterResult<any> | SorterResult<any>[],

// type BaseTableProps<T> = TableProps<T>;
interface BaseTableProps<T> extends TableProps<T> {
  total: number;
  tableHandler?: (params: Record<string, any>) => void;
  advanceFilter?: ReactNode;
  hideAdvancedFilter?: boolean;
  hideSearch?: boolean;
}

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}

// TODO make generic!
export const BaseSortPaginationTable: React.FC<BaseTableProps<any>> = (props) => {
  const { tableHandler, total, advanceFilter, hideAdvancedFilter = true, hideSearch = true, ...remainingProps } = props;
  const { t } = useTranslation();
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [tableParams, setTableParams] = useState<Record<string, any>>({});
  const methods = useForm({
    defaultValues: {},
  });

  function triggerTableChange(params: Record<string, any>) {
    const newTableParams = {
      ...tableParams,
      ...params,
    };
    setTableParams(newTableParams);
    if (typeof tableHandler === 'function') {
      tableHandler(newTableParams);
    }
  }

  const onChange = (
    _pagi: TablePaginationConfig,
    _filter: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    const sortField = (sorter as SorterResult<DataType>).field;
    const sortOrder = (sorter as SorterResult<DataType>).order;
    let sort_by: string | undefined;
    if (sortOrder) {
      const ownSortOrder = sortOrder === 'ascend' ? 'asc' : 'desc';
      sort_by = `${sortField}.${ownSortOrder}`;
    }
    triggerTableChange({
      sort_by,
    });
  };

  const onPageChange = (page: number) => {
    triggerTableChange({
      page,
    });
  };
  const onSearch = (year: string) => {
    triggerTableChange({
      ...(year ? { year: 2023 } : { year: 2021 }),
      page: 1,
    });
  };

  const onSubmitForm = (values = {}) => {
    triggerTableChange({ ...values, page: 1 });
  };

  return (
    <div>
      <S.TableSearchWrapper>
        {!hideSearch && <S.TableSearchInput placeholder="Nhập vào từ khoá" allowClear onSearch={onSearch} />}
        {!hideAdvancedFilter && (
          <BaseButton
            style={{ height: '56px', marginLeft: '12px' }}
            type="primary"
            htmlType="button"
            onClick={() => {
              setVisibleFilter(!visibleFilter);
            }}
            icon={<FilterOutlined />}
          />
        )}
      </S.TableSearchWrapper>
      <S.TableAdvancedFilterWrapper>
        <ContentExpandable active={visibleFilter} onClose={() => setVisibleFilter(false)}>
          {/* <div className="header">
            <div>Lọc</div>
          </div> */}
          <div className="body">
            <FormProvider {...methods}>
              <form name={'advance-search-form'} onSubmit={methods.handleSubmit(onSubmitForm)}>
                <div style={{ marginBottom: '24px', paddingTop: '24px' }}>{advanceFilter}</div>
                <S.FilterButtonContainer>
                  <BaseButton
                    type="primary"
                    htmlType="submit"
                    onClick={() => {
                      setVisibleFilter(false);
                    }}
                  >
                    {t('POLARIS.APPLY')}
                  </BaseButton>
                  <BaseButton
                    htmlType="submit"
                    onClick={() => {
                      methods.reset();
                    }}
                  >
                    {t('POLARIS.CANCEL_FILTER')}
                  </BaseButton>
                </S.FilterButtonContainer>
              </form>
            </FormProvider>
            <br />
          </div>
        </ContentExpandable>
      </S.TableAdvancedFilterWrapper>
      <BaseTable
        {...remainingProps}
        locale={{
          emptyText: 'Không có dữ liệu',
        }}
        onChange={onChange}
      />
      <div
        style={{
          marginTop: 24,
          marginBottom: 24,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <BasePagination
          defaultCurrent={1}
          current={tableParams?.page || 1}
          total={total}
          defaultPageSize={10}
          showSizeChanger={false}
          onChange={onPageChange}
        />
      </div>
    </div>
  );
};

const ContentExpandable = ({ active, onClose, ...props }: { active: boolean; onClose: () => void; children: any }) => {
  const content = useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;
  const [height, setHeight] = useState('0px');

  useEffect(() => {
    setHeight(!active ? '0px' : `${content.current.scrollHeight}px`);
  }, [active]);

  return (
    <S.ContentExpandable
      ref={content}
      style={{
        maxHeight: height,
      }}
    >
      <div className="close-btn" onClick={onClose}>
        <CloseSquareOutlined style={{ fontSize: '20px' }} />
      </div>
      <div>{props.children}</div>
    </S.ContentExpandable>
  );
};
