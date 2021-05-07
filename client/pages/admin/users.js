import React from 'react';
import MaterialTable from 'material-table';
import { useUser } from '@/support/data/user';
import useRemote from '@/support/hooks/useRemote';
import { withAdminPage } from '@/pages/admin/index';
import request, { useApi } from '@/support/utils/request';
import AdminLayout from '@/components/Layout/AdminLayout';

function UsersPage() {
  const { user } = useUser();
  
  const { data: users, mutate: reloadUsers } = useApi('/users');
  
  const {
    request: updateUser
  } = useRemote(({
    id,
    name,
    role
  }) => {
    return request({
      url: `/users/${id}`,
      method: 'PUT',
      data: {
        name,
        role
      }
    });
  }, {
    onSuccess: () => reloadUsers()
  });
  
  const columns = [{
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
  }];
  
  return (
    <AdminLayout currentTab="users">
      <MaterialTable
        options={{
          // sorting: false
        }}
        columns={columns}
        title="Users"
        data={users}
        editable={{
          onRowUpdate: updateUser
        }}
      />
    </AdminLayout>
  );
}

export default withAdminPage(UsersPage);
