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
    request: signup,
    formApi: {
      handleSubmit,
      register
    }
  } = useRemote(async ({
    name,
    email,
    password
  }) => {
    return request({
      method: 'POST',
      url: '/register',
      data: {
        name,
        email,
        password
      }
    });
  }, {
    onSuccess() {
      router.replace('/login');
    }
  });
  
  return (
    <Layout
      className="register"
      control={[
        <Link href="/login">
          <a>
            <BarButton>Sign In</BarButton>
          </a>
        </Link>
      ]}
    >
      <h2>Register</h2>
      <form onSubmit={handleSubmit(signup)}>
        <Input
          label="Email"
          name="email"
          register={register}
        />
        <Input
          label="Name"
          name="name"
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
          Register
        </Button>
      </form>
    </Layout>
  );
}

export default withRouting(Login, {
  isProtected: false,
  redirect: true
});
