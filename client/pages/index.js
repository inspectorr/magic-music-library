import BarButton from '@/components/Layout/BarButton';
import { useUser } from '@/support/data/user';
import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import withRouting from '@/support/hocs/withRouting';

function Home() {
  const { user } = useUser();
  
  return (
    <Layout
      className="home"
      control={[
        <div>{user.email}</div>,
        <Link href="/login?action=logout">
          <a>
            <BarButton>Logout</BarButton>
          </a>
        </Link>
      ]}
    >
      <div>Home</div>
    </Layout>
  );
}

export default withRouting(Home, {
  isProtected: true,
  // redirectOnUser: (user) => user.role === 'admin' ? '/admin' : null
});
