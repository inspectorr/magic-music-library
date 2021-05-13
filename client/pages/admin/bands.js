import React from 'react';
import { withAdminPage } from '@/pages/admin/index';
import AdminControlTable, { useAdminControlTableApi } from '@/components/AdminControlTable/AdminControlTable';
import AdminLayout from '@/components/Layout/AdminLayout';

function BandsPage({ genres }) {
  const adminControlTableApi = useAdminControlTableApi('music/bands');
  
  return (
    <AdminLayout currentTab="bands">
      <AdminControlTable
        {...adminControlTableApi}
        title="Bands"
        path="/music/bands"
        columns={[{
          title: 'ID',
          field: 'id',
          editable: false,
          defaultSort: 'desc'
        }, {
          title: 'Name',
          field: 'name',
        }, {
          title: 'Date of foundation',
          field: 'foundedAt',
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

export default withAdminPage(BandsPage);
