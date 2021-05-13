import AdminControlTable, { useAdminControlTableApi } from '@/components/AdminControlTable/AdminControlTable';
import { withAdminPage } from '@/pages/admin/index';
import React from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';

function GenresPage() {
  const adminControlTableApi = useAdminControlTableApi('/music/genres');
  
  return (
    <AdminLayout currentTab="genres">
      <AdminControlTable
        {...adminControlTableApi}
        title="Genres"
        columns={[{
          title: 'ID',
          field: 'id',
          editable: false,
          defaultSort: 'desc'
        }, {
          title: 'Name',
          field: 'name',
        }]}
      />
    </AdminLayout>
  );
}

export default withAdminPage(GenresPage);
