import { useDispatch } from 'react-redux';
import { logoutAsyncAction } from '../../redux/actions/authActions';
import JournalEntries from './JournalEntries';
// import firebase  from "../../firebase/firebaseConfig"

const Sidebar = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logoutAsyncAction());
  };

  return (
    <aside className='journal__sidebar'>
      <div className='journal__sidebar-navbar'>
        <h3 className='mt-5'>
          <i className='far fa-moon'></i>
          <span>Andrés</span>
        </h3>

        <button onClick={handleLogOut} className='btn'>
          Logout
        </button>
      </div>
      <div className='journal__new-entry'>
        <i className='far fa-calendar-plus fa-5x'></i>
        <p className='mt-5'>New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};

export default Sidebar;
