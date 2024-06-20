// task_7/dashboard/src/actions/uiActionCreators.test.js

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { loginRequest, LOGIN_SUCCESS, LOGIN_FAILURE } from './uiActionCreators';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('creates LOGIN_SUCCESS when login is successful', () => {
    fetchMock.getOnce('/login-success.json', {
      body: { user: 'test@example.com' },
      headers: { 'content-type': 'application/json' },
    });

    const expectedActions = [
      { type: 'LOGIN' },
      { type: LOGIN_SUCCESS },
    ];
    const store = mockStore({});

    return store.dispatch(loginRequest('test@example.com', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });

  it('creates LOGIN_FAILURE when login fails', () => {
    fetchMock.getOnce('/login-success.json', 500); // Simulate API failure

    const expectedActions = [
      { type: 'LOGIN' },
      { type: LOGIN_FAILURE },
    ];
    const store = mockStore({});

    return store.dispatch(loginRequest('test@example.com', 'password'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

