import React, { Suspense } from 'react';
import { BrowserRouter, Navigate, useRoutes } from 'react-router-dom';
import { Provider } from 'react-redux';
import LoginPage from '@app/pages/LoginPage';
import { useAppSelector } from '@app/hooks/reduxHooks';

import './App.css';
import '@app/i18n';
import { store } from '@app/store/store';
import { ThemeContextProvider } from '@app/contexts/ThemeContext';
import { withLoading } from '@app/hocs/withLoading.hoc';
import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/layouts/profile/ProfileLayout';
import {
  Alert,
  Confirm,
  ConfirmationServiceProvider,
} from './contexts/confirmation/ConfirmationProvider';

// no lazy loading for auth pages to avoid flickering
const AuthLayout = React.lazy(
  () => import('@app/components/layouts/AuthLayout/AuthLayout'),
);

const LivestreamPage = React.lazy(() => import('@app/pages/LivestreamPage'));
const LivestreamViewPage = React.lazy(
  () => import('@app/pages/LivestreamPage/LivestreamView'),
);
const LivestreamCreatePage = React.lazy(
  () => import('@app/pages/LivestreamPage/LivestreamCreate'),
);
const LivestreamEditPage = React.lazy(
  () => import('@app/pages/LivestreamPage/LivestreamEdit'),
);
const AnswerLibraryPage = React.lazy(
  () => import('@app/pages/AnswerLibraryPage'),
);
const AnswerLibraryCreatePage = React.lazy(
  () => import('@app/pages/AnswerLibraryPage/AnswerLibraryCreate'),
);
const AnswerLibraryEditPage = React.lazy(
  () => import('@app/pages/AnswerLibraryPage/AnswerLibraryEdit'),
);
const AnswerLibraryScriptPage = React.lazy(
  () => import('@app/pages/AnswerLibraryPage/AnswerLibraryScript'),
);
const AnswerLibraryScriptTopicPage = React.lazy(
  () => import('@app/pages/AnswerLibraryPage/AnswerLibraryScriptTopic'),
);
const InteractorPage = React.lazy(() => import('@app/pages/InteractorPage'));
const LiveConfigPage = React.lazy(() => import('@app/pages/LiveConfigPage'));
const PromptTopicPage = React.lazy(() => import('@app/pages/PromptTopicPage'));
const ScenarioConfigPage = React.lazy(
  () => import('@app/pages/ScenarioConfigPage'),
);
const ScenarioConfigCreatePage = React.lazy(
  () => import('@app/pages/ScenarioConfigPage/ScenarioConfigCreate'),
);
const ScenarioConfigGeneratePage = React.lazy(
  () => import('@app/pages/ScenarioConfigPage/ScenarioConfigGenerate'),
);
const ScenarioConfigDetailPage = React.lazy(
  () => import('@app/pages/ScenarioConfigPage/ScenarioConfigDetail'),
);

const Error404Page = React.lazy(() => import('@app/pages/Error404Page'));
const PersonalInfoPage = React.lazy(
  () => import('@app/pages/PersonalInfoPage'),
);
const NotificationsPage = React.lazy(
  () => import('@app/pages/NotificationsPage'),
);
const Logout = React.lazy(() => import('@app/components/router/Logout'));
const ServerErrorPage = React.lazy(() => import('@app/pages/ServerErrorPage'));

export const NFT_DASHBOARD_PATH = '/';
export const MEDICAL_DASHBOARD_PATH = '/medical-dashboard';

// UI Components

const Livestream = withLoading(LivestreamPage);
const LivestreamCreate = withLoading(LivestreamCreatePage);
const LivestreamEdit = withLoading(LivestreamEditPage);
const LivestreamView = withLoading(LivestreamViewPage);
const AnswerLibrary = withLoading(AnswerLibraryPage);
const AnswerLibraryCreate = withLoading(AnswerLibraryCreatePage);
const AnswerLibraryEdit = withLoading(AnswerLibraryEditPage);
const AnswerLibraryScript = withLoading(AnswerLibraryScriptPage);
const AnswerLibraryScriptTopic = withLoading(AnswerLibraryScriptTopicPage);
const Interactor = withLoading(InteractorPage);
const LiveConfig = withLoading(LiveConfigPage);
const PromptTopic = withLoading(PromptTopicPage);
const ScenarioConfig = withLoading(ScenarioConfigPage);
const ScenarioConfigCreate = withLoading(ScenarioConfigCreatePage);
const ScenarioConfigGenerate = withLoading(ScenarioConfigGeneratePage);
const ScenarioConfigDetailGenerate = withLoading(ScenarioConfigDetailPage);

