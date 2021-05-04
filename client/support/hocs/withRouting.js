import React, {useLayoutEffect} from 'react';
import Router, {withRouter as withNextRouter} from 'next/router';
import ModalProvider from '@/components/Modal/ModalProvider';
import {extractCookie} from '@/support/utils/request';
import {getCurrentUser, logout, UserProvider} from '@/support/data/user';

const defaultOptions = {
  isProtected: true, // redirect to login page if not authenticated
  redirect: false, // redirect to dashboard if authenticated
  redirectOnUserFunc: (user) => null // pass url string to make a user props based redirect
};

const DEFAULT_PROTECTED_PAGE = '/';
const DEFAULT_PAGE = '/login';

// all (and only) next pages must be wrapped in this
// add all global things here

function withRouting(
  Page,
  options = defaultOptions
) {
  const {
    isProtected,
    redirect,
    redirectOnUserFunc,
  } = { ...defaultOptions, ...options };
  
  function Wrapper({
    initUser,
    clientRedirectTo,
    ...props
  }) {
    useLayoutEffect(() => {
      if (clientRedirectTo) {
        Router.replace(clientRedirectTo);
      }
    }, [clientRedirectTo]);
    
    return (
      <UserProvider initUser={initUser}>
        <ModalProvider>
          <Page {...props} />
        </ModalProvider>
      </UserProvider>
    );
  }

  Wrapper.getInitialProps = async (ctx) => {
    let user = null, clientRedirectTo;
    
    if (ctx.query.action === 'logout') {
      await logout();
    }
    
    try {
      user = await getCurrentUser(extractCookie(ctx.req));
      
      const redirectUserBased = redirectOnUserFunc(user);
  
      if (redirect) {
        clientRedirectTo = serverRedirectOrPassToClient(ctx, DEFAULT_PROTECTED_PAGE);
      } else if (redirectUserBased) {
        clientRedirectTo = serverRedirectOrPassToClient(ctx, redirectUserBased);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        if (isProtected) {
          clientRedirectTo = serverRedirectOrPassToClient(ctx, DEFAULT_PAGE);
        }
      } else {
        // unexpected - shouldn't get anything else on getting user info
        throw error;
      }
    }
    
    let pageProps = {}, pagePropsError = null;
    
    try {
      pageProps = await Page.getInitialProps?.(ctx) ?? {};
    } catch (error) {
      pagePropsError = error;
    }
    
    return {
      ...pageProps,
      pagePropsError,
      clientRedirectTo,
      initUser: user
    };
  }
  
  return withNextRouter(Wrapper);
}

export function serverRedirectOrPassToClient(ctx, location) {
  if (!ctx.req) {
    console.log('passing redirect to client:', location);
    return location;
  }
  
  if (ctx.req.url === location) return null;
  
  console.log('server side redirect:', location);
  ctx.res.writeHead(302, { Location: location });
  ctx.res.end();
}

export default withRouting;
