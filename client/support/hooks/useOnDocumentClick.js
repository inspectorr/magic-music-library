import {useEffect} from 'react';

function useOnDocumentClick(onClick = (event) => {}) {
  useEffect(() => {
    function onDocumentClick(event) {
      onClick(event);
    }
    document.addEventListener('click', onClick);
    return () => {
      document.removeEventListener('click', onClick);
    }
  }, []);
}

export default useOnDocumentClick;
