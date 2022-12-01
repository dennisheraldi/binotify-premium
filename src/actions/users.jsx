import fetchData from './utils/fetchData';

const url = 'http://localhost:3000/api/users';

export const getUsers = async (dispatch) => {
  const result = await fetchData({ url, method: 'GET' }, dispatch);
  if (result) {
    dispatch({ type: 'UPDATE_USERS', payload: result });
  }
};