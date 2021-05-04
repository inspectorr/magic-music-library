import Link from 'next/link';
import Layout from '@/components/Layout/Layout';
import withRouting from '@/support/hocs/withRouting';

function Home() {
  return (
    <Layout>
      <div>
        <div>Home</div>
        <Link href="/login?action=logout">
          <a>Logout</a>
        </Link>
      </div>
    </Layout>
  );
}

export default withRouting(Home, {
  isProtected: true,
  // redirectOnUser: (user) => user.role === 'admin' ? '/admin' : null
});
