import React, { useEffect } from 'react';
import Select from 'react-select';

import request from '@/support/utils/request';
import useRemote from '@/support/hooks/useRemote';
import useApi from '@/support/hooks/useApi';

function GenrePicker({
  updateForSongId,
  updateForArtistId,
  defaultSelected = [],
  onUpdate,
  isSetter = true,
  placeholder = 'Select...'
}) {
  const {
    data: genres = [],
    update
  } = useApi('/music/genres');
  
  const {
    request: updateGenres
  } = useRemote(async (selected= []) => {
    const genres = selected.map(({ value: id }) => id);
  
    if (isSetter) {
      await request({
        url: 'music/genres/set',
        method: 'PUT',
        data: {
          updateForSongId,
          updateForArtistId,
          genres
        }
      });
    }
    
    return selected.map(unmap);
  }, {
    onSuccess: (result) => onUpdate && onUpdate(result)
  });
  
  useEffect(() => {
    update();
  }, []);
  
  function map({ id, name }) {
    return { value: id, label: name };
  }
  
  function unmap({ value, label }) {
    return { id: value, name: label, ...{} };
  }
  
  return (
    <div className="genre-picker">
      <Select
        isMulti
        placeholder={placeholder}
        classNamePrefix="select"
        className="basic-multi-select"
        options={genres.map(map)}
        defaultValue={defaultSelected.map(map)}
        onChange={updateGenres}
      />
    </div>
  );
}

export default GenrePicker;
