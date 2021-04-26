/**
 * @jest-environment node
 */

// Para las variables de entorno en testing

// Configuracion para testear acciones asincronas en redux
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { db } from '../../../firebase/firebaseConfig';
import {
  startLoadingNotesAction,
  startNewNoteAction,
  startSaveNoteAction,
} from '../../../redux/actions/notesActions';
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
  beforeEach(() => {
    store.clearActions();
  });

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

  test('should load notes when call startLoadingNotesAction', async () => {
    const { uid } = store.getState().auth;

    await store.dispatch(startLoadingNotesAction(uid));

    const actions = store.getActions();

    const payloadExpected = {
      id: expect.any(String),
      body: expect.any(String),
      title: expect.any(String),
      date: expect.any(Number),
    };

    expect(actions[0]).toEqual({
      type: notesTypes.NOTES_LOAD,
      payload: expect.any(Array),
    });

    expect(actions[0].payload[0]).toMatchObject(payloadExpected);
  });

  test('startSaveNoteAction should save and upgrade a note', async () => {
    const { uid } = store.getState().auth;

    const note = {
      id: 'IKm1XS4fHMZuMZ4H7PZ3',
      body: 'testing',
      title: 'testing',
    };

    await store.dispatch(startSaveNoteAction(note));

    const actions = store.getActions();

    expect(actions[0]).toEqual({
      type: notesTypes.NOTES_UPDATE,
      payload: expect.any(Object),
    });

    const docRef = await db.doc(`${uid}/journal/notes/${note.id}`).get();

    expect(docRef.data().title).toBe(note.title);
    expect(docRef.data().body).toBe(note.body);
  });
});
