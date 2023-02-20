import axios from 'axios';
// return the user data from the local storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
};

// return the token from the local storage
export const getToken = () => {
  return localStorage.getItem('token') || null;
};

// remove the token and user from the local storage
export const removeUserSession = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// set the token and user from the local storage
export const setUserSession = (token, user) => {
  localStorage.setItem('token', token);
  localStorage.setItem('user', JSON.stringify(user));
};

export const fetchTransactions = ({ queryParams }) => {
  return axios
    .post('http://localhost:4000/getTransactionList', { queryParams })
    .then((response) => {
      const data = { ...response.data };
      return data;
    });
};

export const updateBalance = ({ values }) => {
  return axios
    .post('http://localhost:4000/updateBalance', { values })
    .then((response) => {
      const data = { ...response.data };
      return data;
    });
};

export const getComputedDepositValue = (values) => {
  let sum = 0;
  Object.keys(values).map((key) => {
    sum = sum + Number(key) * Number(values[key]);
  });
  return sum;
};
