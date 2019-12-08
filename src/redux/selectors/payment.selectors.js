export const getPayments = state => {
  var filter = state.issue.paymentFilter.payed;
  if (state.issue.paymentData) {
    switch (filter) {
      case 'ALL':
        return state.issue.paymentData;
      case 'PAYED':
        var result = state.issue.paymentData;
        result = result.filter(item => item.payed);
        return result;
      case 'NOT_PAYED':
        var result = state.issue.paymentData;
        result = result.filter(item => !item.payed);
        return result;
      default:
        return [];
    }
  }
  return [];
};
