const JournalEntry = () => {
  return (
    <div className='journal__entry'>
      <div className='journal__entry-picture'></div>
      <div className='journal__entry-body'>
        <p className='journal__entry-title'>Un nuevo dia arhhh</p>
        <p className='journal__entry-content'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos,
          beatae!
        </p>
      </div>
      <div className='journal__entry-date-box'>
        <span>Monday</span>
        <h4>28</h4>
      </div>
    </div>
  );
};

export default JournalEntry;
