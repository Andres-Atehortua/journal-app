import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { loginAction } from '../../redux/actions/authActions';
import AppRouter from '../../routers/AppRouter';
import { firebase } from '../../firebase/firebaseConfig';

jest.mock('../../redux/actions/authActions', () => ({
  loginAction: jest.fn(),
}));

const middlewares = [thunk];

const mockStore = configureStore(middlewares);

const initialState = {
  auth: {
    name: 'andres',
    uid: '1234',
  },
  ui: {
    loading: false,
    msgError: '',
  },

  notes: {
    active: {
      id: 'abc',
    },
    notes: [],
  },
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Testing AppRouter component', () => {
  test('should call login if im authenticated', async () => {
    let user;

    await act(async () => {
      const cred = await firebase
        .auth()
        .signInWithEmailAndPassword('a@a.com', '123456');
      user = cred.user;

      mount(
        <Provider store={store}>
          <MemoryRouter>
            <AppRouter />
          </MemoryRouter>
        </Provider>
      );
    });

    expect(loginAction).toHaveBeenCalled();
    expect(user.email).toBe('a@a.com');
  });
});
