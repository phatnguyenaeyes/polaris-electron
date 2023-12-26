import MainLayout from '@app/components/layouts/main/MainLayout/MainLayout';
import ProfileLayout from '@app/components/layouts/profile/ProfileLayout';
import RequireAuth from '@app/components/router/RequireAuth';
import { withLoading } from '@app/hocs/withLoading.hoc';

import LoginPage from '@app/pages/LoginPage';
import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import UnrequireAuth from './UnrequireAuth';

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
const Logout = React.lazy(() => import('./Logout'));
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

export function AppRouter() {
  const protectedLayout = (
    <RequireAuth>
      <MainLayout />
    </RequireAuth>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NFT_DASHBOARD_PATH} element={protectedLayout}>
          {/* <Route index element={<NftDashboard />} /> */}
          <Route index element={<Navigate to="livestream" replace />} />
          <Route path="livestream">
            <Route path="" element={<Livestream />} />
            <Route path="create" element={<LivestreamCreate />} />
            <Route path="edit/:id" element={<LivestreamEdit />} />
            <Route path="view/:id" element={<LivestreamView />} />
          </Route>
          <Route path="answer-library">
            <Route path="" element={<AnswerLibrary />} />
            <Route path="create" element={<AnswerLibraryCreate />} />
            <Route path="edit/:slug" element={<AnswerLibraryEdit />} />
            <Route path="script/:slug" element={<AnswerLibraryScript />} />
            <Route
              path="existing-topic/:slug/script/:scriptId"
              element={<AnswerLibraryScriptTopic />}
            />
          </Route>
          <Route path="interactor">
            <Route path="" element={<Interactor />} />
          </Route>
          <Route path="live-config">
            <Route path="" element={<LiveConfig />} />
          </Route>
          <Route path="prompt-topic">
            <Route path="" element={<PromptTopic />} />
          </Route>
          <Route path="scenario">
            <Route path="" element={<ScenarioConfig />} />
            <Route path="create" element={<ScenarioConfigCreate />} />
            <Route path="generate" element={<ScenarioConfigGenerate />} />
            <Route path=":id" element={<ScenarioConfigDetailGenerate />} />
          </Route>
          <Route path="server-error" element={<ServerError />} />
          <Route path="404" element={<Error404 />} />
          <Route path="profile" element={<ProfileLayout />}>
            <Route path="personal-info" element={<PersonalInfo />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>
        </Route>
        <Route path="/auth" element={<AuthLayoutFallback />}>
          <Route
            path="login"
            element={
              <UnrequireAuth>
                <LoginPage />
              </UnrequireAuth>
            }
          />
        </Route>
        <Route path="/logout" element={<LogoutFallback />} />
        <Route path="/*" element={<Navigate to="/404" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
