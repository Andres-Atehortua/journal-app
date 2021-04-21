/*
    {
        uid: "asnasjkda",
        name: "Juan",
    }

*/

import { authTypes } from '../types/authTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case authTypes.LOGIN:
      return { uid: action.payload.uid, name: action.payload.displayName };

    case authTypes.LOGOUT:
      return {};

    default:
      return state;
  }
};
