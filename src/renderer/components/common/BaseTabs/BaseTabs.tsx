import { Tabs as AntdTabs, TabsProps } from 'antd';
import * as S from './BaseTabs.styles';

export type BaseTabsProps = TabsProps;

interface BaseTabsInterface extends React.FC<BaseTabsProps> {
  TabPane: typeof AntdTabs.TabPane;
}

export const BaseTabs: BaseTabsInterface = ({ ...props }) => {
  return <S.StyledTabs {...props} />;
};

BaseTabs.TabPane = AntdTabs.TabPane;
