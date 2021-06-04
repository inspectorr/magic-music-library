import React, { useState } from 'react';
import cn from 'classnames';
import capitalize from '@material-ui/core/utils/capitalize';

import GenrePicker from '@/components/GenrePicker/GenrePicker';
import DataBlock from '@/components/HomeGrid/DataBlock';
import { useApi } from '@/support/utils/request';

function HomeGrid() {
  const [selectedGenres, setSelectedGenres] = useState([]);
  
  const {
    data = {}
  } = useApi(`/music/genres/use/random/${selectedGenres.join(',')}`)
  
  const readMap = {
    songs: {
      artist: 'Artist/band',
      album: 'Album',
      genres: 'Genres'
    },
    albums: {
      artist: 'Artist/band',
      genres: 'Genres'
    },
    artists: {
      genres: 'Genres'
    },
    bands: {
      genres: 'Genres'
    }
  }
  
  return (
    <div className={cn("home-grid", !selectedGenres.length && "home-grid--empty")}>
      <GenrePicker
        isSetter={false}
        onUpdate={setSelectedGenres}
        placeholder="Pick up your genres!"
      />
      <div className="home-grid__content">
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
                  handleMap={{
                    genres: (a) => a?.map(a => a.name).join(', ')
                  }}
                />
              ))}
              {!data[column].length && (
                <span className="home-grid__no-data">
                  {`No ${column}`}
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
