import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  startFileUploadAction,
  startSaveNoteAction,
} from '../../redux/actions/notesActions';

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const fileRef = useRef();

  const handleSave = () => {
    dispatch(startSaveNoteAction(active));
  };

  const handleUpload = () => {
    fileRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    file && dispatch(startFileUploadAction(file));
  };

  return (
    <div className='notes__appbar'>
      <span>29 agosto 2020</span>
      <input
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
        type='file'
        name='file'
      />
      <div>
        <button onClick={handleUpload} className='btn'>
          Picture
        </button>
        <button onClick={handleSave} className='btn'>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
