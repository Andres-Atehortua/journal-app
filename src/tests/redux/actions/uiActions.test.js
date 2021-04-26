import {
  finishLoadingAction,
  removeErrorAction,
  setErrorAction,
  startLoadingAction,
} from '../../../redux/actions/uiActions';

import { uiTypes } from '../../../redux/types/uiTypes';

describe('Testing uiActions', () => {
  test('all actions should work', () => {
    const setError = setErrorAction('Mensaje de error');
    const removeError = removeErrorAction();
    const startLoading = startLoadingAction();
    const finishLoading = finishLoadingAction();

    expect(setError).toEqual({
      type: uiTypes.UI_SET_ERROR,
      payload: 'Mensaje de error',
    });

    expect(removeError).toEqual({
      type: uiTypes.UI_REMOVE_ERROR,
    });
    expect(startLoading).toEqual({
      type: uiTypes.UI_START_LOADING,
    });
    expect(finishLoading).toEqual({
      type: uiTypes.UI_FINISH_LOADING,
    });
  });
});
