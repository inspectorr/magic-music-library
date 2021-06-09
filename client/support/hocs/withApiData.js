import useApi from '@/support/hooks/useApi';
import React from 'react';

function withApiData(Component, datum = [{ path: '', field: '' }]) {
  function ComposeComponent(Component, datum = [], generalProps = {}) {
    const Composed = datum.reduce((Component, { path, field }) => {
      return (props) => {
        const { data, update } = useApi(path);
        
        return (
          <Component
            {...generalProps}
            {...props}
            {...{
              [field]: data,
              [`reload${field[0].toUpperCase() + field.slice(1)}`]: update
            }}
          />
        );
      }
    }, Component);
    
    return <Composed />;
  }
  
  return (props) => {
    return ComposeComponent(
      Component,
      datum,
      props
    );
  }
}

export default withApiData;
