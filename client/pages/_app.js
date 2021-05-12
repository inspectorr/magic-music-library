import { useLayoutEffect } from 'react';
import '@/styles/index.scss';


function App({ Component, pageProps }) {
  useLayoutEffect(() => {
    window['__react-beautiful-dnd-disable-dev-warnings'] = true;
  }, []);
  
  return <Component {...pageProps} />;
}

export default App;
