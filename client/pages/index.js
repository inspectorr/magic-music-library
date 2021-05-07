import React from 'react';
import Link from 'next/link';
import BarButton from '@/components/Layout/BarButton';
import Layout from '@/components/Layout/Layout';
import withRouting from '@/support/hocs/withRouting';
import { useUser } from '@/support/data/user';

function Home() {
  const { user } = useUser();
  
  return (
    <Layout
      className="home"
      control={[
        <div>{user?.email}</div>,
        user.role === 'admin' && (
          <Link href="/admin">
            <a>
              <BarButton>Admin panel</BarButton>
            </a>
          </Link>
        ),
        <Link href="/login?action=logout">
          <a>
            <BarButton>Logout</BarButton>
          </a>
        </Link>
      ].filter(Boolean)}
    >
      <div>Home</div>
    </Layout>
  );
}

export default withRouting(Home, {
  isProtected: true,
});
