import React from 'react';
import * as S from './customIcon.styles';
import * as IconSource from './source';

export const IconList = {
  live: IconSource.LiveIcon,
  disk: IconSource.DiskIcon,
  config: IconSource.ConfigIcon,
};

export type IconType = keyof typeof IconList;

interface Props {
  size?: number;
  iconName?: IconType;
  path?: string;
  className?: string;
}

export const CustomIcon: React.FC<Props> = ({ iconName, path, ...props }) => (
  <S.StyledIcon {...props}>
    {iconName && <S.Image src={IconList[iconName]} />}
    {path && <S.Image src={path} />}
  </S.StyledIcon>
);
