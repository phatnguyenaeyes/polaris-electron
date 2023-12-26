import { CollapseProps, Collapse as AntdCollapse } from 'antd';
import * as S from './BaseCollapse.styles';

export type BaseCollapseProps = CollapseProps;

interface BaseCollapseInterface extends React.FC<BaseCollapseProps> {
  Panel: typeof AntdCollapse.Panel;
}

export const BaseCollapse: BaseCollapseInterface = (props) => {
  return <S.StyledCollapse {...props} />;
};

BaseCollapse.Panel = AntdCollapse.Panel;
