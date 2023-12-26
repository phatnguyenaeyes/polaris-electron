import httpClient from './httpClient';

export const topicGroupService = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  create: (data: any): Promise<any> => {
    return httpClient.post('/v1/group', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  update: (groupId: string, data: any): Promise<any> => {
    return httpClient.put(`/v1/group/${groupId}`, data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
  },
  deleteTopicGroup: (groupId: string): Promise<any> => {
    return httpClient.delete(`/v1/group/${groupId}`);
  },
};
