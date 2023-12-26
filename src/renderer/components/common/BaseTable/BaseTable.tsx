/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableProps } from 'antd';
import React from 'react';
import * as S from './BaseTable.styles';

export type BaseTableProps<T> = TableProps<T>;

// TODO make generic!
export const BaseTable: React.FC<BaseTableProps<any>> = (props) => {
  return <S.Table {...props} />;
};
