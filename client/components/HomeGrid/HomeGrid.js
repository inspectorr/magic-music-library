import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import capitalize from '@material-ui/core/utils/capitalize';

import request from '@/support/utils/request';
import useApi from '@/support/hooks/useApi';
import useRemote from '@/support/hooks/useRemote';
import { useUser } from '@/support/data/user';
import GenrePicker from '@/components/GenrePicker/GenrePicker';
import DataBlock from '@/components/HomeGrid/DataBlock';

const DATA_BLOCKS_PROPERTY_MAP = {
  songs: {
    artist: 'Artist',
    band: 'Band',
    album: 'Album',
    genres: 'Genres'
  },
  albums: {
    artist: 'Artist',
    band: 'Band',
    genres: 'Genres',
    songs: 'Songs'
  },
  artists: {
    genres: 'Genres',
    albums: 'Albums'
  },
  bands: {
    genres: 'Genres',
    albums: 'Albums'
  }
};

function HomeGrid() {
  const { user } = useUser();
  const [selectedGenres, setSelectedGenres] = useState(user.genres);
  
  function getGenresString() {
    return selectedGenres.map(g => g.id).join(',');
  }
  
  const {
    data = {},
    loading
  } = useApi(
    `/music/genres/use/random/${getGenresString()}`,
    { enableMinLoad: true }
  );
  
  const {
    request: saveGenres
  } = useRemote(() => {
    return request({
      url: `/music/genres/use/save/${getGenresString()}`,
      method: 'PUT',
    });
  });
  
  useEffect(() => {
    saveGenres();
  }, [selectedGenres]);
  
  function handleSongsProperty(songs = []) {
    songs.sort((a, b) => a.albumOrder - b.albumOrder);
    return songs.reduce((acc, song, i) => {
      return acc + '\n' + (i + 1) + '. ' + song.name;
    }, '');
  }
  
  return (
    <div className={cn("home-grid", !selectedGenres.length && "home-grid--empty")}>
      <GenrePicker
        isSetter={false}
        onUpdate={setSelectedGenres}
        placeholder="Pick up your genres!"
        defaultSelected={selectedGenres}
      />
      <div className={cn(
        "home-grid__content",
        loading && "home-grid__content--loading"
      )}>
        {['songs', 'albums', 'artists', 'bands']
          .filter(column => !!data?.[column])
          .map((column) => (
            <div className="home-grid__column">
              <div className="home-grid__header">{capitalize(column)}</div>
              {data[column].map((cell) => (
                <DataBlock
                  key={cell.id}
                  data={cell}
                  map={DATA_BLOCKS_PROPERTY_MAP[column]}
                  handleMapMulti={{
                    songs: handleSongsProperty
                  }}
                />
              ))}
              {!data[column].length && (
                <span className="home-grid__no-data">
                  {`🚫`}
                </span>
              )}
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default HomeGrid;
