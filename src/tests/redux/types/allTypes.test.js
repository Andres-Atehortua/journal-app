import { authTypes } from '../../../redux/types/authTypes';
import { notesTypes } from '../../../redux/types/notesTypes';
import { uiTypes } from '../../../redux/types/uiTypes';

describe('Testing all types', () => {
  test('should match expected authTypes', () => {
    const auth = {
      LOGIN: '[Auth] Login',
      LOGOUT: '[Auth] Logout',
    };
    expect(authTypes).toEqual(auth);
  });

  test('should match expected notesTypes', () => {
    const notes = {
      NOTES_ADD_NOTE: '[NOTES] ADD NEW',
      NOTES_SET_ACTIVE: '[NOTES] SET ACTIVE',
      NOTES_LOAD: '[NOTES] LOAD',
      NOTES_UPDATE: '[NOTES] UPDATE NOTE',
      NOTES_FILE_URL: '[NOTES] UPDATE IMAGE URL',
      NOTES_REMOVE_NOTE: '[NOTES] REMOVE NEW',
      NOTES_LOGOUT_CLEAN: '[NOTES] LOGOUT CLEAN',
    };

    expect(notesTypes).toEqual(notes);
  });

  test('should match expected uiTypes', () => {
    const ui = {
      UI_SET_ERROR: '[UI] SET ERROR',
      UI_REMOVE_ERROR: '[UI] REMOVE ERROR',
      UI_START_LOADING: '[UI] START LOADING',
      UI_FINISH_LOADING: '[UI] FINISH LOADING',
    };
    expect(uiTypes).toEqual(ui);
  });
});
