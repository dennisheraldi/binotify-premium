import fetchData from './utils/fetchData';

const url = '127.0.0.1:3001/api/users';

() => {
    fetch('127.0.0.1:3001/healthcheck')
    .then((response) => {
        if(!response.ok) throw new Error(response.status);
        else return response.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log('error: ' + error);
      })}, [] 

export const getUsers = async (dispatch) => {
const result = await fetchData({ url, method: 'GET' }, dispatch);
if (result) {
    dispatch({ type: 'UPDATE_USERS', payload: result });
}
};