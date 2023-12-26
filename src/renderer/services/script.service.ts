import httpClient from './httpClient';

export const scriptService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data: any): Promise<any> => {
    return httpClient.post('v2/script', data);
  },
  delete: (id: string): Promise<any> => {
    return httpClient.delete(`/script/${id}`);
  },
  getByID: (id: string): Promise<any> => {
    return httpClient.get(`/script/${id}`);
  },
  getAll: (params: any): Promise<any> => {
    return httpClient.get('/script', {
      params,
    });
  },
  updateThePartOfScript: ({ id, data }: any): Promise<any> => {
    return httpClient.patch(`/script/change-part/${id}`, data);
  },
  updateTheContentOfScript: ({ id }: any): Promise<any> => {
    return httpClient.patch(`/script/change-content/${id}`);
  },
  save: ({ id }: any): Promise<any> => {
    return httpClient.post(`/script/save/${id}`);
  },
  addQuestion: ({ id, data }: any): Promise<any> => {
    return httpClient.post(`/script/${id}/question`, data);
  },
  updateAnswerOfQuestion: ({ id, questionId }: any): Promise<any> => {
    return httpClient.post(`/script/${id}/question/${questionId}`);
  },
  scriptDetail: (scriptId: string): Promise<any> => {
    return httpClient.get(`/script/${scriptId}/topic`);
  },
  scripFromTopictDetail: (scriptId: string, topicSlug: string): Promise<any> => {
    return httpClient.get(`/script/${scriptId}/topic/${topicSlug}`);
  },
};
