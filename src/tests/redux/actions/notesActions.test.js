// Configuracion para testear acciones asincronas en redux
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../../firebase/firebaseConfig';
import { startNewNoteAction } from '../../../redux/actions/notesActions';
import { notesTypes } from '../../../redux/types/notesTypes';

// Configuracion para testear acciones asincronas en redux
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const store = mockStore({
  auth: {
    uid: '123-456',
  },
});

describe('Testing notesActions', () => {
  test('should create new note', async () => {
    await store.dispatch(startNewNoteAction());

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: notesTypes.NOTES_SET_ACTIVE,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    expect(actions[1]).toEqual({
      type: notesTypes.NOTES_ADD_NOTE,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });

    const docId = actions[0].payload.id;
    const { uid } = store.getState().auth;

    await db.doc(`${uid}/journal/notes/${docId}`).delete();
  });
});
