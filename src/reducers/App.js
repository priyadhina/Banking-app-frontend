const reducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_TRANSACTION_DATA':
      const { transactionList, totalCount } = action.payload;
      return {
        ...state,
        transactionList: transactionList,
        totalCount: totalCount,
      };
    case 'UPDATE_WITHDRAW_LIMIT':
      return {
        ...state,
        limit: action.payload,
      };
    case 'UPDATE_BALANCE':
      return {
        ...state,
        balance: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
