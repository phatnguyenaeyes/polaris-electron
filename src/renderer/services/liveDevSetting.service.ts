import httpClient from './httpClient';

export const liveDevSettingService = {
  getAll: (params: any): Promise<any> => {
    return httpClient.get('/live-dev-setting', {
      params,
    });
  },
  getById: (id: string): Promise<any> => {
    return httpClient.get(`/live-dev-setting/${id}`);
  },
  getBySlug: (slug: string): Promise<any> => {
    return httpClient.get(`/live-dev-setting/${slug}`);
  },
  create: (data: any): Promise<any> => {
    return httpClient.post('/live-dev-setting', data);
  },
  update: (id: string, data: any): Promise<any> => {
    return httpClient.put(`/live-dev-setting/${id}`, data);
  },
};
