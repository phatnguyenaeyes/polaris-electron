import httpClient from './httpClient';

export const promptTopicService = {
  create: (data: any): Promise<any> => {
    return httpClient.post('/v1/prompt-topic', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  getAll: (params: any): Promise<any> => {
    return httpClient.get('/prompt-topic', {
      params,
    });
  },
};
