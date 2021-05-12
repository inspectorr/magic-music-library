import React from 'react';
import withApiData from '@/support/hocs/withApiData';
import AdminLayout from '@/components/Layout/AdminLayout';
import withRouting from '@/support/hocs/withRouting';

function AdminPage() {
  return (
    <AdminLayout />
  );
}

export function withAdminPage(Page, options = {}) {
  return withApiData(
    withRouting(Page, {
      isProtected: true,
      redirectOnUserFunc: (user) => !['root', 'admin'].includes(user.role) ? '/' : null,
      ...options
    }),[{
      path: '/music/genres',
      field: 'genres'
  }]);
}

export default withAdminPage(AdminPage, {
  redirect: '/admin/users'
});
