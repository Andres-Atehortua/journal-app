import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import Sidebar from '../../../components/journal/Sidebar';
import { mount } from 'enzyme';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { logoutAsyncAction } from '../../../redux/actions/authActions';
import {
  startNewNoteAction,
  cleanLogoutAction,
} from '../../../redux/actions/notesActions';

jest.mock('../../../redux/actions/authActions', () => ({
  logoutAsyncAction: jest.fn(),
}));

jest.mock('../../../redux/actions/notesActions', () => ({
  startNewNoteAction: jest.fn(),
  cleanLogoutAction: jest.fn(),
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

describe('Testing Sidebar component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  test('should call logout', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    wrapper.find('button').simulate('click');

    expect(logoutAsyncAction).toHaveBeenCalled();
  });

  test('should call startNewNoteAction', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Sidebar />
      </Provider>
    );

    wrapper.find('.journal__new-entry').simulate('click');

    expect(startNewNoteAction).toHaveBeenCalled();
  });
});
