import Swal from 'sweetalert2';
import { db } from '../../firebase/firebaseConfig';
import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from '../../helpers/loadNotes';
import { notesTypes } from '../types/notesTypes';

// react-journal

export const startNewNoteAction = () => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth;
    const newNote = { title: '', body: '', date: new Date().getTime() };

    const doc = await db.collection(`${uid}/journal/notes`).add(newNote);

    dispatch(setActiveNoteAction(doc.id, newNote));
    dispatch(addNewNoteAction(doc.id, newNote));
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};

export const setActiveNoteAction = (id, note) => ({
  type: notesTypes.NOTES_SET_ACTIVE,
  payload: { id, ...note },
});

export const addNewNoteAction = (id, note) => ({
  type: notesTypes.NOTES_ADD_NOTE,
  payload: { id, ...note },
});

export const startLoadingNotesAction = (uid) => async (dispatch) => {
  const notes = await loadNotes(uid);
  dispatch(loadNotesAction(notes));
};

export const loadNotesAction = (notes) => ({
  type: notesTypes.NOTES_LOAD,
  payload: notes,
});

export const startSaveNoteAction = (note) => async (dispatch, getState) => {
  try {
    const { uid } = getState().auth;

    if (!note.url) {
      delete note.url;
    }

    const noteToFirestore = {
      ...note,
    };

    delete noteToFirestore.id;

    await db.doc(`${uid}/journal/notes/${note.id}`).update(noteToFirestore);

    dispatch(refreshNoteAction(note.id, note));

    Swal.fire('Saved', note.title, 'success');
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};

export const refreshNoteAction = (id, note) => ({
  type: notesTypes.NOTES_UPDATE,
  payload: { id, note },
});

export const startFileUploadAction = (file) => async (dispatch, getState) => {
  try {
    const { active } = getState().notes;

    Swal.fire({
      title: 'Uploading...',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const fileUrl = await fileUpload(file);

    dispatch(startSaveNoteAction({ ...active, url: fileUrl }));
    dispatch(setActiveNoteAction(active.id, { ...active, url: fileUrl }));

    Swal.close();
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};

export const startDeleteNoteAction = (id) => async (dispatch, getState) => {
  const { uid } = getState().auth;

  try {
    await db.doc(`${uid}/journal/notes/${id}`).delete();

    dispatch(deleteNoteAction(id));
    Swal.fire('Succes', 'Note deleted', 'success');
  } catch (error) {
    Swal.fire('Error', error.message, 'error');
  }
};

export const deleteNoteAction = (id) => ({
  type: notesTypes.NOTES_REMOVE_NOTE,
  payload: id,
});

export const cleanLogoutAction = () => ({
  type: notesTypes.NOTES_LOGOUT_CLEAN,
});
