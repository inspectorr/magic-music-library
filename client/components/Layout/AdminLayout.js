import BarButton from '@/components/Layout/BarButton';
import { useUser } from '@/support/data/user';
import Link from 'next/link';
import React from 'react';
import Layout from '@/components/Layout/Layout';
import cn from 'classnames';

const adminMenu = [{
  name: 'users',
  title: 'Users',
  path: '/users'
}, {
  name: 'artists',
  title: 'Artists',
  path: '/artists',
}];

function AdminLayout({ currentTab, children }) {
  const {user} = useUser();
  
  return (
    <Layout
      control={[
        <div>{user?.email}</div>,
        <Link href="/">
          <a>
            <BarButton>Home</BarButton>
          </a>
        </Link>,
        <Link href="/login?action=logout">
          <a>
            <BarButton>Logout</BarButton>
          </a>
        </Link>
      ].filter(Boolean)}
    >
      <div className="admin">
        <div className="admin__navigation">
          {adminMenu.map((tab) => (
            <AdminTab
              key={tab.title}
              active={currentTab === tab.name}
              {...tab}
            />
          ))}
        </div>
        <div className="admin__content">
          {children}
        </div>
      </div>
    </Layout>
  );
}

function AdminTab({ title, active, path }) {
  return (
    <Link href={"/admin" + path}>
      <a>
        <div className={cn("admin-tab", active && "admin-tab--active")}>
          <span className="admin-tab__title">{title}</span>
        </div>
      </a>
    </Link>
  );
}

export default AdminLayout;