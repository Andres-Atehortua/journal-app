import { useDispatch } from 'react-redux';
import { days } from '../../helpers/daysAndMonths';
import { setActiveNoteAction } from '../../redux/actions/notesActions';

const JournalEntry = ({ id, title, body, date, url }) => {
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(setActiveNoteAction(id, { title, body, date, url }));
  };

  return (
    <div
      className=' journal__entry animate__animated animate__fadeInLeft'
      onClick={handleEdit}
    >
      {url && (
        <div
          className='journal__entry-picture'
          style={{ backgroundImage: `url(${url})` }}
        ></div>
      )}
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>{title}</p>
        <p className='journal__entry-content'>{body}</p>
      </div>
      <div className='journal__entry-date-box'>
        <span>{days[new Date(date).getDay()]}</span>
        <h4>{new Date(date).getDate()}</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
