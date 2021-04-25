import { notesTypes } from '../types/notesTypes';

/**
 *  {
 *    notes: [],
 *    active: {
 *       id: "asdsadas",
 *       body:"",
 *       date: "",
 *       title: ""
 *      }
 *  }
 */

const initialState = { notes: [], active: null };

export const notesReducer = (state = initialState, action) => {
  switch (action.type) {
    case notesTypes.NOTES_SET_ACTIVE:
      return { ...state, active: { ...action.payload } };
    case notesTypes.NOTES_LOAD:
      return {
        ...state,
        notes: [...action.payload],
      };
    case notesTypes.NOTES_UPDATE:
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload.note : note
        ),
      };

    default:
      return state;
  }
};
