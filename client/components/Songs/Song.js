import React from 'react';

function Song({
  title = 'Title',
  info = 'asdassdasds'
}) {
  return (
    <div className="song">
      <div>{title}</div>
      <div>{info}</div>
    </div>
  );
}

export default Song;
