import httpClient from './httpClient';

export const liveSettingService = {
  getAll: (params: any): Promise<any> => {
    return httpClient.get('/v1/live-setting', {
      params,
    });
  },
  getById: (id: string): Promise<any> => {
    return httpClient.get(`/v1/live-setting/${id}`);
  },
  getBySlug: (slug: string): Promise<any> => {
    return httpClient.get(`/v1/live-setting/${slug}`);
  },
  create: (data: any): Promise<any> => {
    return httpClient.post('/live-setting', data);
  },
  update: (topicId: string, data: any): Promise<any> => {
    return httpClient.put(`/live-setting/${topicId}`, data);
  },
  getComments: (livestreamId: string, params: any): Promise<any> => {
    return httpClient.get(`/comment?live_setting_id=${livestreamId}`, {
      params,
    });
  },
  // getComments: (livestreamId: string, params: any): Promise<any> => {
  //   return httpClient.get(`/comment`, {
  //     params,
  //   });
  // },
};
