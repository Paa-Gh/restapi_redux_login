import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userLoginAsync } from './../asyncActions/authAsyncActions';

function Login() {

  const authObj = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const { userLoginLoading, loginError } = authObj;

  const username = useFormInput('');
  const password = useFormInput('');

  // handle button click of login form
  const handleLogin = () => {
    dispatch(userLoginAsync(username.value, password.value));
  }

  return (
    <div className="login w3-card-4 text-white">
      <h3>Login</h3><br />
      <div>
        Username<br />
        <input type="text" {...username} autoComplete="new-password" />
      </div>
      <div style={{ marginTop: 10 }}>
        Password<br />
        <input type="password" {...password} autoComplete="new-password" />
      </div>
      <input
        className="btn btn-success mt-4"
        type="button"
        style={{ marginTop: 10 }}
        value={userLoginLoading ? 'Loading...' : 'Login'}
        onClick={handleLogin}
        disabled={userLoginLoading} />
      {loginError && <div style={{ color: 'red', marginTop: 10 }}>{loginError}</div>}
    </div>
  );
}

// custom hook to manage the form input
const useFormInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  const handleChange = e => {
    setValue(e.target.value);
  }
  return {
    value,
    onChange: handleChange
  }
}


export default Login;
