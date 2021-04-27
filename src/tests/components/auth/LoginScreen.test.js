import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import LoginScreen from '../../../components/auth/LoginScreen';
import {
  startGoogleLogin,
  loginWithEmailPassword,
} from '../../../redux/actions/authActions';

jest.mock('../../../redux/actions/authActions', () => ({
  startGoogleLogin: jest.fn(),
  loginWithEmailPassword: jest.fn(),
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
};
const store = mockStore(initialState);
store.dispatch = jest.fn();

describe('Testing LoginScreen component', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch startGoogleLogin', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('.google-btn').simulate('click');

    expect(startGoogleLogin).toHaveBeenCalledTimes(1);
  });

  test('should dispatch loginWithEmailPassword', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <LoginScreen />
        </MemoryRouter>
      </Provider>
    );
    wrapper.find('form').simulate('submit');

    expect(loginWithEmailPassword).toHaveBeenCalledWith('a@a.com', '123456');
  });
});
