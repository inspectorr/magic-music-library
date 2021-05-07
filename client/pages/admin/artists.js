import React from 'react';
import AdminLayout from '@/components/Layout/AdminLayout';
import { withAdminPage } from '@/pages/admin/index';

function ArtistsPage() {
  return (
    <AdminLayout currentTab="artists">
      artists
    </AdminLayout>
  );
}

export default withAdminPage(ArtistsPage);
