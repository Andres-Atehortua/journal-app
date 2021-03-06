import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import useForm from '../../hooks/useForm';
import {
  setActiveNoteAction,
  startDeleteNoteAction,
} from '../../redux/actions/notesActions';
import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
  const { active } = useSelector((state) => state.notes);

  const { values, handleInputChange, reset } = useForm(active);
  const dispatch = useDispatch();

  const activeId = useRef(active.id);
  const activeUrl = useRef(active.url);

  const handleDelete = () => {
    dispatch(startDeleteNoteAction(active.id));
  };

  useEffect(() => {
    if (active.id !== activeId.current) {
      reset(active);
      activeId.current = active.id;
    }

    if (active.url !== activeUrl.current) {
      reset(active);
      activeUrl.current = active.url;
    }
  }, [active, reset]);

  useEffect(() => {
    dispatch(setActiveNoteAction(values.id, { ...values }));
  }, [values, dispatch]);

  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          className='notes__title-input'
          placeholder='Some aweasome title'
          type='text'
          autoComplete='off'
          name='title'
          value={values.title}
          onChange={handleInputChange}
        />

        <textarea
          placeholder='What happened today'
          className='notes__textarea'
          value={values.body}
          onChange={handleInputChange}
          name='body'
        ></textarea>

        {active.url && (
          <div className='notes__image'>
            <img src={active.url} alt='imagen' />
          </div>
        )}
      </div>
      <button onClick={handleDelete} className='btn btn-danger'>
        Delete
      </button>
    </div>
  );
};

export default NoteScreen;
