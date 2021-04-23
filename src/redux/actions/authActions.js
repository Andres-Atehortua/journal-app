import Swal from 'sweetalert2';
import { firebase, googleAuthProvider } from '../../firebase/firebaseConfig';
import { authTypes } from '../types/authTypes';
import { finishLoadingAction, startLoadingAction } from './uiActions';

export const loginWithEmailPassword = (email, password) => async (dispatch) => {
  dispatch(startLoadingAction());
  try {
    const { user } = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password);

    dispatch(loginAction(user.uid, user.displayName));
    dispatch(finishLoadingAction());
  } catch (error) {
    dispatch(finishLoadingAction());
    Swal.fire('Error', error.message, 'error');
  }
};

export const registerWithEmailPasswordName = (email, password, name) => async (
  dispatch
) => {
  dispatch(startLoadingAction());

  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
    await user.updateProfile({ displayName: name });

    dispatch(loginAction(user.uid, user.displayName));
    dispatch(finishLoadingAction());
  } catch (error) {
    dispatch(finishLoadingAction());

    Swal.fire('Error', error.message, 'error');
  }
};

export const startGoogleLogin = () => async (dispatch) => {
  dispatch(startLoadingAction());

  try {
    const { user } = await firebase.auth().signInWithPopup(googleAuthProvider);

    dispatch(loginAction(user.uid, user.displayName));
  } catch (error) {
    dispatch(finishLoadingAction());

    Swal.fire('Error', error.message, 'error');
  }
};

export const loginAction = (uid, displayName) => ({
  type: authTypes.LOGIN,
  payload: { uid, displayName },
});

const logoutAction = () => ({ type: authTypes.LOGOUT });

export const logoutAsyncAction = () => async (dispatch) => {
  try {
    await firebase.auth().signOut();
    dispatch(logoutAction());
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};
