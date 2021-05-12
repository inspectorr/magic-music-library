import Button from '@/components/Button/Button';
import Error from '@/components/Error/Error';
import Input from '@/components/Input/Input';
import BarButton from '@/components/Layout/BarButton';
import Layout from '@/components/Layout/Layout';
import withRouting from '@/support/hocs/withRouting';
import useRemote from '@/support/hooks/useRemote';
import request from '@/support/utils/request';
import Link from 'next/link';

function Login({ router }) {
  const {
    waiting,
    error,
    request: login,
    formApi: {
      handleSubmit,
      register
    }
  } = useRemote(async ({
    email,
    password
  }) => {
    return request({
      method: 'POST',
      url: '/login',
      data: {
        email,
        password
      }
    });
  }, {
    onSuccess(data) {
      router.replace('/');
    }
  });
  
  return (
    <Layout
      className="login"
      control={[
        <Link href="/register">
          <a>
            <BarButton>Sign Up</BarButton>
          </a>
        </Link>
      ]}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit(login)}>
        <Input
          label="Email"
          name="email"
          register={register}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          register={register}
        />
        {error && <Error text={error.message} />}
        {waiting && 'waiting...'}
        <Button
          className="login__button"
          waiting={waiting}
        >
          Login
        </Button>
      </form>
    </Layout>
  );
}

export default withRouting(Login, {
  isProtected: false,
  redirect: true
});
