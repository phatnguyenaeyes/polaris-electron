import { PageTitle } from '@app/components/common/PageTitle/PageTitle';
import { liveDevSettingService } from '@app/services/liveDevSetting.service';
import React, { useEffect, useState } from 'react';
import LiveConfigCreateForm from './LiveConfigCreateForm';
import LiveConfigEditForm from './LiveConfigEditForm';
import { LiveDevSettingsInterface } from './interface';
import { useTranslation } from 'react-i18next';

const LiveConfigPage: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [liveDevSettings, setLiveDevSettings] =
    useState<LiveDevSettingsInterface>();

  async function fetchLiveDevSetting() {
    try {
      setLoading(true);
      const res = await liveDevSettingService.getAll({
        page: 1,
        pageSize: 1,
      });
      if (res?.data?.length > 0) {
        setLiveDevSettings(res?.data[0]);
      }
      // eslint-disable-next-line no-empty
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchLiveDevSetting();
  }, []);

  const onCreated = () => {
    fetchLiveDevSetting();
  };
  const onSuccess = () => {
    fetchLiveDevSetting();
  };

  return (
    <>
      {loading ? null : (
        <>
          {liveDevSettings ? (
            <LiveConfigEditForm
              liveDevSettings={liveDevSettings}
              onSuccess={onSuccess}
            />
          ) : (
            <LiveConfigCreateForm onCreated={onCreated} />
          )}
        </>
      )}
    </>
  );
};

export default LiveConfigPage;
