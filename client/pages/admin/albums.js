import useApi from '@/support/hooks/useApi';
import React from 'react';
import AddBox from '@material-ui/icons/AddBox';
import request from '@/support/utils/request';
import useRemote from '@/support/hooks/useRemote';
import { withAdminPage } from '@/pages/admin/index';
import withApiData from '@/support/hocs/withApiData';
import AdminLayout from '@/components/Layout/AdminLayout';
import AdminControlTable, { useAdminControlTableApi } from '@/components/AdminControlTable/AdminControlTable';
import { AlbumPlaylist } from '@/components/AdminControlTable/AlbumPlaylist';

function AlbumsPage({
  genres,
  artists,
  bands,
}) {
  const albumsAdminControlTableApi = useAdminControlTableApi('music/albums');
  
  return (
    <AdminLayout currentTab="albums">
      <AdminControlTable
        {...albumsAdminControlTableApi}
        title="Albums"
        columns={[{
          title: 'ID',
          field: 'id',
          editable: false,
          defaultSort: 'desc'
        }, {
          title: 'Name',
          field: 'name',
        }, {
          title: 'Release date',
          field: 'releasedAt',
          type: 'date'
        }, {
          title: 'Genres',
          field: 'genres',
          type: 'multiselect',
          multiselectOptions: {
            remoteData: genres,
            mappingField: 'name',
          }
        }, {
          title: 'Artist',
          field: 'artist',
          type: 'select',
          selectOptions: {
            remoteData: artists,
            mappingField: 'name'
          }
        }, {
          title: 'Band',
          field: 'band',
          type: 'select',
          selectOptions: {
            remoteData: bands,
            mappingField: 'name'
          }
        }]}
        detailPanel={(album) => {
          return (
            <AlbumDetailPanel album={album} />
          );
        }}
      />
    </AdminLayout>
  );
}

function AlbumDetailPanel({ album }) {
  const songsSubControlTableApi = useAdminControlTableApi('music/songs');
  
  const {
    data: albumSongs = [],
    update: reloadAlbumSongs = () => {}
  } = useApi(`/music/albums/${album.id}/songs`);
  
  const {
    request: toggleSongAlbum
  } = useRemote(({ songId, albumId }) => {
    return request({
      url: `/music/albums/${albumId}/songs/${songId}`,
      method: 'put',
    });
  }, {
    onSuccess() {
      reloadAlbumSongs();
      songsSubControlTableApi.reload();
    }
  });
  
  const {
    request: reorderSongs
  } = useRemote(({ albumId, songIds }) => {
    return request({
      url: `/music/albums/${albumId}/songs/reorder`,
      method: 'put',
      data: {
        songIds
      }
    })
  }, {
    onSuccess() {
      reloadAlbumSongs();
      songsSubControlTableApi.reload();
    }
  });
  
  function onSongAddClick(songId, albumId) {
    return toggleSongAlbum({ songId, albumId });
  }
  
  function onSongRemoveClick(songId, albumId) {
    return toggleSongAlbum({ songId, albumId });
  }
  
  function onReorder(albumId, songIds) {
    return reorderSongs({ albumId, songIds });
  }
  
  return (
    <div className="admin-albums__detail-panel">
      <AlbumPlaylist
        key={albumSongs.map(a => a.id).join(',')}
        items={albumSongs}
        map={({ name, id }) => ({ id: `item-${id}`, content: name })}
        onReorder={(ids) => onReorder(album.id, ids)}
        onRemoveClick={onSongRemoveClick}
      />
      <div className="admin-albums__songs-subtable">
        <AdminControlTable
          {...songsSubControlTableApi}
          data={songsSubControlTableApi.data?.filter(s => !s.album) ?? []}
          title="Add songs..."
          columns={[{
            title: 'Name',
            field: 'name'
          }, {
            title: 'Artist/Band',
            field: 'artistOrBand',
            render: item => item.artistOrBand?.name,
            editable: false
          }]}
          actions={[{
            icon: (props) => {
              return <AddBox/>
            },
            onClick: (_, song) => {
              return onSongAddClick(song.id, album.id);
            }
          }]}
        />
      </div>
    </div>
  );
}

export default withAdminPage(
  withApiData(AlbumsPage, [{
    path: 'music/artists',
    field: 'artists'
  }, {
    path: 'music/bands',
    field: 'bands',
  }])
);
