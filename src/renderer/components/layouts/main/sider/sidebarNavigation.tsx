import { BlockOutlined } from '@ant-design/icons';
import { ArrangeSvgIcon } from '@app/components/svgIcon/arrange';
import { FolderSvgIcon } from '@app/components/svgIcon/folder';
import { InteractorSvgIcon } from '@app/components/svgIcon/interactor';
import { MediaSvgIcon } from '@app/components/svgIcon/media';
import React from 'react';

export interface SidebarNavigationItem {
  title: string;
  key: string;
  url?: string;
  children?: SidebarNavigationItem[];
  icon?: React.ReactNode;
}

export const sidebarNavigation: SidebarNavigationItem[] = [
  // {
  //   title: 'common.authPages',
  //   key: 'auth',
  //   icon: <UserOutlined />,
  //   children: [
  //     {
  //       title: 'common.login',
  //       key: 'login',
  //       url: '/auth/login',
  //     },
  //     {
  //       title: 'common.signUp',
  //       key: 'singUp',
  //       url: '/auth/sign-up',
  //     },
  //     {
  //       title: 'common.lock',
  //       key: 'lock',
  //       url: '/auth/lock',
  //     },
  //     {
  //       title: 'common.forgotPass',
  //       key: 'forgotPass',
  //       url: '/auth/forgot-password',
  //     },
  //     {
  //       title: 'common.securityCode',
  //       key: 'securityCode',
  //       url: '/auth/security-code',
  //     },
  //     {
  //       title: 'common.newPassword',
  //       key: 'newPass',
  //       url: '/auth/new-password',
  //     },
  //   ],
  // },
  // {
  //   title: 'common.forms',
  //   key: 'forms',
  //   icon: <FormOutlined />,
  //   children: [
  //     {
  //       title: 'common.advancedForms',
  //       key: 'advanced-forms',
  //       url: '/forms/advanced-forms',
  //     },
  //     {
  //       title: 'React Hook Form',
  //       key: 'form-control',
  //       url: '/ui-components/form-control',
  //     },
  //     {
  //       title: 'Create Template',
  //       key: 'form-template',
  //       url: '/ui-components/form-template',
  //     },
  //   ],
  // },
  // {
  //   title: 'common.dataTables',
  //   key: 'dataTables',
  //   url: '/data-tables',
  //   icon: <TableOutlined />,
  // },
  {
    title: 'POLARIS.LIVES_TREAM_INTERACTION',
    key: 'livestream',
    url: '/livestream',
    icon: <MediaSvgIcon />,
  },
  {
    title: 'POLARIS.CONTENT_LIBRARY',
    key: 'answerLibrary',
    url: '/answer-library',
    icon: <FolderSvgIcon />,
  },
  {
    title: 'Interactor',
    key: 'liveConfig',
    url: '/live-config',
    icon: <InteractorSvgIcon />,
  },
  {
    title: 'Configuration',
    key: 'promptTopic',
    url: '/prompt-topic',
    icon: <ArrangeSvgIcon />,
    children: [
      {
        title: 'Livestream',
        key: 'livestream',
        url: '/live-config',
      },
      {
        title: 'Scenario',
        key: 'scenario',
        url: '/prompt-topic',
      },
      {
        title: 'Prompt topic',
        key: 'promptTopic',
        url: '/prompt-topic',
      },
      {
        title: 'Categoty questions',
        key: 'categoryQuestion',
        url: '/prompt-topic',
      },
    ],
  },
];
