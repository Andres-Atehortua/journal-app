import { uiTypes } from '../types/uiTypes';

// Reducer sólo para prácticar, se puede manejar todo desde el state del componente RegisterScreen
const initialState = { loading: false, msgError: '' };

export const uiReducer = (state = initialState, action) => {
  switch (action.type) {
    case uiTypes.UI_SET_ERROR:
      return { ...state, msgError: action.payload };

    case uiTypes.UI_REMOVE_ERROR:
      return { ...state, msgError: '' };
    case uiTypes.UI_START_LOADING:
      return { ...state, loading: true };

    case uiTypes.UI_FINISH_LOADING:
      return { ...state, loading: false };

    default:
      return state;
  }
};