const ServerError = withLoading(ServerErrorPage);
const Error404 = withLoading(Error404Page);

// Profile
const PersonalInfo = withLoading(PersonalInfoPage);
const Notifications = withLoading(NotificationsPage);

const AuthLayoutFallback = withLoading(AuthLayout);
const LogoutFallback = withLoading(Logout);

const Routing = () => {
  const token = useAppSelector((state) => state.auth.token);

  const unAuthRoutes = {
    path: '/auth',
    element: !token ? <AuthLayoutFallback /> : <Navigate to="/" />,
    children: [{ path: 'login', element: <LoginPage /> }],
  };

  const authRoutes = {
    path: '/',
    element: token ? <AuthLayout /> : <Navigate to="/auth/login" />,
    children: [
      {
        path: '*',
        element: <Navigate to={{ pathname: 'livestream' }} />,
      },
      {
        path: '',
        element: <Navigate to={{ pathname: 'livestream' }} />,
      },
      {
        path: 'livestream',
        element: <MainLayout />,
        children: [
          { path: '', element: <Livestream /> },
          { path: 'create', element: <LivestreamCreate /> },
          { path: 'edit/:id', element: <LivestreamEdit /> },
          { path: 'view/:id', element: <LivestreamView /> },
        ],
      },
      {
        path: 'answer-library',
        element: <MainLayout />,
        children: [
          { path: '', element: <AnswerLibrary /> },
          { path: 'create', element: <AnswerLibraryCreate /> },
          { path: 'edit/:slug', element: <AnswerLibraryEdit /> },
          { path: 'script/:slug', element: <AnswerLibraryScript /> },
          {
            path: 'existing-topic/:slug/script/:scriptId',
            element: <AnswerLibraryScriptTopic />,
          },
        ],
      },
      {
        path: 'interactor',
        element: <MainLayout />,
        children: [{ path: '', element: <Interactor /> }],
      },
      {
        path: 'live-config',
        element: <MainLayout />,
        children: [{ path: '', element: <LiveConfig /> }],
      },
      {
        path: 'prompt-topic',
        element: <MainLayout />,
        children: [{ path: '', element: <PromptTopic /> }],
      },
      {
        path: 'scenario',
        element: <MainLayout />,
        children: [
          { path: '', element: <ScenarioConfig /> },
          { path: 'create', element: <ScenarioConfigCreate /> },
          { path: 'generate', element: <ScenarioConfigGenerate /> },
          { path: ':id', element: <ScenarioConfigDetailGenerate /> },
        ],
      },
      {
        path: 'server-error',
        element: <ServerError />,
      },
      {
        path: 'profile',
        element: <ProfileLayout />,
        children: [
          { path: 'personal-info', element: <PersonalInfo /> },
          { path: 'notifications', element: <Notifications /> },
        ],
      },
      {
        path: '/*',
        element: <Navigate to="/404" replace />,
      },
      {
        path: 'logout',
        element: <LogoutFallback />,
      },
    ],
  };

  const routes = useRoutes([authRoutes, unAuthRoutes]);
  return <Suspense fallback={<p>Loading</p>}>{routes}</Suspense>;
};

export default function App() {
  return (
    <Provider store={store}>
      <ConfirmationServiceProvider>
        <ThemeContextProvider>
          <BrowserRouter>
            <Confirm />
            <Alert />
            <Routing />
          </BrowserRouter>
        </ThemeContextProvider>
      </ConfirmationServiceProvider>
    </Provider>
  );
}
