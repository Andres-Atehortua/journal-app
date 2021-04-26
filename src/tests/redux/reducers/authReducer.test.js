import { authReducer } from '../../../redux/reducers/authReducer';
import { authTypes } from '../../../redux/types/authTypes';

describe('Testing authReducer', () => {
  test('should return default state', () => {
    const defaultState = {};
    const state = authReducer(defaultState, { type: undefined });

    expect(state).toEqual(defaultState);
  });

  test('should return an especific logged state', () => {
    const defaultState = { name: 'andres', uid: '1234' };
    const state = authReducer(
      {},
      {
        type: authTypes.LOGIN,
        payload: { uid: defaultState.uid, displayName: defaultState.name },
      }
    );

    expect(state).toEqual(defaultState);
  });

  test('should return an empy object when logout', () => {
    const state = authReducer(
      { name: 'andres', uid: 12345 },
      { type: authTypes.LOGOUT }
    );

    expect(state).toEqual({});
  });
});
