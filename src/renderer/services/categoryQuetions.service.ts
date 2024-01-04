import httpClient from './httpClient';

export const categoryQuestionsService = {
  create: (data: any): Promise<any> => {
    return httpClient.post('/v2/categories', data);
  },
  update: ({ data, id }: any): Promise<any> => {
    return httpClient.put(`/v2/categories/${id}`, data);
  },
  delete: ({ id }: any): Promise<any> => {
    return httpClient.delete(`/v2/categories/${id}`);
  },
  getList: ({ data }: any): Promise<any> => {
    return httpClient.get(`/v2/categories`, data);
  },
  getById: ({ id }: any): Promise<any> => {
    return httpClient.get(`/v2/categories/${id}`);
  },
  getAnswersByCategoryId: ({ id }: any): Promise<any> => {
    return httpClient.get(
      `/v2/categories/get-question-answer-by-categoriesId/${id}`,
    );
  },
};
