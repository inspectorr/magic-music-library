import React, { useState } from 'react';
import cn from 'classnames';
import capitalize from '@material-ui/core/utils/capitalize';

import GenrePicker from '@/components/GenrePicker/GenrePicker';
import DataBlock from '@/components/HomeGrid/DataBlock';
import useApi from '@/support/hooks/useApi';

function HomeGrid() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  const {
    data = {},
    loading
  } = useApi(`/music/genres/use/random/${selectedGenres.join(',')}`)
  
  const readMap = {
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
  }
  
  return (
    <div className={cn("home-grid", !selectedGenres.length && "home-grid--empty")}>
      <GenrePicker
        isSetter={false}
        onUpdate={setSelectedGenres}
        placeholder="Pick up your genres!"
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
                  map={readMap[column]}
                  handleMapMulti={{
                    songs: (songs) => {
                      songs.sort((a, b) => a.albumOrder - b.albumOrder);
                      return songs.reduce((acc, song, i) => {
                        return acc + '\n' + (i + 1) + '. ' + song.name;
                      }, '');
                    }
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
