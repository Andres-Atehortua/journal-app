import NotesAppBar from './NotesAppBar';

const NoteScreen = () => {
  return (
    <div className='notes__main-content'>
      <NotesAppBar />

      <div className='notes__content'>
        <input
          className='notes__title-input'
          placeholder='Some aweasome title'
          type='text'
          autoComplete='off'
        />

        <textarea
          placeholder='What happened today'
          className='notes__textarea'
        ></textarea>
        <div className='notes__image'>
          <img src='https://picsum.photos/200/300?random=1' alt='imagen' />
        </div>
      </div>
    </div>
  );
};

export default NoteScreen;
