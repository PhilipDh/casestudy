/*
  Central file for all the configuration of the API endpoints
  Functions that will return the URL's for the requested data
*/

export const API_URL = 'http://10.0.2.2:3000';
//export const API_URL = 'http://100.88.92.11:3000';

export const getAdUrl = id => `${API_URL}/ad/${id}`;
export const getArticleUrl = id => `${API_URL}/article/${id}`;
export const getPhotoUrl = id => `${API_URL}/photograph/${id}`;
export const getUploadUrl = () => `${API_URL}/upload`;

export const getCompaniesUrl = () => `${API_URL}/company`;
export const addAdUrl = id => `${API_URL}/add/ad/${id}`;

export const getPeopleUrl = () => `${API_URL}/person`;
export const getArticleByIssueUrl = () => `${API_URL}/person`;

export const addArticleUrl = id => `${API_URL}/add/article/${id}`;

export const addPhotoUrl = id => `${API_URL}/add/photo/${id}`;

export const getPhotoLocationUrl = location => `${API_URL}/upload/${location}`;

export const getEditByTypeUrl = (id, type) =>
  `${API_URL}/edit/${id}?type=${type}`;

export const getIssueUrl = () => `${API_URL}/issue`;
export const getIssueByIdUrl = id => `${API_URL}/issue/${id}`;

export const getPaymentsUrl = () => `${API_URL}/payment`;
export const getUpdatePaymentUrl = id => `${API_URL}/payment/${id}`;
