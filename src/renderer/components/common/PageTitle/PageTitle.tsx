import { WithChildrenProps } from '@app/types/generalTypes';
import React from 'react';

export const PageTitle: React.FC<WithChildrenProps> = ({ children }) => {
  return (
    <div>
      <title>{children} | Polaris Admin</title>
    </div>
  );
};
