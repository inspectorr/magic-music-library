import React, {useContext, useEffect, useState} from 'react';
import request from '@/support/utils/request';
import {useRouter} from 'next/router';

export async function getCurrentUser(options = {}) {
  const { data: user } = await request({
    url: '/profile',
    method: 'GET',
    ...options
  });
  
  return user;
}

export async function logout(onSuccess = () => {}) {
  try {
    await request.post('/logout');
  } catch (error) {
    if (error.response?.status === 401) {
      // already logged out, ignore
      return;
    }
    
    // else throw unexpected
    throw error;
  }
  
  try {
    onSuccess();
  } catch (e) {
    //
  }
}

export const UserContext = React.createContext({
  user: {},
  setUser: () => {},
  fetchUser: () => {},
  logout: () => {}
});

export function UserProvider({ initUser, children }) {
  const [user, setUser] = useState(initUser);
  
  async function fetchUser() {
    const user = await getCurrentUser();
    setUser(user);
  }
  
  const router = useRouter();
  useEffect(() => {
    if (router.query.action === 'logout') {
      // here should be already logged out by Wrapper.getInitialProps
      setUser(null);
    }
  }, []);
  
  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        fetchUser,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
