import React from 'react';
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
  const adminControlTableApi = useAdminControlTableApi('music/albums');
  // const songsSubControlTableApi = useAdminControlTableApi('music/songs');
  
  return (
    <AdminLayout currentTab="albums">
      <AdminControlTable
        {...adminControlTableApi}
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
        detailPanel={() => {
          return (
            <div className="admin-albums__detail-panel">
              {/*<AlbumPlaylist items={artists.map(({ name, id }) => ({ id: `item-${id}`, content: name }))}/>*/}
              {/*<div className="admin-albums__songs-subtable">*/}
              {/*  <AdminControlTable*/}
              {/*    {...songsSubControlTableApi}*/}
              {/*    title="Add songs..."*/}
              {/*    columns={[{*/}
              {/*      title: 'Name',*/}
              {/*      field: 'name'*/}
              {/*    }]}*/}
              {/*  />*/}
              {/*</div>*/}
            </div>
          );
        }}
      />
    </AdminLayout>
  );
}

export default withAdminPage(
  withApiData(AlbumsPage, [{
    path: 'music/artists',
    field: 'artists'
  }, {
    path: 'music/bands',
    field: 'bands',
  // }, {
  //   path: 'music/songs',
  //   field: 'songs',
  }])
);
