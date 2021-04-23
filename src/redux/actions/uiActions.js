import { uiTypes } from '../types/uiTypes';

export const setErrorAction = (errMsg) => ({
  type: uiTypes.UI_SET_ERROR,
  payload: errMsg,
});

export const removeErrorAction = () => ({
  type: uiTypes.UI_REMOVE_ERROR,
});

export const startLoadingAction = () => ({ type: uiTypes.UI_START_LOADING });
export const finishLoadingAction = () => ({ type: uiTypes.UI_FINISH_LOADING });
