import React from 'react';
import Select from 'react-select';
import useRemote from '@/support/hooks/useRemote';
import request, { useApi } from '@/support/utils/request';

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
  } = useApi('/music/genres');
  
  const {
    request: updateGenres
  } = useRemote(async(selected= []) => {
    const genres = selected.map(({ value: id }) => id);
  
    if (!isSetter) return genres;
  
    await request({
      url: 'music/genres/set',
      method: 'PUT',
      data: {
        updateForSongId,
        updateForArtistId,
        genres
      }
    });
    
    return genres;
  }, {
    onSuccess: (result) => onUpdate && onUpdate(result)
  });
  
  function map({ id, name }) {
    return { value: id, label: name };
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
