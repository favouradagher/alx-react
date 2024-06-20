// task_7/dashboard/src/actions/uiActionCreators.js

import { LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionTypes';

export const loginSuccess = () => ({
  type: LOGIN_SUCCESS,
});

export const loginFailure = () => ({
  type: LOGIN_FAILURE,
});

export const loginRequest = (email, password) => async (dispatch) => {
  dispatch(login()); // Dispatch login action

  try {
    const response = await fetch('/login-success.json'); // Simulate API call
    if (!response.ok) {
      throw new Error('Login API failed');
    }

    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure());
  }
};

const login = () => ({
  type: 'LOGIN',
  user: { email, password }
})

