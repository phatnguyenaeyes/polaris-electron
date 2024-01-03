import httpClient from './httpClient';

export const topicService = {
  getAll: (params: any): Promise<any> => {
    return httpClient.get('/v1/topic', {
      params,
    });
  },
  getBySlug: (slug: string): Promise<any> => {
    return httpClient.get(`/v1/topic/${slug}`);
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data: any): Promise<any> => {
    return httpClient.post('/v1/topic', data);
  },
  createContentTopic: (data: any): Promise<any> => {
    return httpClient.post('/v1/content-topic', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  updateContentTopic: (contentTopicId: string, data: any): Promise<any> => {
    return httpClient.put(`/v1/content-topic/${contentTopicId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteContentTopic: (contentTopicId: string): Promise<any> => {
    return httpClient.delete(`/v1/content-topic/${contentTopicId}`);
  },
  update: (topicId: string, data: any): Promise<any> => {
    return httpClient.put(`/v1/topic/${topicId}`, data);
  },
  updateTopicGroups: (
    topicId: string,
    data: { groups: string[] },
  ): Promise<any> => {
    return httpClient.put(`/topic/update-group-for-topic/${topicId}`, data);
  },
};
