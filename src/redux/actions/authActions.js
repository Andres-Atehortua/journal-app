import { firebase, googleAuthProvider } from '../../firebase/firebaseConfig';
import { authTypes } from '../types/authTypes';

export const loginWithEmailPassword = (email, password) => (dispatch) => {
  setTimeout(() => {
    dispatch(loginAction('123-123', 'Andres'));
  }, 3500);
};

export const startGoogleLogin = () => async (dispatch) => {
  const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);
  dispatch(loginAction(user.uid, user.displayName));
};

export const loginAction = (uid, displayName) => ({
  type: authTypes.LOGIN,
  payload: { uid, displayName },
});

export const logoutAction = () => ({ type: authTypes.LOGOUT });
