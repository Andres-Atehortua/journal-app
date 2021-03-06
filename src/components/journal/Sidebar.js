import { useDispatch, useSelector } from 'react-redux';
import { logoutAsyncAction } from '../../redux/actions/authActions';
import {
  cleanLogoutAction,
  startNewNoteAction,
} from '../../redux/actions/notesActions';
import JournalEntries from './JournalEntries';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogOut = () => {
    dispatch(logoutAsyncAction());
    dispatch(cleanLogoutAction());
  };

  const handleAddNew = () => {
    dispatch(startNewNoteAction());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='mt-5'>
          <i className='far fa-moon'></i>
          <span>{name}</span>
        </h3>

        <button onClick={handleLogOut} className='btn'>
          Logout
        </button>
      </div>
      <div onClick={handleAddNew} className='journal__new-entry'>
        <i className='far fa-calendar-plus fa-5x'></i>
        <p className='mt-5'>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
