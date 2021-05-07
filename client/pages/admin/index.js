import React from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import withRouting from '@/support/hocs/withRouting';

function AdminPage() {
  return (
    <AdminLayout />
  );
}

export function withAdminPage(Page, options = {}) {
  return withRouting(Page, {
    isProtected: true,
    redirectOnUserFunc: (user) => !['root', 'admin'].includes(user.role) ? '/' : null,
    ...options
  });
}

export default withAdminPage(AdminPage, {
  redirect: '/admin/users'
});
