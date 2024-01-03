import React from 'react';
import { Outlet } from 'react-router-dom';
import { BaseLayout } from '@app/components/common/BaseLayout/BaseLayout';

const EmptyLayout: React.FC = () => {
  return (
    <BaseLayout className="w-screen h-screen">
      <Outlet />
    </BaseLayout>
  );
};

export default EmptyLayout;
