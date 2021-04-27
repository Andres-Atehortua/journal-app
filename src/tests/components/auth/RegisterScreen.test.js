import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import RegisterScreen from '../../../components/auth/RegisterScreen';
import { uiTypes } from '../../../redux/types/uiTypes';

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

describe('Testing RegisterScreen component', () => {
  beforeEach(() => {
    store.clearActions();
    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('should dispatch action', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    const emailInput = wrapper.find('input[name="email"]');

    emailInput.simulate('change', {
      target: {
        value: '',
        name: 'email',
      },
    });

    wrapper.find('form').simulate('submit');

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: uiTypes.UI_SET_ERROR,
      payload: 'El email es necesario',
    });
  });

  test('should show alert message', () => {
    const initialState = {
      auth: {
        name: 'andres',
        uid: '1234',
      },
      ui: {
        loading: false,
        msgError: 'Email no correcto',
      },
    };
    const store = mockStore(initialState);

    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <RegisterScreen />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find('.auth__alert-error').text()).toBe('Email no correcto');
  });
});
