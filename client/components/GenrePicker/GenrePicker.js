import React from 'react';
import Select from 'react-select';
import useRemote from '@/support/hooks/useRemote';
import request, { useApi } from '@/support/utils/request';

function GenrePicker({
  updateForSongId,
  updateForArtistId,
  defaultSelected = [],
  onUpdate
}) {
  const {
    data: genres = [],
    mutate: reloadGenres
  } = useApi('/music/genres');
  
  const {
    request: updateGenres
  } = useRemote((selected= []) => {
    const genres = selected.map(({ value: id }) => id);
    
    return request({
      url: 'music/genres/set',
      method: 'PUT',
      data: {
        updateForSongId,
        updateForArtistId,
        genres
      }
    })
  }, {
    onSuccess: () => onUpdate && onUpdate()
  });
  
  return (
    <div className="genre-picker">
      <Select
        defaultValue={defaultSelected.map(({ id, name }) => {
          return { value: id, label: name };
        })}
        isMulti
        name="colors"
        options={genres.map(({ id, name }) => {
          return { value: id, label: name };
        })}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={updateGenres}
      />
    </div>
  );
}

export default GenrePicker;
