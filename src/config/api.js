/*
  functions that will return the URL's for the requested data
*/

export const API_URL = 'http://10.0.2.2:3000';

export const getAdUrl = id => `${API_URL}/ad/${id}`;
export const getArticleUrl = id => `${API_URL}/article/${id}`;
export const getPhotoUrl = id => `${API_URL}/photograph/${id}`;
export const getUploadUrl = () => `${API_URL}/upload`;

export const getPhotoLocationUrl = location => `${API_URL}/${location}`;

export const getEditByTypeUrl = (id, type) =>
  `${API_URL}/edit/${id}?type=${type}`;

export const getIssueUrl = () => `${API_URL}/issue`;
export const getPaymentsUrl = id => `${API_URL}/payment/${id}`;
export const getUpdatePaymentUrl = (id, type) =>
  `${API_URL}/payment/${id}?type=${type}`;
