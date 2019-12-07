export const getAdDetails = state => {
  console.log(state.issue.ads);
  return state.issue.ads[state.issue.currentAdIndex];
};

export const getArticleDetails = state =>
  state.issue.articles[state.issue.currentArticleIndex];

export const getPhotoDetails = state =>
  state.issue.photos[state.issue.currentPhotoIndex];
