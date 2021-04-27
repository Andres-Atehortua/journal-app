import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  loginWithEmailPassword,
  logoutAsyncAction,
} from '../../../redux/actions/authActions';
import { authTypes } from '../../../redux/types/authTypes';
import { uiTypes } from '../../../redux/types/uiTypes';

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initialState = {};
const store = mockStore(initialState);

describe('Testing authActions', () => {
  beforeEach(() => {
    store.clearActions();
  });

  test('should logout from firebase with logoutAsyncAction', async () => {
    await store.dispatch(logoutAsyncAction());
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: authTypes.LOGOUT });
  });

  test('should login with email and password in firebase', async () => {
    await store.dispatch(loginWithEmailPassword('a@a.com', '123456'));
    const actions = store.getActions();

    expect(actions[0]).toEqual({ type: uiTypes.UI_START_LOADING });
    expect(actions[1]).toEqual({
      type: authTypes.LOGIN,
      payload: { uid: expect.any(String), displayName: null },
    });
    expect(actions[2]).toEqual({ type: uiTypes.UI_FINISH_LOADING });
  });
});
