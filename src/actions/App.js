export const getTransactionList = (data) => {
  return {
    type: 'GET_TRANSACTION_DATA',
    payload: data,
  };
};

export const updateWithdrawalLimit = (limit) => {
  return {
    type: 'UPDATE_WITHDRAW_LIMIT',
    payload: limit,
  };
};

export const updateBalance = (balance) => {
  return {
    type: 'UPDATE_BALANCE',
    payload: balance,
  };
};
