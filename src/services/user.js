import axios from "axios";

const API_URL = 'https://cors-anywhere.herokuapp.com/https://titus-to-do-list-api.herokuapp.com';

// get list of the users
export const getToDoListService = async (token, client, uid) => {
  try {
    axios.defaults.headers.common['access-token'] = `${token}`;
    axios.defaults.headers.common['client'] = `${client}`;
    axios.defaults.headers.common['uid'] = `${uid}`;
    return await axios.get(`${API_URL}/api/v1/todos`);
  } catch (err) {
    return {
      error: true,
      response: err.response
    };
  }
}
