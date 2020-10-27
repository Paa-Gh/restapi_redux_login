import axios from "axios";
//axios.defaults.withCredentials = true;

const API_URL = 'https://cors-anywhere.herokuapp.com/https://titus-to-do-list-api.herokuapp.com';

// set token to the axios
export const setAuthToken = (token, client, uid) => {
  if (token) {
    axios.defaults.headers.common['access-token'] = `${token}`;
    axios.defaults.headers.common['client'] = `${client}`;
    axios.defaults.headers.common['uid'] = `${uid}`;
  }
  else {
    delete axios.defaults.headers.common['access-token']
    delete axios.defaults.headers.common['client']
    delete axios.defaults.headers.common['uid']
  }
}

// verify refresh token to generate new access token if refresh token is present
export const verifyTokenService = async () => {
  try {
    return await axios.post(`${API_URL}/auth/verify_token`);
  } catch (err) {
    return {
      error: true,
      response: err.response
    };
  }
}

// user login API to validate the credential
export const userLoginService = async (username, password) => {
  try {
    return await axios.post(`${API_URL}/auth/sign_in`, { email:username, password:password });
  } catch (err) {
    return {
      error: true,
      response: err.response
    };
  }
}

// manage user logout
export const userLogoutService = async () => {
  try {
    return await axios.delete(`${API_URL}/auth/sign_out`);
  } catch (err) {
    return {
      error: true,
      response: err.response
    };
  }
}
