export const API_URL = 'http://10.0.2.2:3000';

export const getAdUrl = id => `${API_URL}/ad/${id}`;
export const getArticleUrl = id => `${API_URL}/article/${id}`;
export const getPhotoUrl = id => `${API_URL}/photograph/${id}`;
export const getUploadUrl = () => `${API_URL}/upload`;
export const getPhotoLocationUrl = location => `${API_URL}/${location}`;

export const getAdsByIssueUrl = id => `${API_URL}/ad/${id}/ad`;
export const getArticlesByIssueUrl = id => `${API_URL}/article/${id}/article`;
export const getPhotosByIssueUrl = id =>
  `${API_URL}/photograph/${id}/photograph`;
