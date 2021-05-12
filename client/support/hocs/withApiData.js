import React from 'react';
import { useApi } from '@/support/utils/request';

function withApiData(Component, datum = []) {
  function ComposeComponent(Component, datum = [], generalProps = {}) {
    const Composed = datum.reduce((Component, { path, field }) => {
      return (props) => {
        const { data, mutate: reload } = useApi(path);
        
        return (
          <Component
            {...generalProps}
            {...props}
            {...{
              [field]: data,
              [`reload${field[0].toUpperCase() + field.slice(1)}`]: reload
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
