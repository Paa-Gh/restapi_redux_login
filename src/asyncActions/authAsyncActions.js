import {
  verifyTokenStarted, verifyUserSuccess, verifyTokenEnd,
  userLoginStarted, userLoginFailure, userLogout
} from "../actions/authActions";
import { verifyTokenService, userLoginService, userLogoutService } from '../services/auth';

// handle verify token
export const verifyTokenAsync = (silentAuth = false) => async dispatch => {
  dispatch(verifyTokenStarted(silentAuth));

  const result = await verifyTokenService();

  if (result.error) {
    dispatch(verifyTokenEnd());
    if (result.response && [401, 403].includes(result.response.status))
      dispatch(userLogout());
    return;
  }

  if (result.status === 204)
    dispatch(verifyTokenEnd());
  else
    dispatch(verifyUserSuccess(result.headers["access-token"], result.headers["client"], result.headers["uid"]));
}

// handle user login
export const userLoginAsync = (username, password) => async dispatch => {
  dispatch(userLoginStarted());

  const result = await userLoginService(username, password);

  if (result.error) {
    dispatch(userLoginFailure(result.response.data.message));
    return;
  }

  dispatch(verifyUserSuccess(result.headers["access-token"], result.headers["client"], result.headers["uid"]));
}

// handle user logout
export const userLogoutAsync = () => dispatch => {
  dispatch(userLogout());
  userLogoutService();
}
