import React from 'react';
import { withAdminPage } from '@/pages/admin/index';
import AdminControlTable, { useAdminControlTableApi } from '@/components/AdminControlTable/AdminControlTable';
import AdminLayout from '@/components/Layout/AdminLayout';

function ArtistsPage({ genres }) {
  const adminControlTableApi = useAdminControlTableApi('music/artists');
  
  return (
    <AdminLayout currentTab="artists">
      <AdminControlTable
        {...adminControlTableApi}
        title="Artists"
        columns={[{
          title: 'ID',
          field: 'id',
          editable: false,
          defaultSort: 'desc'
        }, {
          title: 'Name',
          field: 'name',
        }, {
          title: 'Birth date',
          field: 'birthDate',
          type: 'date'
        }, {
          title: 'Genres',
          field: 'genres',
          type: 'multiselect',
          multiselectOptions: {
            remoteData: genres,
            mappingField: 'name'
          }
        }]}
      />
    </AdminLayout>
  );
}

export default withAdminPage(ArtistsPage);
