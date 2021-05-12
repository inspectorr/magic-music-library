import React from 'react';
import withApiData from '@/support/hocs/withApiData';
import AdminControlTable, { useAdminControlTableApi } from '@/components/AdminControlTable/AdminControlTable';
import AdminLayout from '@/components/Layout/AdminLayout';
import { withAdminPage } from '@/pages/admin/index';


function SongsPage({ genres, artists }) {
  const adminControlTableApi = useAdminControlTableApi('/music/songs');
  return (
    <AdminLayout currentTab="songs">
      <AdminControlTable
        {...adminControlTableApi}
        title="Songs"
        path="/music/songs"
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
        }]}
      />
    </AdminLayout>
  );
}


export default withAdminPage(
  withApiData(SongsPage, [{
    path: '/music/artists',
    field: 'artists'
  }])
);
