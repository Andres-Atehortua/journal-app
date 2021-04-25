import { useDispatch, useSelector } from 'react-redux';
import { startSaveNoteAction } from '../../redux/actions/notesActions';

const NotesAppBar = () => {
  const dispatch = useDispatch();
  const { active } = useSelector((state) => state.notes);

  const handleSave = () => {
    dispatch(startSaveNoteAction(active));
  };

  return (
    <div className='notes__appbar'>
      <span>29 agosto 2020</span>
      <div>
        <button className='btn'>Picture</button>
        <button onClick={handleSave} className='btn'>
          Save
        </button>
      </div>
    </div>
  );
};

export default NotesAppBar;
