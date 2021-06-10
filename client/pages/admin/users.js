import React from 'react';
import { withAdminPage } from '@/pages/admin/index';
import AdminLayout from '@/components/Layout/AdminLayout';
import AdminControlTable, { useAdminControlTableApi } from '@/components/AdminControlTable/AdminControlTable';

function UsersPage({ genres }) {
  const adminControlTableApi = useAdminControlTableApi('/users');
  
  return (
    <AdminLayout currentTab="users">
      <AdminControlTable
        {...adminControlTableApi}
        title="Users"
        columns={[{
          title: 'ID',
          field: 'id',
          editable: false,
          defaultSort: 'desc'
        }, {
          title: 'Email',
          field: 'email',
          editable: false
        }, {
          title: 'Name',
          field: 'name',
        }, {
          title: 'Role',
          field: 'role',
          lookup: { 'user': 'User', 'admin': 'Admin' },
        }, {
          title: 'Preferred genres',
          field: 'genres',
          type: 'multiselect',
          multiselectOptions: {
            remoteData: genres,
            mappingField: 'name'
          },
          editable: false
        }]}
      />
    </AdminLayout>
  );
}

export default withAdminPage(UsersPage);
